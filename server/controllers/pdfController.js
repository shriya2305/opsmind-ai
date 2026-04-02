const pdf = require("pdf-parse");
const fs = require("fs");
const Document = require("../models/Document");
const { getEmbedding } = require("../utils/embedding");

exports.uploadPDF = async (req, res) => {
  try {
    const data = await pdf(fs.readFileSync(req.file.path));

    // ✅ Better chunking (semantic)
    const chunks = data.text
      .split("\n\n") // split by paragraphs
      .map((chunk) => chunk.replace(/\s+/g, " ").trim())
      .filter((chunk) => chunk.length > 80);

    for (let chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      await Document.create({
        text: chunk,
        embedding,
        source: req.file.originalname,
        page: 1, // can improve later
      });
    }

    res.json({ msg: "PDF processed successfully" });
  } catch (err) {
    console.error("PDF error:", err.message);
    res.status(500).json({ error: "PDF processing failed" });
  }
};
