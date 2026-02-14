import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 4005,
    RPC_URL: process.env.RPC_URL,              // http://127.0.0.1:8545
    PRIVATE_KEY: process.env.PRIVATE_KEY,      // same wallet used to deploy
    CONTRACT_PATH: process.env.CONTRACT_PATH || "./deployment.json"
};
