import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateCategoryAndSubscription,
  updateAddress,
  addAdmin,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile", protect, getUserProfile);

router.put("/update-category-subscription", protect, updateCategoryAndSubscription);

router.put("/update-address", protect, updateAddress);

router.put("/addAdmin",addAdmin)

export default router;
