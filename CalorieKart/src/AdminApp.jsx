import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin Screens
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageFoodItems from "./admin/ManageFoodItems";

export default function AdminApp() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /admin/login */}
        <Route path="/" element={<Navigate to="/admin/login" />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-food-items" element={<ManageFoodItems />} />
        
        {/* Catch-all route for unknown URLs */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

