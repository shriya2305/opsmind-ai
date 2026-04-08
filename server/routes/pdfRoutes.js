const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const auth = require("../middleware/authMiddleware");

const {
  uploadPDF,
  getStats,
  getDocuments,
} = require("../controllers/pdfController");

// 🔥 STATS
router.get("/stats", auth, getStats);

// 🔥 DOCUMENTS
router.get("/documents", auth, getDocuments);

// 🔥 UPLOAD (ADMIN ONLY)
router.post(
  "/upload",
  auth,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can upload PDFs" });
    }
    next();
  },
  upload.single("file"), // ⚠️ IMPORTANT: "file" (not pdf)
  uploadPDF,
);

const { deleteDocument } = require("../controllers/pdfController");

// 🔥 DELETE
router.delete(
  "/delete/:name",
  auth,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete" });
    }
    next();
  },
  deleteDocument,
); 

module.exports = router;
