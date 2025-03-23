import express from "express";
import { 
    addFoodItem, 
    getTodayFoodItems, 
    getFoodByDate, 
    updateFoodItem, 
    deleteFoodItem 
} from "../controllers/FoodItem.controller.js";
import { protect, adminOnly } from "../middleware/verifyJWT.js"; // Import middlewares

const router = express.Router();

// 1️⃣ Add a new food item (🔒 Admin only)
router.post("/add", protect, adminOnly, addFoodItem);

// 2️⃣ Get today's food items (🔒 User must be logged in)
router.get("/today", protect, getTodayFoodItems);

// 3️⃣ Get food items by date & category (🔒 User/Admin must be logged in)
router.get("/:date", protect, getFoodByDate);

// 4️⃣ Update food items for a specific date & category (🔒 Admin only)
router.patch("/update/:date", protect, adminOnly, updateFoodItem);

// 5️⃣ Delete food items for a specific date & category (🔒 Admin only)
router.delete("/delete/:date", protect, adminOnly, deleteFoodItem);

export default router;
