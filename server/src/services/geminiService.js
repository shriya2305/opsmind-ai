import axios from "axios";

export const generateAnswer = async (context, question) => {

  const prompt = `
Use ONLY the context below to answer the question.

Context:
${context}

Question:
${question}
`;

  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3",
      prompt: prompt,
      stream: false
    }
  );

  return response.data.response;
};