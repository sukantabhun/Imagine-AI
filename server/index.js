import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: ['https://imagine-ai-93vv.vercel.app/'],
  method: ["POST", "GET"],
  credentials: false
}));
app.use(express.json({ limit: "50mb" }));

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
