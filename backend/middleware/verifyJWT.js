import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      res.status(401);
      throw new Error("Unauthorized access!");
    }

    const user = await User.findById(decoded.userId).select("-password"); 

    if (!user) {
      res.status(401);
      throw new Error("User not found!");
    }

    req.user = { 
      id: user._id, 
      role: user.role 
    };

    next();
  } catch (error) {
    res.status(500);
    throw new Error("Error verifying JWT");
  }
});

export const adminOnly = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    res.status(403);
    throw new Error("Access denied! Only admins can perform this action.");
  }
  next();
});
