import { useState } from "react";
import axios from "axios";

export default function Admin() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(res.data.message); // ✅ FIXED

    } catch (err) {

      console.log("FULL ERROR:", err);
      console.log("RESPONSE:", err.response);

      alert(err?.response?.data?.message || "Upload failed");

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload PDF
      </button>

    </div>

  );

}