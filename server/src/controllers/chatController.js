import Chunk from "../models/Chunk.js";

export const chat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    // 🔥 FETCH ALL CHUNKS (no embeddings for now)
    const chunks = await Chunk.find().limit(5);

    console.log("Retrieved chunks:", chunks.length);

    if (!chunks.length) {
      return res.json({
        answer: "No documents uploaded yet.",
        sources: [],
      });
    }

    // 🔥 SIMPLE ANSWER (for demo)
    const answer = chunks
      .map((c) => c.text)
      .join(" ")
      .slice(0, 500);

    res.json({
      answer,
      sources: chunks.map((c) => c.document),
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      message: "Error generating answer",
    });
  }
};
