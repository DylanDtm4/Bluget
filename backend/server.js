import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import errorHandler from "./src/middleware/errorHandler.js";
import authRoutes from "./src/routes/authRoutes.js";
import monthRoutes from "./src/routes/monthRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();

// connect to DB
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bluget API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/months", monthRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", authRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
