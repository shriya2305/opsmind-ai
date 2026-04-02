const router = require("express").Router();
const auth = require("../../server/middleware/authMiddleware");
const { ask } = require("../controllers/chatController");

router.post("/ask", auth, ask);

module.exports = router;
