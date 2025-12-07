import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

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
