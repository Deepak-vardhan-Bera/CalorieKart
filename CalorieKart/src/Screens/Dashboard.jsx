import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Play, Utensils, Coffee, Moon, User, Info, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("1");
  const [videoOpen, setVideoOpen] = useState(false);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);
  
  // Sample data - in real implementation, this would come from backend
  const mealPlans = {
    "1": {
      date: "2025-03-23",
      category: "Weight Gain",
      morning: {
        name: "Protein Oatmeal Bowl",
        calories: 450,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEZvb2R8ZW58MHx8MHx8fDA%3D",
        prepTime: "15 mins",
        cookTime: "10 mins",
        description: "A nutrient-dense breakfast bowl with oats, protein powder, fresh fruits, and nuts. Perfect for morning energy and muscle recovery."
      },
      afternoon: {
        name: "Grilled Chicken Salad",
        calories: 680,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEZvb2R8ZW58MHx8MHx8fDA%3D",
        prepTime: "20 mins",
        cookTime: "15 mins",
        description: "Lean grilled chicken breast served over a bed of mixed greens with avocado, cherry tomatoes, and a light vinaigrette dressing."
      },
      night: {
        name: "Salmon with Sweet Potato",
        calories: 720,
        image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fEZvb2R8ZW58MHx8MHx8fDA%3D",
        prepTime: "15 mins",
        cookTime: "25 mins",
        description: "Baked salmon fillet with herb seasoning, served with roasted sweet potatoes and steamed vegetables for a complete dinner."
      },
      totalCalories: 1850,
      targetCalories: 2000,
      dailyVideo: "https://example.com/fitness-day1"
    },
    "2": {
      date: "2025-03-24",
      category: "Weight Gain",
      morning: {
        name: "Avocado Toast with Eggs",
        calories: 520,
        image: "/api/placeholder/400/300",
        prepTime: "10 mins",
        cookTime: "5 mins",
        description: "Whole grain toast topped with mashed avocado, poached eggs, and a sprinkle of chili flakes for a protein-rich breakfast."
      },
      afternoon: {
        name: "Turkey Wrap with Hummus",
        calories: 630,
        image: "/api/placeholder/400/300",
        prepTime: "15 mins",
        cookTime: "0 mins",
        description: "Whole wheat wrap filled with sliced turkey, hummus, fresh vegetables, and a light spread of Greek yogurt sauce."
      },
      night: {
        name: "Beef Stir Fry with Rice",
        calories: 780,
        image: "/api/placeholder/400/300",
        prepTime: "20 mins",
        cookTime: "15 mins",
        description: "Lean beef strips stir-fried with colorful vegetables in a savory sauce, served over brown rice for a balanced dinner."
      },
      totalCalories: 1930,
      targetCalories: 2000,
      dailyVideo: "https://example.com/fitness-day2"
    },
    "3": null
  };
  
  // Function to open recipe dialog
  const openRecipe = (meal, type) => {
    const mealData = {...currentPlan[type], type: capitalize(type)};
    setSelectedMeal(mealData);
    setRecipeOpen(true);
  };
  
  // Helper function to capitalize first letter
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Simulate loading data from backend
  useEffect(() => {
    setLoading(true);
    
    // Get current day from state or set it based on today's date
    // For demo purposes we're just using "1" as the default day
    const currentDay = "1";
    setSelectedDay(currentDay);
    
    // Simulate backend data fetch
    const timer = setTimeout(() => {
      setCurrentPlan(mealPlans[selectedDay]);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [selectedDay]);
  
  // When day changes, update the current plan
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setCurrentPlan(mealPlans[selectedDay]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedDay]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-md w-full mb-6"></div>
      
      <div className="space-y-2 mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded-full w-full"></div>
      </div>
      
      <div className="h-48 bg-gray-200 rounded-lg w-full mb-6"></div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="space-y-3">
          <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="space-y-3">
          <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div 
        className="w-full h-56 bg-cover bg-center relative" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-900/80 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10 h-full flex items-end">
          <div className="flex items-center justify-between w-full pb-6">
            <h1 className="text-3xl font-bold text-white">Your Menu</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white/20 hover:bg-white/30"
              onClick={() => navigate('/profile')}
            >
              <User size={24} className="text-white" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 -mt-6">
        <Card className="overflow-hidden shadow-xl border-none">
          <div className="p-6 md:p-8">
            <Tabs defaultValue={selectedDay} onValueChange={setSelectedDay} className="w-full mb-6">
              <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="1" className="flex-1 rounded-md text-sm py-2">
                  Day 1
                </TabsTrigger>
                <TabsTrigger value="2" className="flex-1 rounded-md text-sm py-2">
                  Day 2
                </TabsTrigger>
                <TabsTrigger value="3" className="flex-1 rounded-md text-sm py-2">
                  Day 3
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {loading ? (
              <SkeletonLoader />
            ) : currentPlan ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Today's calorie goal</h2>
                    <span className="text-lg font-medium">
                      {currentPlan.totalCalories} / {currentPlan.targetCalories} cal
                      <span className="text-sm ml-2 text-green-600">
                        ({Math.floor((currentPlan.totalCalories / currentPlan.targetCalories) * 100)}%)
                      </span>
                    </span>
                  </div>
                  <Progress 
                    value={(currentPlan.totalCalories / currentPlan.targetCalories) * 100} 
                    className="h-3 rounded-full bg-gray-100" 
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="mb-6 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-md">
                    <CardHeader className="pb-2 bg-white/80">
                      <CardTitle className="text-xl flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Info size={20} className="text-blue-600" />
                          Daily Summary
                        </span>
                        <span className="text-sm font-normal px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {currentPlan.category}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col p-3 bg-white/70 rounded-lg">
                          <span className="text-sm text-gray-500">Total Calories</span>
                          <span className="text-xl font-bold">{currentPlan.totalCalories} cal</span>
                        </div>
                        <div className="flex flex-col p-3 bg-white/70 rounded-lg">
                          <span className="text-sm text-gray-500">Remaining</span>
                          <span className="text-xl font-bold">{currentPlan.targetCalories - currentPlan.totalCalories} cal</span>
                        </div>
                      </div>
                      
                      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full mt-4 flex gap-2 items-center justify-center bg-blue-600 hover:bg-blue-700">
                            <Play size={16} />
                            Watch Daily Workout Video
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <div className="aspect-video bg-gray-200 flex items-center justify-center">
                            <p>Video would play here</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={currentPlan.morning.image} 
                          alt={currentPlan.morning.name} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <CardHeader className="p-4 text-white">
                            <CardTitle className="text-xl flex items-center gap-2">
                              <Coffee size={20} />
                              Morning
                            </CardTitle>
                          </CardHeader>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{currentPlan.morning.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Calories</span>
                          <span className="text-lg font-bold text-blue-600">{currentPlan.morning.calories} cal</span>
                        </div>
                        <Button 
                          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                          onClick={() => openRecipe(currentPlan.morning, 'morning')}
                        >
                          View Recipe
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={currentPlan.afternoon.image} 
                          alt={currentPlan.afternoon.name} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <CardHeader className="p-4 text-white">
                            <CardTitle className="text-xl flex items-center gap-2">
                              <Utensils size={20} />
                              Afternoon
                            </CardTitle>
                          </CardHeader>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{currentPlan.afternoon.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Calories</span>
                          <span className="text-lg font-bold text-blue-600">{currentPlan.afternoon.calories} cal</span>
                        </div>
                        <Button 
                          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                          onClick={() => openRecipe(currentPlan.afternoon, 'afternoon')}
                        >
                          View Recipe
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden h-full shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={currentPlan.night.image} 
                          alt={currentPlan.night.name} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <CardHeader className="p-4 text-white">
                            <CardTitle className="text-xl flex items-center gap-2">
                              <Moon size={20} />
                              Night
                            </CardTitle>
                          </CardHeader>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{currentPlan.night.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Calories</span>
                          <span className="text-lg font-bold text-blue-600">{currentPlan.night.calories} cal</span>
                        </div>
                        <Button 
                          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                          onClick={() => openRecipe(currentPlan.night, 'night')}
                        >
                          View Recipe
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center text-gray-500 bg-gray-50 rounded-lg">
                <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No meal plan available yet</h3>
                <p className="mb-4">We're working on adding more plans soon!</p>
                <Button className="bg-blue-600 hover:bg-blue-700">Request Custom Plan</Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Recipe Dialog */}
      {selectedMeal && (
        <Dialog open={recipeOpen} onOpenChange={setRecipeOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <div className="grid md:grid-cols-2 h-full">
              <div className="h-full">
                <img 
                  src={selectedMeal.image} 
                  alt={selectedMeal.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {selectedMeal.type}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {currentPlan?.category}
                  </span>
                </div>
                
                <DialogTitle className="text-2xl font-bold mb-2">{selectedMeal.name}</DialogTitle>
                
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Prep: {selectedMeal.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Cook: {selectedMeal.cookTime}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Calories</span>
                    <span className="font-bold">{selectedMeal.calories} cal</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Protein</span>
                    <span className="font-bold">30g</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Carbs</span>
                    <span className="font-bold">45g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Fat</span>
                    <span className="font-bold">15g</span>
                  </div>
                </div>
                
                <DialogDescription className="text-base mb-6">
                  {selectedMeal.description}
                </DialogDescription>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Full Recipe Instructions
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}