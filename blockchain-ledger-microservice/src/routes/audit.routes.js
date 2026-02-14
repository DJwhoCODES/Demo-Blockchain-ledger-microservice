import express from "express";
import BlockchainService from "../services/blockchain.service.js";

const router = express.Router();

// Write audit log
router.post("/write", async (req, res) => {
    const { txnId, eventName } = req.body;

    if (!txnId || !eventName) {
        return res.status(400).json({
            success: false,
            message: "txnId and eventName are required"
        });
    }

    const result = await BlockchainService.writeAuditLog(txnId, eventName);
    res.json(result);
});

// Read audit logs
router.get("/:txnId", async (req, res) => {
    const { txnId } = req.params;

    const logs = await BlockchainService.getAuditLogs(txnId);
    res.json({
        success: true,
        logs
    });
});

export default router;
