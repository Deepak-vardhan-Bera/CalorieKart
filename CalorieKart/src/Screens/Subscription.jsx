import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Subscription() {
  const plans = [
    { name: "Weekly Plan", price: "₹499", duration: "7 Days" },
    { name: "Monthly Plan", price: "₹1799", duration: "30 Days" },
    { name: "Yearly Plan", price: "₹19999", duration: "1 Year" },
  ];

  const handlePayment = (plan) => {
    alert(`Processing payment for ${plan.name}`);
    // Razorpay integration logic here
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Choose a Subscription Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className="p-4 text-center">
            <CardContent>
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="text-xl font-bold">{plan.price}</p>
              <p className="text-sm text-gray-500">{plan.duration}</p>
              <Button className="mt-4 w-full" onClick={() => handlePayment(plan)}>
                Subscribe
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
