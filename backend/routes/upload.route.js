import express from "express";
import { uploadImage, uploadVideo } from "../config/multer.js";

const router = express.Router();

// Upload Food Image
router.post("/image", uploadImage.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ imageUrl: req.file.path });
});

// Upload Daily Video
router.post("/video", uploadVideo.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ videoUrl: req.file.path });
});

export default router;
