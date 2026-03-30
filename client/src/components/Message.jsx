export default function Message({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
        max-w-lg px-4 py-3 rounded-xl
        ${isUser ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-200"}
        `}
      >
        {text}
      </div>
    </div>
  );
}
