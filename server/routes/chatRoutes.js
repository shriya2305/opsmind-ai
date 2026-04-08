const router = require("express").Router();
const { ask, getChats, createChat } = require("../controllers/chatController");
const { deleteChat } = require("../controllers/chatController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, getChats);
router.post("/new", auth, createChat);
router.post("/ask", auth, ask);
router.delete("/:id", auth, deleteChat);

module.exports = router;
