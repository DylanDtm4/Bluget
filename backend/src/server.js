import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import "./cron.js";
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";
import recurringRoutes from "./routes/recurring.js";
import monthRoutes from "./routes/month.js";
import budgetRoutes from "./routes/budgets.js";
import categoryRoutes from "./routes/categories.js";
import statsRoutes from "./routes/stats.js";

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/recurring", recurringRoutes);
app.use("/month", monthRoutes);
app.use("/budgets", budgetRoutes);
app.use("/categories", categoryRoutes);
app.use("/stats", statsRoutes);

// database connect
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(process.env.PORT, () =>
			console.log(`Server running on port ${process.env.PORT}`)
		);
	})
	.catch((err) => console.log(err));
