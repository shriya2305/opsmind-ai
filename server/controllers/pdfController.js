const pdf = require("pdf-parse");
const fs = require("fs");
const Document = require("../models/Document");
const { getEmbedding } = require("../utils/embedding");

// 🔥 UPLOAD PDF
exports.uploadPDF = async (req, res) => {
  try {
    const data = await pdf(fs.readFileSync(req.file.path));

    const chunks = data.text
      .split("\n\n")
      .map((chunk) => chunk.replace(/\s+/g, " ").trim())
      .filter((chunk) => chunk.length > 80);

    for (let chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      await Document.create({
        text: chunk,
        embedding,
        source: req.file.originalname,
        page: 1,
      });
    }

    res.json({ msg: "PDF processed successfully" });
  } catch (err) {
    console.error("PDF error:", err.message);
    res.status(500).json({ error: "PDF processing failed" });
  }
};

// 🔥 STATS
exports.getStats = async (req, res) => {
  try {
    const totalChunks = await Document.countDocuments();
    const uniqueDocs = await Document.distinct("source");

    res.json({
      totalDocs: uniqueDocs.length,
      totalChunks,
      accuracy: "—",
      latency: "—",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load stats" });
  }
};

// 🔥 DOCUMENT LIST
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find();

    const grouped = {};

    docs.forEach((doc) => {
      if (!grouped[doc.source]) {
        grouped[doc.source] = {
          name: doc.source,
          chunks: 0,
        };
      }
      grouped[doc.source].chunks++;
    });

    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

// 🔥 DELETE DOCUMENT (ALL CHUNKS)
exports.deleteDocument = async (req, res) => {
  try {
    const { name } = req.params;

    await Document.deleteMany({ source: name });

    res.json({ msg: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
