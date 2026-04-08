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
  const [loading, setLoading] = useState(false);

  // 🔥 HANDLE LOGIN
  const handleLogin = async () => {
    if (!data.email || !data.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", data);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);
      const login = async () => {
        try {
          const res = await API.post("/auth/login", data);

          // ✅ SAVE BOTH
          localStorage.setItem("token", res.data.token);
          

          // ✅ REDIRECT BASED ON ROLE
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/chat");
          }
        } catch (err) {
          alert(err.response?.data?.msg || "Login failed");
        }
      };

      // ✅ REDIRECT BASED ON ROLE
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/chat");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-purple-700 via-indigo-800 to-indigo-900 text-white p-12 flex flex-col justify-center">
        <div className="mb-10 flex items-center gap-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg">
            🧠
          </div>
          <h2 className="text-xl font-semibold">OpsMind AI</h2>
        </div>

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Your Corporate <br />
          <span className="italic text-purple-200">Knowledge Brain</span>
        </h1>

        <p className="text-gray-200">
          Instantly query SOPs. Get accurate, cited answers powered by AI.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-96 bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-purple-600">Welcome Back</span>
          </h2>

          <p className="text-gray-500 mb-6"> Sign in to continue</p>

          {/* ROLE SELECT */}
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
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full p-3 mb-4 border rounded-lg text-black outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* PASSWORD */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full p-3 border rounded-lg text-black outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* 🔥 SIGNUP REDIRECT */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")} // ✅ THIS IS REDIRECT
              className="text-purple-600 cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
