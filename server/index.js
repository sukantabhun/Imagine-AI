import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Origin:', req.headers.origin);
    next();
});

// CORS configuration
const isProduction = process.env.NODE_ENV === 'production';
const corsOptions = {
  origin: isProduction ? ['https://imagine-ai-93vv.vercel.app'] : '*',
  credentials: true,
};
app.use(cors(corsOptions));

// Handle preflight requests manually
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
    res.send("Hello from DALL-E!");
});

const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log("Server has started at http://localhost:8080");
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
