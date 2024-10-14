import express from "express";
import * as dotenv from "dotenv";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

// Content Security Policy Middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://vercel.live; connect-src 'self' https://imagine-ai-eta.vercel.app; img-src 'self'; style-src 'self';"
  );
  next();
});

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// Custom CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://imagine-ai-93vv.vercel.app"); // Replace with your frontend URL
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Respond to preflight requests
  }
  
  next();
});

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
