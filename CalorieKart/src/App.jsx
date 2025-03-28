import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin Screens
import AdminLogin from "./admin/AdminLogin";
import ManageUsers from "./admin/ManageUsers";
import UserList from "./admin/UserList";
import ManageFoodItems from "./admin/ManageFoodItems";  // ✅ Import ManageFoodItems

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect /admin to /admin/login */}
        <Route path="/admin" element={<Navigate to="/admin/login" />} />

        {/* ✅ Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/manage-food-items" element={<ManageFoodItems />} />  {/* ✅ Add this route */}

        {/* Catch-All Route for unknown URLs */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}
