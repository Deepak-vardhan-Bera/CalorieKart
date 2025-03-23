    import {FoodItem} from "../models/foodItems.model.js";

    // 1️⃣ Add a new food item (Admin)
    export const addFoodItem = async (req, res) => {
        try {
            const { date, category, morning, afternoon, night, dailyVideo } = req.body;

            if (!date || !category || !morning || !afternoon || !night || !dailyVideo) {
                return res.status(400).json({ success: false, message: "All fields are required." });
            }

            const validCategories = ["weight_gain", "weight_loss", "maintain_fitness"];
            if (!validCategories.includes(category)) {
                return res.status(400).json({ success: false, message: "Invalid category." });
            }

            const totalCalories = morning.calories + afternoon.calories + night.calories;

            const foodItem = new FoodItem({
                date,
                category,
                morning,
                afternoon,
                night,
                totalCalories,
                dailyVideo
            });

            await foodItem.save();
            res.status(201).json({ success: true, message: "Food item added successfully", foodItem });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // 2️⃣ Get today's food items (User)
    export const getTodayFoodItems = async (req, res) => {
        try {
            const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
            const { category } = req.query; 
            
            if (!category) {
                return res.status(400).json({ success: false, message: "Category is required." });
            }

            const foodItem = await FoodItem.findOne({ date: today, category });

            if (!foodItem) {
                return res.status(404).json({ success: false, message: `No food available for today in ${category} category.` });
            }

            res.status(200).json({ success: true, message: `Today's food item for ${category} fetched successfully`, foodItem });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // 3️⃣ Get food items by a specific date & category (User/Admin)
    export const getFoodByDate = async (req, res) => {
        try {
            const { date } = req.params;
            const { category } = req.query;

            if (!category) {
                return res.status(400).json({ success: false, message: "Category is required." });
            }

            const foodItem = await FoodItem.findOne({ date, category });

            if (!foodItem) {
                return res.status(404).json({ success: false, message: `No food available for ${date} in ${category} category.` });
            }

            res.status(200).json({ success: true, message: `Food item for ${date} in ${category} fetched successfully`, foodItem });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };

    // 4️⃣ Update food items for a specific date & category (Admin)
    export const updateFoodItem = async (req, res) => {
        try {
            const { date } = req.params;
            const { category } = req.query;
            const updateData = req.body;
    
            if (!category) {
                return res.status(400).json({ success: false, message: "Category is required." });
            }
    
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ success: false, message: "At least one field must be updated." });
            }
    
            const existingFoodItem = await FoodItem.findOne({ date, category });
    
            if (!existingFoodItem) {
                return res.status(404).json({ success: false, message: `Food item not found for ${date} in ${category} category.` });
            }
    
            // Merge existing data with new updates (only updating provided fields)
            const updatedFoodItem = await FoodItem.findOneAndUpdate(
                { date, category },
                {
                    $set: {
                        morning: {
                            name: updateData.morning?.name || existingFoodItem.morning.name,
                            calories: updateData.morning?.calories ?? existingFoodItem.morning.calories, // Keep existing if not provided
                            image: updateData.morning?.image || existingFoodItem.morning.image,
                        },
                        afternoon: {
                            name: updateData.afternoon?.name || existingFoodItem.afternoon.name,
                            calories: updateData.afternoon?.calories ?? existingFoodItem.afternoon.calories,
                            image: updateData.afternoon?.image || existingFoodItem.afternoon.image,
                        },
                        night: {
                            name: updateData.night?.name || existingFoodItem.night.name,
                            calories: updateData.night?.calories ?? existingFoodItem.night.calories,
                            image: updateData.night?.image || existingFoodItem.night.image,
                        },
                        dailyVideo: updateData.dailyVideo || existingFoodItem.dailyVideo,
                        totalCalories:
                            (updateData.morning?.calories ?? existingFoodItem.morning.calories) +
                            (updateData.afternoon?.calories ?? existingFoodItem.afternoon.calories) +
                            (updateData.night?.calories ?? existingFoodItem.night.calories),
                    },
                },
                { new: true }
            );
    
            res.status(200).json({
                success: true,
                message: `Food item for ${date} in ${category} updated successfully`,
                updatedFoodItem,
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    

    // 5️⃣ Delete food items for a specific date & category (Admin)
    export const deleteFoodItem = async (req, res) => {
        try {
            const { date } = req.params;
            const { category } = req.query;

            if (!category) {
                return res.status(400).json({ success: false, message: "Category is required." });
            }

            const deletedFoodItem = await FoodItem.findOneAndDelete({ date, category });

            if (!deletedFoodItem) {
                return res.status(404).json({ success: false, message: `Food item not found for ${date} in ${category} category.` });
            }

            res.status(200).json({ success: true, message: `Food item for ${date} in ${category} deleted successfully` });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
