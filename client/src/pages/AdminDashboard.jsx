import { useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await API.post("/pdf/upload", formData);
      alert("Uploaded ✅");
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white">
      {/* SIDEBAR */}
      <div className="w-72 bg-[#0d1220] border-r border-gray-800 p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-purple-400">OpsMind AI</h2>

        <button className="mb-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
          + New Session
        </button>

        <h3 className="text-gray-400 mb-2 text-sm">Recent</h3>

        <div className="space-y-3 text-sm">
          <div className="p-2 bg-gray-800 rounded-lg">
            Refund policy process
          </div>
          <div className="p-2 bg-gray-800 rounded-lg">Onboarding checklist</div>
          <div className="p-2 bg-gray-800 rounded-lg">Vendor workflow</div>
        </div>

        <div className="mt-auto text-xs text-gray-400">
          <p>Documents: 24</p>
          <p>Chunks: 1847</p>
          <p>Latency: 340ms</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#0d1220]">
          <div className="flex items-center gap-4">
            <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
              System Online
            </span>

            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full">
              RAG Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-purple-600 px-3 py-1 rounded-full">Admin</span>

            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              A
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-6 overflow-y-auto">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold">
              Knowledge Base <span className="text-purple-400">Admin</span>
            </h1>
            <p className="text-gray-400">Upload and manage SOP documents</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Documents", value: "24" },
              { label: "Chunks Indexed", value: "1,847" },
              { label: "Accuracy", value: "98.4%" },
              { label: "Latency", value: "340ms" },
            ].map((card, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-xl">
                <p className="text-2xl font-bold text-purple-400">
                  {card.value}
                </p>
                <p className="text-gray-400 text-sm">{card.label}</p>
              </div>
            ))}
          </div>

          {/* UPLOAD BOX */}
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center">
            <p className="text-lg mb-3">Upload SOP Documents</p>

            <p className="text-sm text-gray-400 mb-5">
              PDF only • Auto indexed
            </p>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />

            <br />

            <button
              onClick={upload}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Upload
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="grid grid-cols-5 p-4 border-b border-gray-700 text-gray-400 text-sm">
              <span>Document</span>
              <span>Chunks</span>
              <span>Size</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            <div className="grid grid-cols-5 p-4 border-b border-gray-800">
              <span>Employee_Handbook.pdf</span>
              <span>342</span>
              <span>2.4MB</span>
              <span className="text-green-400">Indexed</span>
              <span className="text-red-400 cursor-pointer">Delete</span>
            </div>

            <div className="grid grid-cols-5 p-4">
              <span>Finance_SOP.pdf</span>
              <span>218</span>
              <span>1.8MB</span>
              <span className="text-green-400">Indexed</span>
              <span className="text-red-400 cursor-pointer">Delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
