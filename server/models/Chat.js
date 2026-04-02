const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  type: String, // user | bot
  text: String,
  sources: Array,
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messages: [messageSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);
