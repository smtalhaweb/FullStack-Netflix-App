import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const corsOptions = {
//   origin: "http://localhost:3000", // Allow requests only from http://example.com
//   methods: "GET,POST", // Allow only specified HTTP methods
//   allowedHeaders: "Content-Type,Authorization", // Allow only specified headers
//   credentials: true, // Include cookies in cross-origin requests
//   // Additional options...
// };
app.use(cors());

// Routes
app.use("/api", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  });

// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
