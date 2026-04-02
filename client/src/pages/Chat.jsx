import { useState, useEffect, useRef } from "react";
import API from "../services/api";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // 🔥 Load chats on mount
  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const res = await API.get("/chat");
      setChats(res.data);

      if (res.data.length > 0) {
        setCurrentChatId(res.data[0]._id);
      }
    } catch {
      alert("Failed to load chats");
    }
  };

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId]);

  // 🔥 Current chat
  const currentChat = chats.find((c) => c._id === currentChatId);

  // 🔥 New chat
  const newChat = async () => {
    const res = await API.post("/chat/new");
    setChats((prev) => [res.data, ...prev]);
    setCurrentChatId(res.data._id);
  };

  // 🔥 Ask
  const ask = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      await API.post("/chat/ask", {
        question,
        chatId: currentChatId,
      });

      await loadChats(); // refresh chats
    } catch {
      alert("Error");
    }

    setQuestion("");
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") ask();
  };

  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white">
      {/* SIDEBAR */}
      <div className="w-72 bg-[#0d1220] border-r border-gray-800 p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-purple-400">OpsMind AI</h2>

        <button
          onClick={newChat}
          className="mb-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          + New Chat
        </button>

        <h3 className="text-gray-400 mb-2 text-sm">History</h3>

        <div className="space-y-2 overflow-y-auto">
          {chats.map((chat) => {
            const firstMsg = chat.messages.find((m) => m.type === "user");

            return (
              <div
                key={chat._id}
                onClick={() => setCurrentChatId(chat._id)}
                className={`p-2 rounded-lg cursor-pointer truncate ${
                  currentChatId === chat._id
                    ? "bg-purple-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {firstMsg?.text || "New Chat"}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {currentChat?.messages.map((msg, i) => (
            <div key={i}>
              {msg.type === "user" && (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-2xl max-w-xl">
                    {msg.text}
                  </div>
                </div>
              )}

              {msg.type === "bot" && (
                <div className="flex flex-col gap-3">
                  <div className="bg-gray-800 px-6 py-4 rounded-2xl max-w-2xl">
                    {msg.text}
                  </div>

                  {msg.sources?.length > 0 && (
                    <div className="max-w-2xl">
                      <p className="text-xs text-gray-400 mb-2">Sources</p>

                      {msg.sources.map((s, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-900 p-3 rounded-lg text-sm mb-2"
                        >
                          <p className="truncate">{s.text}</p>
                          <span className="text-xs text-gray-500">
                            {s.source}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-800 px-4 py-2 rounded-lg w-fit animate-pulse">
              Typing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-5 border-t border-gray-800 flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask something..."
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white outline-none"
          />

          <button
            onClick={ask}
            className="px-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
