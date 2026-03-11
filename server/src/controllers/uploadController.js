import { parsePDF } from "../services/pdfService.js";
import { chunkText } from "../utils/textChunker.js";
import { generateEmbedding } from "../services/embeddingService.js";

import Chunk from "../models/Chunk.js";

export const uploadDocument = async (req, res) => {

console.log("UPLOAD REQUEST RECEIVED");
  console.log(req.file);

  const path = req.file.path;

  const text = await parsePDF(path);

  const chunks = chunkText(text);
console.log("Chunks created:", chunks.length);

for (const chunk of chunks) {

  const embedding = await generateEmbedding(chunk);

  console.log("Saving chunk to MongoDB...");

  await Chunk.create({
    text: chunk,
    embedding,
    document: req.file.originalname
  });

}

  res.json({
    message: "Document indexed successfully",
    chunks: chunks.length,
  });
};

