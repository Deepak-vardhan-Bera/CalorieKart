import { useState } from "react";
import { Dumbbell, HeartPulse, Scale } from "lucide-react"; // Icons for categories

export default function ManageFoodItems() {
  const categories = [
    { name: "Weight Gain", icon: <Dumbbell className="text-red-500" size={24} /> },
    { name: "Weight Loss", icon: <HeartPulse className="text-green-500" size={24} /> },
    { name: "Maintain Fitness", icon: <Scale className="text-blue-500" size={24} /> },
  ];

  const initialFoodData = {
    morning: { name: "", calories: "", ingredients: "", type: "Veg" },
    afternoon: { name: "", calories: "", ingredients: "", type: "Veg" },
    night: { name: "", calories: "", ingredients: "", type: "Veg" },
    video: "",
  };

  const [foodItems, setFoodItems] = useState({
    "Weight Gain": { ...initialFoodData },
    "Weight Loss": { ...initialFoodData },
    "Maintain Fitness": { ...initialFoodData },
  });

  const handleChange = (category, time, field, value) => {
    setFoodItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [time]: { ...prev[category][time], [field]: value },
      },
    }));
  };

  const handleFileUpload = (category, time) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      console.log(`Uploading image for ${category} - ${time}`, event.target.files[0]);
    };
    input.click();
  };

  const handleVideoUpload = (category) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (event) => {
      console.log(`Uploading video for ${category}`, event.target.files[0]);
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Food Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map(({ name, icon }) => (
          <div key={name} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center flex items-center gap-2 mb-4">{icon} {name}</h2>
            {["morning", "afternoon", "night"].map((time) => (
              <div key={time} className="mb-4">
                <h3 className="text-lg font-semibold capitalize">{time} Food</h3>
                <input
                  type="text"
                  placeholder="Food Name"
                  className="w-full p-2 border rounded mt-1"
                  value={foodItems[name][time].name}
                  onChange={(e) => handleChange(name, time, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Calories"
                  className="w-full p-2 border rounded mt-1"
                  value={foodItems[name][time].calories}
                  onChange={(e) => handleChange(name, time, "calories", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Ingredients"
                  className="w-full p-2 border rounded mt-1"
                  value={foodItems[name][time].ingredients}
                  onChange={(e) => handleChange(name, time, "ingredients", e.target.value)}
                />
                <select
                  className="w-full p-2 border rounded mt-1"
                  value={foodItems[name][time].type}
                  onChange={(e) => handleChange(name, time, "type", e.target.value)}
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
                <button
                  className="w-full bg-indigo-600 text-white p-2 rounded mt-2"
                  onClick={() => handleFileUpload(name, time)}
                >
                  Upload Image
                </button>
              </div>
            ))}
            <button
              className="w-full bg-green-600 text-white p-2 rounded mt-4"
              onClick={() => handleVideoUpload(name)}
            >
              Upload Video
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}