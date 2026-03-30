import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ SAVE BOTH TOKEN + ROLE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      console.log("ROLE:", res.data.user.role); // debug

      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-purple-700 text-white flex items-center justify-center text-4xl font-bold">
        OpsMind AI
      </div>

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl w-80">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <input
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white p-2 rounded"
          >
            Login
          </button>

          <p className="mt-4 text-sm">
            No account?{" "}
            <Link to="/signup" className="text-purple-600">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
