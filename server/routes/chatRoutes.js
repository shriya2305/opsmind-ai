const router = require("express").Router();
const { ask, getChats, createChat } = require("../controllers/chatController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, getChats);
router.post("/new", auth, createChat);
router.post("/ask", auth, ask);

module.exports = router;
