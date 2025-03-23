import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, height, weight } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed password before saving:", hashedPassword);
  
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // ✅ Save the hashed password
      phone,
      height,
      weight,
    });
  
    if (user) {
      generateTokenAndSetCookie(user._id, res);
      return res.status(201).json({
        success: true,
        message: "User registered successfully!",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user data!",
      });
    }
  });
  

  export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  

  
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found!");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
  
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
  
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  });
  
  
  

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully!",
  });
};

export const getUserProfile = asyncHandler(async (req, res) => {
    console.log(req.user.id);
    
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully!",
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export const updateCategoryAndSubscription = asyncHandler(async (req, res) => {
  const { category, plan } = req.body;

  if (! ["weight_gain", "weight_loss", "maintain_fitness"].includes(category)) {
    res.status(400);
    throw new Error("Invalid category selected!");
  }

  if (!["Weekly", "Monthly", "Yearly"].includes(plan)) {
    res.status(400);
    throw new Error("Invalid subscription plan selected!");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const startDate = new Date();
  let endDate = new Date(startDate);

  if (plan === "Weekly") {
    endDate.setDate(startDate.getDate() + 7);
  } else if (plan === "Monthly") {
    endDate.setMonth(startDate.getMonth() + 1);
  } else if (plan === "Yearly") {
    endDate.setFullYear(startDate.getFullYear() + 1);
  }

  // Function to manually adjust for IST (Indian Standard Time - UTC +5:30)
  const convertToIST = (date) => {
    const istOffset = 5.5 * 60 * 60 * 1000; // Convert hours to milliseconds
    return new Date(date.getTime() + istOffset);
  };

  user.category = category;
  user.subscription = {
    plan,
    startDate: convertToIST(startDate),
    endDate: convertToIST(endDate),
    status: "Pending",
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Category and subscription updated successfully!",
    user: {
      _id: user._id,
      category: user.category,
      subscription: {
        plan: user.subscription.plan,
        startDate: user.subscription.startDate.toISOString(),
        endDate: user.subscription.endDate.toISOString(),
        status: user.subscription.status,
      },
    },
  });
});


export const updateAddress = asyncHandler(async (req, res) => {
  const { street, city, state, country, zipCode } = req.body;

  if (!street || !city || !state || !country || !zipCode) {
    res.status(400);
    throw new Error("All address fields are required!");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  user.address = { street, city, state, country, zipCode };

  if (user.subscription.status === "Pending") {
    user.subscription.status = "Active";
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address updated successfully!",
    user: {
      _id: user._id,
      address: user.address,
    },
  });
});



export const addAdmin = asyncHandler(async (req, res) => {
  console.log("HEllo");
  
  try {
    const { email, password } = req.body;

    // Secure password check (consider using environment variable instead of hardcoding)
    if (password !== process.env.ADMIN_SECRET) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Check if the user is already an admin
    if (user.role === "Admin") {
      return res.status(400).json({ success: false, message: `${user.name} is already an admin!` });
    }

    // Promote user to admin
    user.role = "Admin";
    await user.save();

    res.status(200).json({
      success: true,
      message: `${user.name} is now an admin!`,
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});