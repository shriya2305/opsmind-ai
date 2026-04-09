# 🚀 OpsMind AI

### Your Corporate Knowledge Brain 🧠

OpsMind AI is an **AI-powered knowledge assistant** that enables organizations to query internal documents (SOPs, PDFs, resumes, etc.) using natural language.

Built with **RAG (Retrieval-Augmented Generation)**, it delivers **accurate, context-based answers with citations**.

---

## ✨ Features

### 🔐 Authentication & Roles

* Employee & Admin login/signup
* Role-based access control
* Secure JWT authentication

### 💬 AI Chat (RAG-based)

* Ask questions from uploaded documents
* Context-aware answers using embeddings
* Source citations for transparency
* Chat history persistence
* Delete chats

### 📄 Document Processing

* Upload PDFs (Admin only)
* Automatic text extraction & chunking
* Embedding generation
* Stored in MongoDB for semantic search

### 📊 Admin Dashboard

* View total documents & chunks
* Upload & delete documents
* Search documents
* Manage knowledge base

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Atlas)

### AI / ML

* Embeddings (Hugging Face / custom)
* RAG pipeline
* Groq (LLaMA 3.1 model)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/opsmind-ai.git
cd opsmind-ai
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* User logs in → receives JWT token
* Token stored in localStorage
* Role (`admin` / `employee`) controls UI & access
* Protected routes for admin dashboard

---

## 🧠 How RAG Works

1. PDF uploaded → text extracted
2. Text split into chunks
3. Embeddings generated
4. Stored in MongoDB
5. User query → converted to embedding
6. Relevant chunks retrieved
7. LLM generates answer using context

---

## 📂 Project Structure

```bash
opsmind-ai/
│
├── client/              # React frontend
│   ├── pages/
│   ├── components/
│   └── services/
│
├── server/              # Node backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── utils/
│
└── README.md
```

---

## 🚀 Future Enhancements

* Streaming AI responses (like ChatGPT)
* Chat renaming & pinning
* Multi-document filtering
* Analytics dashboard
* Team collaboration features

---

## 👩‍💻 Author

**Shriya Avhad**

* GitHub: https://github.com/shriya2305

---

## ⭐ Contribute

Pull requests are welcome!
Feel free to fork and improve the project.

---

## 📜 License

This project is open-source and available under the MIT License.

---

> 💡 Built to solve real-world knowledge retrieval problems using AI + modern web technologies.
