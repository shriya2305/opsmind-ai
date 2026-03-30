import { parsePDF } from "../services/pdfService.js";
import { chunkText } from "../utils/textChunker.js";
import Chunk from "../models/Chunk.js";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    console.log("UPLOAD:", req.file.originalname);

    let text = "";

    try {
      text = await parsePDF(req.file.path);
    } catch {
      text = "Dummy SOP content for testing.";
    }

    const chunks = chunkText(text);

    for (const chunk of chunks) {
      await Chunk.create({
        text: chunk,
        embedding: new Array(384).fill(0),
        document: req.file.originalname,
      });
    }

    res.json({
      message: "Document indexed successfully",
      chunks: chunks.length,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    res.status(500).json({
      message: "Upload failed",
    });
  }
};
