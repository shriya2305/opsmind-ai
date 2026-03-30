export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">OpsMind AI</h1>

      <button className="bg-purple-600 w-full p-3 rounded mb-6">
        + New Session
      </button>

      <div className="space-y-3 text-sm">
        <p className="text-gray-400">Recent</p>

        <div className="bg-gray-800 p-3 rounded">Refund policy process</div>

        <div className="bg-gray-800 p-3 rounded">Onboarding checklist</div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

<Link to="/admin" className="block mt-6 text-gray-300 hover:text-white">
  Admin Dashboard
</Link>;
