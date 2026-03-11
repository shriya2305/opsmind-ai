import Chunk from "../models/Chunk.js";

export const retrieveChunks = async (embedding) => {
  const results = await Chunk.aggregate([
  {
    $vectorSearch: {
      queryVector: Array.from(embedding),
      path: "embedding",
      numCandidates: 100,
      limit: 5,
      index: "vector_index"
    }
  }
]);
  return results;
};
