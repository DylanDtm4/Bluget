import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/routes/users.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Bluget API is running...");
});

app.use("/api/users", userRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
