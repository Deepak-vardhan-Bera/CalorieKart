import { useNavigate } from "react-router-dom";
import { Dumbbell, HeartPulse, Scale } from "lucide-react";

export default function ManageUsers() {
  const navigate = useNavigate();

  const categories = [
    { name: "Weight Gain", count: 40, path: "/admin/users?category=weight-gain", icon: <Dumbbell size={50} className="text-red-500" /> },
    { name: "Weight Loss", count: 35, path: "/admin/users?category=weight-loss", icon: <HeartPulse size={50} className="text-green-500" /> },
    { name: "Maintain Fitness", count: 25, path: "/admin/users?category=maintain-fitness", icon: <Scale size={50} className="text-blue-500" /> },
  ];

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-10" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&h=1080&fit=crop')" }}
    >
      <h1 className="text-4xl font-extrabold text-white mb-12 shadow-lg p-5 bg-black/70 rounded-xl">
        Users in Each Category
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative bg-white text-gray-900 shadow-xl rounded-2xl cursor-pointer text-center transition-all transform hover:scale-105 hover:shadow-2xl w-full h-80 flex flex-col justify-center items-center border border-gray-200 p-6"
            onClick={() => navigate(category.path)}
          >
            <div className="absolute top-[-25px] bg-white shadow-lg rounded-full p-3">{category.icon}</div>
            <h2 className="text-2xl font-bold mt-10">{category.name}</h2>
            <p className="text-5xl font-bold text-blue-600 mt-3">{category.count}</p>
            <p className="text-lg mt-2 text-gray-500">Users</p>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
              View Users
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
