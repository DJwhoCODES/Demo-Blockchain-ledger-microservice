import express from "express";
import cors from "cors";
import config from "./config/index.js";
import auditRoutes from "./routes/audit.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.json({ message: "Blockchain-ledger-microservice running" });
});

// Audit routes
app.use("/audit", auditRoutes);

// Start server
app.listen(config.PORT, () => {
    console.log(`Blockchain Ledger running on port ${config.PORT}`);
});
