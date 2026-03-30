import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border-b">
      {/* LEFT */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-semibold"
        >
          Chat
        </button>

        {role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="text-gray-700 font-semibold"
          >
            Admin
          </button>
        )}
      </div>

      {/* RIGHT */}
      <button onClick={logout} className="border px-4 py-1 rounded-lg">
        Sign Out
      </button>
    </div>
  );
}
