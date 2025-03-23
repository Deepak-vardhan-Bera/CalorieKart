import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

// Configure storage for food images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "caloriecart/food-images",
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: `${getTodayDate()}-${file.fieldname}`, // e.g., "2025-03-23-morning"
    };
  },
});

// Configure storage for daily videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "caloriecart/daily-videos",
      resource_type: "video",
      allowed_formats: ["mp4", "mov", "avi"],
      public_id: `${getTodayDate()}-daily-video`, // e.g., "2025-03-23-daily-video"
    };
  },
});

// Multer upload handlers
export const uploadImage = multer({ storage: imageStorage });
export const uploadVideo = multer({ storage: videoStorage });
