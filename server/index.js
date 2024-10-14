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
    "default-src 'self'; script-src 'self' https://vercel.live; connect-src 'self' https://imagine-ai-eta.vercel.app; img-src 'self'; style-src 'self';"
  );
  next();
});

// CORS Configuration (Handle Exact Origin Matching)
const allowedOrigins = ["https://imagine-ai-93vv.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow requests from valid origins
    } else {
      callback(new Error("Not allowed by CORS")); // Block others
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions)); // Apply CORS to all routes

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello from DALL-E!");
});

// Handle Preflight (OPTIONS) Requests for CORS
app.options("*", cors(corsOptions));

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
