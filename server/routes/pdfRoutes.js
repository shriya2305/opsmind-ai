const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadPDF } = require("../controllers/pdfController");
const auth = require("../middleware/authMiddleware");

// ✅ Only admin should upload
router.post(
  "/upload",
  auth,
  async (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can upload PDFs" });
    }
    next();
  },
  upload.single("file"),
  uploadPDF,
);

module.exports = router;
