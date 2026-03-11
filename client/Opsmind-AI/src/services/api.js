import axios from "axios";

export const askQuestion = async (question) => {
  const res = await axios.post("http://localhost:5000/api/chat", {
    question,
  });

  return res.data;
};
