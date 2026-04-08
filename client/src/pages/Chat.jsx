import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Chat() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const res = await API.get("/chat");
      setChats(res.data);

      if (res.data.length > 0) {
        setCurrentChatId(res.data[0]._id);
      } else {
        setCurrentChatId(null);
      }
    } catch {
      alert("Failed to load chats");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentChatId]);

  const currentChat = chats.find((c) => c._id === currentChatId);

  const newChat = async () => {
    try {
      const res = await API.post("/chat/new");
      setChats((prev) => [res.data, ...prev]);
      setCurrentChatId(res.data._id);
    } catch {
      alert("Failed to create chat");
    }
  };

  const ask = async () => {
    if (!question.trim()) return;
    if (!currentChatId) return alert("Create chat first");

    setLoading(true);

    try {
      await API.post("/chat/ask", {
        question,
        chatId: currentChatId,
      });

      await loadChats();
    } catch {
      alert("Error sending message");
    }

    setQuestion("");
    setLoading(false);
  };

  const deleteChat = async (id) => {
    if (!window.confirm("Delete this chat?")) return;

    try {
      await API.delete(`/chat/${id}`);
      const updated = chats.filter((c) => c._id !== id);
      setChats(updated);

      if (currentChatId === id) {
        setCurrentChatId(updated[0]?._id || null);
      }
    } catch {
      alert("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") ask();
  };

  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white">

      {/* SIDEBAR */}
      <div className="w-72 bg-[#0d1220] border-r border-gray-800 p-5 flex flex-col">

        <h2 className="text-xl font-bold mb-6 text-purple-400">
          OpsMind AI
        </h2>

        <button
          onClick={newChat}
          className="mb-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          + New Chat
        </button>

        {/* ✅ SHOW ONLY FOR ADMIN */}
        {role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="mb-3 py-2 rounded-lg bg-indigo-600"
          >
            ⚙ Admin Dashboard
          </button>
        )}

        <button
          onClick={logout}
          className="mb-6 py-2 rounded-lg bg-red-600"
        >
          🚪 Sign Out
        </button>

        <h3 className="text-gray-400 mb-2 text-sm">History</h3>

        <div className="space-y-2 overflow-y-auto">
          {chats.map((chat) => {
            const first = chat.messages.find((m) => m.type === "user");

            return (
              <div
                key={chat._id}
                className={`flex justify-between items-center p-2 rounded-lg ${
                  currentChatId === chat._id
                    ? "bg-purple-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <div
                  onClick={() => setCurrentChatId(chat._id)}
                  className="cursor-pointer truncate w-full"
                >
                  {first?.text || "New Chat"}
                </div>

                <button
                  onClick={() => deleteChat(chat._id)}
                  className="ml-2 text-red-400 hover:text-red-600"
                >
                  ✖
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Chat</h1>
          <span className="text-gray-400 text-sm">System Online</span>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto space-y-6">

          {!currentChat && (
            <div className="text-center text-gray-500 mt-20">
              Start a new chat 🚀
            </div>
          )}

          {currentChat?.messages.map((msg, i) => (
            <div key={i}>

              {msg.type === "user" && (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 rounded-xl max-w-xl">
                    {msg.text}
                  </div>
                </div>
              )}

              {msg.type === "bot" && (
                <div className="flex">
                  <div className="bg-[#1a2235] px-5 py-4 rounded-xl max-w-2xl">
                    {msg.text}
                  </div>
                </div>
              )}

            </div>
          ))}

          {loading && <div className="text-gray-400">Typing...</div>}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="mt-4 flex gap-3 border-t border-gray-800 pt-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask something..."
            className="flex-1 p-3 rounded-lg bg-gray-800 outline-none"
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