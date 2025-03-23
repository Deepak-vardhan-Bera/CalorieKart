import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import getISTTime from "../utils/getISTTime.js";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true, unique: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },

    category: {
      type: String,
      enum:  ["weight_gain", "weight_loss", "maintain_fitness"],
      default: null,
    },

    address: {
      street: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      country: { type: String, default: null },
      zipCode: { type: String, default: null },
    },

    subscription: {
      plan: { type: String, enum: ["Weekly", "Monthly", "Yearly"], default: null },
      startDate: { type: Date, default: null },
      endDate: { type: Date, default: null },
      status: { type: String, enum: ["Active", "Expired", "Pending"], default: "Pending" },
    },

    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  {
    timestamps: {
      currentTime: getISTTime
    }
  }
);






export const User = mongoose.model("User", UserSchema);
