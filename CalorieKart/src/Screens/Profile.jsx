import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Target,
  Activity,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-gray-600">Weight Gain Program</p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Progress Overview Card */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="text-blue-600" />
                Progress Overview
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Current Weight</span>
                    <span className="font-medium">75 kg</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Target Weight</span>
                    <span className="font-medium">82 kg</span>
                  </div>
                  <Progress value={(75 / 82) * 100} className="h-2" />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Daily Calorie Goal</span>
                    <span className="font-medium">2000 cal</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Average daily intake: 1850 cal
                  </div>
                </div>
              </div>
            </Card>

            {/* Program Details Card */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="text-blue-600" />
                Program Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Program Type</span>
                  <span className="font-medium">Weight Gain</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">12 weeks</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium">March 1, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">End Date</span>
                  <span className="font-medium">May 24, 2025</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Account Settings Card */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="text-blue-600" />
              Account Settings
            </h2>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                Edit Profile Information
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Change Password
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Notification Preferences
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Privacy Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
