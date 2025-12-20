const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// load env vars
dotenv.config();

// run cron job
require("./cron");

// init app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const recurringRoutes = require("./routes/recurring");
const monthRoutes = require("./routes/months");
const budgetRoutes = require("./routes/budgets");
const categoryRoutes = require("./routes/categories");
const statsRoutes = require("./routes/stats");

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/recurring", recurringRoutes);
app.use("/months", monthRoutes);
app.use("/budgets", budgetRoutes);
app.use("/categories", categoryRoutes);
app.use("/stats", statsRoutes);

// database connect
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});
