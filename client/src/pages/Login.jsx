import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "employee",
  });

  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      navigate(res.data.role === "admin" ? "/admin" : "/chat");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <div className="w-1/2 bg-gradient-to-br from-purple-700 via-indigo-800 to-indigo-900 text-white p-12 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            🧠
          </div>
          <h2 className="text-lg font-semibold">OpsMind AI</h2>
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Your Corporate <br />
          <span className="italic text-purple-200">Knowledge Brain</span>
        </h1>

        <p className="text-gray-200 mb-10">
          Instantly query SOPs. Get accurate, cited answers powered by AI.
        </p>

        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-xl">⚡ Instant answers</div>
          <div className="bg-white/10 p-4 rounded-xl">🔍 Vector search</div>
          <div className="bg-white/10 p-4 rounded-xl">🔒 Role control</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96 bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-2">
            Welcome <span className="text-purple-600">back</span>
          </h2>

          <p className="text-gray-500 mb-6">Sign in to continue</p>

          {/* ROLE */}
          <div className="flex bg-gray-200 rounded-lg mb-5 p-1">
            <button
              onClick={() => setData((prev) => ({ ...prev, role: "employee" }))}
              className={`flex-1 py-2 rounded-lg ${
                data.role === "employee"
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
              }`}
            >
              👤 Employee
            </button>

            <button
              onClick={() => setData((prev) => ({ ...prev, role: "admin" }))}
              className={`flex-1 py-2 rounded-lg ${
                data.role === "admin"
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
              }`}
            >
              🛡 Admin
            </button>
          </div>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          {/* PASSWORD */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-lg text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <button
            onClick={login}
            className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            Sign In
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
