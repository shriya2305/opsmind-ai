import { generateEmbedding } from "../services/embeddingService.js";
import { retrieveChunks } from "../services/ragService.js";
import { generateAnswer } from "../services/geminiService.js";

export const chat = async (req, res) => {
  const { question } = req.body;

 const queryEmbedding = await generateEmbedding(
  "Find information related to: " + question
);

  const chunks = await retrieveChunks(queryEmbedding);
  console.log("Retrieved chunks:", chunks);

  const context = chunks.map((c) => c.text).join("\n");

  const prompt = `

Use ONLY the context below to answer.

Context:
${context}

Question:
${question}

If the answer is not in the context say:
"I don't know based on the SOPs."

`;

  const answer = await generateAnswer(prompt);

  res.json({
    answer,
    sources: chunks.map((c) => c.document),
  });
};
