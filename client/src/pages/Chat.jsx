import { useState } from "react";
import { askQuestion } from "../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendQuestion = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await askQuestion(input);

      const aiMsg = {
        role: "ai",
        text: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error generating answer" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ask the Knowledge Brain</h1>

      <div className="space-y-3 mb-6">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-2/3"
      />

      <button
        onClick={sendQuestion}
        className="ml-2 bg-purple-600 text-white px-4 py-2"
      >
        Send
      </button>
    </div>
  );
}
