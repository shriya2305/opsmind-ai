import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Account created!");

      navigate("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-purple-700 text-white flex items-center justify-center text-4xl font-bold">
        OpsMind AI
      </div>

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl w-80">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <input
            placeholder="Name"
            className="w-full mb-4 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={handleSignup}
            className="w-full bg-purple-600 text-white p-2 rounded"
          >
            Signup
          </button>

          <p className="mt-4 text-sm">
            Already have account?{" "}
            <Link to="/login" className="text-purple-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
