import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@caloriecart.com" && password === "admin123") {
      navigate("/admin/manage-users");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&q=80&w=1920&h=1080&fit=crop')" }}
    >
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              {/* Email Input */}
              <Input
                type="email"
                placeholder="Email"
                autoComplete="off"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input with Eye Toggle */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-green-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
