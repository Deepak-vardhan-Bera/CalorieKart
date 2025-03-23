import mongoose from "mongoose";
import getISTTime from "../utils/getISTTime.js";

const foodItemSchema = new mongoose.Schema(
    {
        date: { type: String, required: true }, // Format: YYYY-MM-DD

        category: {
            type: String,
            enum: ["weight_gain", "weight_loss", "maintain_fitness"],
            required: true,
        },

        morning: {
            name: { type: String, required: true },
            calories: { type: Number, required: true },
            image: { type: String, required: true }
        },

        afternoon: {
            name: { type: String, required: true },
            calories: { type: Number, required: true },
            image: { type: String, required: true }
        },

        night: {
            name: { type: String, required: true },
            calories: { type: Number, required: true },
            image: { type: String, required: true }
        },

        totalCalories: { type: Number, required: true },
        dailyVideo: { type: String, required: true }
    },
    {
        timestamps: { currentTime: getISTTime }
    }
);

// ✅ Ensure unique food items per date & category
foodItemSchema.index({ date: 1, category: 1 }, { unique: true });

foodItemSchema.pre("save", function (next) {
    this.totalCalories =
        this.morning.calories + this.afternoon.calories + this.night.calories;
    next();
});

export const FoodItem = mongoose.model("FoodItem", foodItemSchema);
