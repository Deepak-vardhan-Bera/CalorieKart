import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
        <CardContent>
          <div className="space-y-4">
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="number" placeholder="Height (cm)" />
            <Input type="number" placeholder="Weight (kg)" />
            <Button className="w-full">Register</Button>
            <p className="text-sm text-center text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
