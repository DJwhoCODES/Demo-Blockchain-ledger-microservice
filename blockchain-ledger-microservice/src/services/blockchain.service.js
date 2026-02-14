import fs from "fs";
import { ethers } from "ethers";
import config from "../config/index.js";
import { log } from "../utils/logger.js";

class BlockchainService {

    constructor() {
        const deployment = JSON.parse(fs.readFileSync(config.CONTRACT_PATH));

        this.contractAddress = deployment.address;
        this.contractABI = deployment.abi;

        this.provider = new ethers.JsonRpcProvider(config.RPC_URL);

        this.signer = new ethers.Wallet(config.PRIVATE_KEY, this.provider);

        this.contract = new ethers.Contract(
            this.contractAddress,
            this.contractABI,
            this.signer
        );

        log("Connected to blockchain contract at:", this.contractAddress);
    }

    async writeAuditLog(txnId, eventName) {
        try {
            const tx = await this.contract.writeLog(txnId, eventName);
            await tx.wait();

            log(`Audit written: [${txnId}] -> ${eventName}`);

            return {
                success: true,
                txnHash: tx.hash
            };
        } catch (err) {
            console.error("Blockchain Write Error:", err);
            return {
                success: false,
                error: err.message || err
            };
        }
    }

    async getAuditLogs(txnId) {
        try {
            const logs = await this.contract.getLogs(txnId);
            return logs;
        } catch (err) {
            console.error("Blockchain Read Error:", err);
            return [];
        }
    }
}

export default new BlockchainService();
