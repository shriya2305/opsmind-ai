const { getEmbedding } = require("../utils/embedding");
const { retrieveDocs } = require("../utils/rag");
const Chat = require("../models/Chat");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 🔥 GET ALL CHATS
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to load chats" });
  }
};

// 🔥 CREATE NEW CHAT
exports.createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user.id,
      messages: [],
    });

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to create chat" });
  }
};

// 🔥 ASK (MAIN RAG + SAVE CHAT)
exports.ask = async (req, res) => {
  try {
    const { question, chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ error: "chatId required" });
    }

    // 1️⃣ Enhance query
    const enhancedQuery = question + " details explanation information";

    const queryEmbedding = await getEmbedding(enhancedQuery);

    // 2️⃣ Retrieve docs
    let docs = await retrieveDocs(queryEmbedding);

    docs = docs.filter((doc) => doc.score > 0.45);

    console.log("\n🔍 Retrieved Docs:\n");
    docs.forEach((doc, i) => {
      console.log(`Doc ${i + 1}:`, doc.text.slice(0, 80), "Score:", doc.score);
    });

    docs = Array.from(new Map(docs.map((d) => [d.text, d])).values());
    docs = docs.slice(0, 4);

    if (!docs.length) {
      const fallbackDocs = await retrieveDocs(queryEmbedding);
      docs = fallbackDocs.slice(0, 3);
    }

    if (!docs.length) {
      return res.json({
        answer: "I don't know.",
        sources: [],
      });
    }

    // 3️⃣ Context
    const context = docs.map((d) => d.text).join("\n\n");

    // 4️⃣ LLM
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an enterprise SOP assistant.

RULES:
- Answer ONLY using the provided context
- Do NOT add external info
- If not found → say "I don't know"
          `,
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${question}`,
        },
      ],
    });

    const answer =
      completion.choices?.[0]?.message?.content?.trim() || "I don't know.";

    // 5️⃣ SAVE TO EXISTING CHAT
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    chat.messages.push(
      { type: "user", text: question },
      {
        type: "bot",
        text: answer,
        sources: docs.map((d) => ({
          text: d.text,
          source: d.source,
          score: d.score,
        })),
      },
    );

    await chat.save();

    // 6️⃣ RESPONSE
    res.json({
      answer,
      sources: docs,
    });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};
