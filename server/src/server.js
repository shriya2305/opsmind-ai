import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import chatRoutes from "./routes/chatRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/chat", chatRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(5000, () => {
  console.log("Server running on 5000");
});
