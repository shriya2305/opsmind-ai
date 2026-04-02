const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY);

exports.getEmbedding = async (text) => {
  try {
    const cleanText = text.slice(0, 1000);

    const result = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: cleanText,
    });

    const embedding = Array.isArray(result[0]) ? result[0] : result;

    return embedding;
  } catch (err) {
    console.error("Embedding error:", err.message);
    throw err;
  }
};
