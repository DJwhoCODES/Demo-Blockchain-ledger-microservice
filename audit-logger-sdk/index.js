import { http } from "./http.js";

class AuditLoggerSDK {
    constructor() {
        this.auditServiceUrl = process.env.AUDIT_SERVICE_URL || "http://localhost:4005";
    }

    async log(txnId, eventName) {
        try {
            const res = await http.post(`${this.auditServiceUrl}/audit/write`, {
                txnId,
                eventName
            });

            return res.data;
        } catch (err) {
            console.error("Audit Logger SDK Error:", err?.response?.data || err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }

    async getLogs(txnId) {
        try {
            const res = await http.get(`${this.auditServiceUrl}/audit/${txnId}`);
            return res.data.logs;
        } catch (err) {
            console.error("Audit Logger SDK Error:", err);
            return [];
        }
    }
}

const audit = new AuditLoggerSDK();
export default audit;
