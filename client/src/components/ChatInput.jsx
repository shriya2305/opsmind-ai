import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    setLoading(true);

    await onSend(question);

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="flex gap-3">

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about any company SOP or policy..."
        className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <button
        onClick={handleSend}
        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-white"
      >
        {loading ? "..." : "Send"}
      </button>

    </div>
  );
}