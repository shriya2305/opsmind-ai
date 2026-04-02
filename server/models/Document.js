const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  text: String,
  embedding: [Number],
  source: String,
  page: Number,
});

module.exports = mongoose.model("Document", docSchema);
