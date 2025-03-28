import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function UserList() {
  const navigate = useNavigate();
  const location = useLocation();

  const usersData = {
    "Weight Gain": [
      { id: 1, name: "John Doe", address: "NY, USA", mobile: "1234567890", email: "john@example.com", expires: "2025-04-10" },
      { id: 2, name: "Alice Smith", address: "CA, USA", mobile: "9876543210", email: "alice@example.com", expires: "2025-05-15" },
    ],
    "Weight Loss": [
      { id: 3, name: "David Lee", address: "TX, USA", mobile: "1112223333", email: "david@example.com", expires: "2025-06-20" },
    ],
    "Maintain Fitness": [
      { id: 4, name: "Emma Watson", address: "FL, USA", mobile: "4445556666", email: "emma@example.com", expires: "2025-07-30" },
    ],
  };

  const categoryRefs = {
    "weight-gain": useRef(null),
    "weight-loss": useRef(null),
    "maintain-fitness": useRef(null),
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    
    if (category && categoryRefs[category]) {
      setTimeout(() => {
        categoryRefs[category].current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location]);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">Users List</h1>

      {Object.entries(usersData).map(([category, users]) => {
        const categoryKey = category.toLowerCase().replace(" ", "-");

        return (
          <div key={category} ref={categoryRefs[categoryKey]} className="mb-10 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-700">{category}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-4 border">Name</th>
                    <th className="p-4 border">Address</th>
                    <th className="p-4 border">Mobile</th>
                    <th className="p-4 border">Email</th>
                    <th className="p-4 border">Plan Expires In</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-gray-50 even:bg-gray-200 hover:bg-indigo-100 transition-all duration-300"
                    >
                      <td className="p-4 border">{user.name}</td>
                      <td className="p-4 border">{user.address}</td>
                      <td className="p-4 border">{user.mobile}</td>
                      <td className="p-4 border">{user.email}</td>
                      <td className="p-4 border">{user.expires}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Manage Food Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/admin/manage-food-items")}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-indigo-700"
              >
                <span className="text-2xl">+</span> Manage Food
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
