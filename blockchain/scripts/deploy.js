const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
    const AuditLog = await hre.ethers.getContractFactory("AuditLog");
    const auditLog = await AuditLog.deploy();

    await auditLog.waitForDeployment();

    const contractAddress = await auditLog.getAddress();
    console.log("AuditLog deployed at:", contractAddress);

    const abi = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "../artifacts/contracts/AuditLog.sol/AuditLog.json"),
            "utf8"
        )
    ).abi;

    const output = {
        address: contractAddress,
        abi
    };

    fs.writeFileSync(
        path.join(__dirname, "../deployment.json"),
        JSON.stringify(output, null, 2)
    );

    console.log("deployment.json generated.");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
