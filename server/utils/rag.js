const Document = require("../models/Document");

function cosineSimilarity(a, b) {
  let dot = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

exports.retrieveDocs = async (queryEmbedding) => {
  const docs = await Document.find();

  const scored = docs.map((doc) => {
    const score = cosineSimilarity(doc.embedding, queryEmbedding);

    return {
      ...doc._doc,
      score,
    };
  });

  // ✅ sort + increase results
  return scored.sort((a, b) => b.score - a.score).slice(0, 8); // 👈 increased from 3 → 8
};
