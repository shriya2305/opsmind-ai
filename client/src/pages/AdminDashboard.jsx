import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [file, setFile] = useState(null);
  const [stats, setStats] = useState({});
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  // 🔐 PROTECT ROUTE
  useEffect(() => {
    if (role !== "admin") {
      navigate("/chat");
    } else {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const statsRes = await API.get("/pdf/stats");
      const docsRes = await API.get("/pdf/documents");

      setStats(statsRes.data);
      setDocuments(docsRes.data);
    } catch {
      alert("Failed to load data");
    }
  };

  const upload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/pdf/upload", formData);
      alert("Uploaded ✅");
      loadData();
    } catch {
      alert("Upload failed");
    }
  };

  const deleteDoc = async (name) => {
    if (!window.confirm("Delete document?")) return;

    try {
      await API.delete(`/pdf/delete/${name}`);
      loadData();
    } catch {
      alert("Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white">

      {/* SIDEBAR */}
      <div className="w-72 bg-[#0d1220] border-r border-gray-800 p-5 flex flex-col">

        <h2 className="text-xl font-bold mb-6 text-purple-400">
          OpsMind AI
        </h2>

        <button
          onClick={() => navigate("/chat")}
          className="mb-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          💬 Open Chat
        </button>

        <button
          onClick={logout}
          className="mb-6 py-2 rounded-lg bg-red-600"
        >
          🚪 Sign Out
        </button>

        <h3 className="text-gray-400 mb-2 text-sm">Documents</h3>

        <div className="space-y-2 overflow-y-auto">
          {filteredDocs.map((doc, i) => (
            <div key={i} className="p-2 bg-gray-800 rounded-lg truncate">
              {doc.name}
            </div>
          ))}
        </div>

        <div className="mt-auto text-xs text-gray-400">
          Docs: {stats.totalDocs || 0} <br />
          Chunks: {stats.totalChunks || 0}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg outline-none"
          />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4">
          <Stat title="Documents" value={stats.totalDocs} />
          <Stat title="Chunks" value={stats.totalChunks} />
          <Stat title="Accuracy" value={stats.accuracy || "--"} />
          <Stat title="Latency" value={stats.latency || "--"} />
        </div>

        {/* UPLOAD */}
        <div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <br />
          <button
            onClick={upload}
            className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            Upload
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 p-4 border-b border-gray-700 text-gray-400">
            <span>Document</span>
            <span>Chunks</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filteredDocs.map((doc, i) => (
            <div key={i} className="grid grid-cols-4 p-4 border-b border-gray-800">
              <span>{doc.name}</span>
              <span>{doc.chunks}</span>
              <span className="text-green-400">Indexed</span>

              <span
                onClick={() => deleteDoc(doc.name)}
                className="text-red-400 cursor-pointer"
              >
                Delete
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// 🔥 reusable stat card
function Stat({ title, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <p className="text-2xl text-purple-400">{value || 0}</p>
      <p className="text-gray-400 text-sm">{title}</p>
    </div>
  );
}