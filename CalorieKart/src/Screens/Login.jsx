import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <CardContent>
          <div className="space-y-4">
            <Input type="email" placeholder="Email" className="w-full" />
            <Input type="password" placeholder="Password" className="w-full" />
            <Button className="w-full">Login</Button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
