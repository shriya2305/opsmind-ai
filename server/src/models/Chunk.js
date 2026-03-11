import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  embedding: {
    type: [Number],
    required: true,
  },

  document: {
    type: String,
  },

  page: {
    type: Number,
  },
});

export default mongoose.model("Chunk", chunkSchema);
