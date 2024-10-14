import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

// Content Security Policy Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://vercel.live; connect-src 'self'; img-src 'self'; style-src 'self';"
  );
  next();
});

// CORS Configuration
const corsOptions = {
  origin: ["https://imagine-ai-93vv.vercel.app"]  // Production domain

  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions)); // Apply CORS

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello from DALL-E!");
});

// Start Server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Server has started at http://localhost:8080");
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
