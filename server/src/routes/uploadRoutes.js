import express from "express";
import { uploadDocument } from "../controllers/uploadController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadDocument);

export default router;
