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
const corsOptions = isProduction 
    ? { origin: ['https://imagine-ai-93vv.vercel.app'] } 
    : { origin: '*' }; // Allow all origins in development

app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
    res.send("Hello from DALL-E!");
});

// Optional: Enable preflight requests
app.options('*', cors());

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
