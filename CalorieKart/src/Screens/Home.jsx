import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Dumbbell, Clock, Leaf, ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function Home() {
  const features = [
    {
      icon: <Dumbbell className="h-6 w-6" />,
      title: "Personalized Meal Plans",
      description: "Customized meals based on your fitness goals - whether you want to lose weight, gain muscle, or maintain fitness."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Timely Deliveries",
      description: "Three perfectly timed deliveries per day ensuring you always have fresh, nutritious meals ready."
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Fresh Ingredients",
      description: "Premium quality, locally sourced ingredients prepared by expert chefs for maximum nutrition."
    },
    {
      icon: <ChefHat className="h-6 w-6" />,
      title: "Expert Guidance",
      description: "Daily video guides from nutrition experts helping you understand your meal plan better."
    }
  ];

  const nutritionInfo = [
    {
      name: "Quinoa Bowl",
      calories: 320,
      protein: "12g",
      carbs: "45g",
      fats: "10g",
      description: "High in protein and fiber, perfect for post-workout recovery",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Grilled Salmon",
      calories: 412,
      protein: "46g",
      carbs: "0g",
      fats: "22g",
      description: "Rich in omega-3 fatty acids and high-quality protein",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Greek Yogurt Parfait",
      calories: 245,
      protein: "18g",
      carbs: "28g",
      fats: "8g",
      description: "Probiotic-rich breakfast with fresh berries and honey",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CalorieKart
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

    {/* Hero Section */}
<section className="relative bg-gradient-to-b from-primary/5 to-background pt-16 pb-30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <h1 className="text-6xl font-bold tracking-tight mb-6 text-foreground">
          Transform Your Diet
          <span className="block text-primary">Transform Your Life</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Experience the perfect blend of nutrition and taste with CalorieKart's personalized meal plans. Fresh, delicious, and tailored to your fitness goals.
        </p>
        <div className="flex items-center space-x-4">
        <Link to="/signup">
  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
    Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
</Link>

          <Button size="lg" variant="outline" className="text-foreground border-foreground/20">
            Watch Demo
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10"
      >
        {/* Main image with placeholder fallback */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-1 shadow-xl">
          <div className="aspect-video w-full rounded-xl shadow-2xl bg-gray-100 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=800"
              alt="Healthy meal preparation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Bottom left thumbnail */}
        <div className="absolute -bottom-6 -left-6">
          <div className="bg-background rounded-lg p-1 shadow-xl">
            <div className="w-32 h-32 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?auto=format&fit=crop&q=80&w=300"
                alt="Healthy ingredients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Top right thumbnail */}
        <div className="absolute -top-6 -right-6">
          <div className="bg-background rounded-lg p-1 shadow-xl">
            <div className="w-32 h-32 rounded-lg bg-gray-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&q=80&w=300"
                alt="Meal planning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Nutrition Information Section */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nutritious Meals for Every Goal</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully crafted meals that provide the perfect balance of nutrients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {nutritionInfo.map((meal, index) => (
              <motion.div
                key={meal.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                    <p className="text-muted-foreground mb-4">{meal.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Calories</p>
                        <p className="text-xl font-bold text-primary">{meal.calories}</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Protein</p>
                        <p className="text-xl font-bold text-primary">{meal.protein}</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Carbs</p>
                        <p className="text-xl font-bold text-primary">{meal.carbs}</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Fats</p>
                        <p className="text-xl font-bold text-primary">{meal.fats}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&q=80&w=3032')] bg-cover bg-fixed bg-center">
        <div className="absolute inset-0 bg-background/95" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CalorieKart?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine nutrition science with culinary excellence to help you achieve your fitness goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full bg-card/50 backdrop-blur-sm hover:bg-accent/50 transition-colors border-primary/10">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=3032')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Diet?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have achieved their fitness goals with CalorieKart's personalized meal plans.
          </p>
          <Button size="lg" variant="secondary" className="text-primary" asChild>
            <Link to="/signup">Get Started Today <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
                <span className="font-semibold">CalorieKart</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your partner in achieving fitness goals through personalized nutrition.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/refund">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@caloriekart.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Fitness Street</li>
                <li>Health City, HC 12345</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/20">
            <p className="text-sm text-center text-muted-foreground">
              © 2024 CalorieKart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;