const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadPDF } = require("../controllers/pdfController");

router.post("/upload", upload.single("file"), uploadPDF);

module.exports = router;
