import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import orderRoute from "./OrderRoute";
import { v2 as cloudinary } from "cloudinary";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// CORS setup
app.use(cors({
  origin: "https://frontendpa.vercel.app", // Your frontend URL
}));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(express.json());

// Health check route
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

// API routes
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/order", orderRoute);

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
