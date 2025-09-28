import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, CreditCard, DollarSign, Users, Zap, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Donate() {
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [donationType, setDonationType] = useState("one-time");
  const { toast } = useToast();

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  const causes = [
    {
      title: "Hurricane Relief Fund",
      description: "Supporting communities affected by recent hurricanes",
      raised: 75000,
      goal: 100000,
      progress: 75,
      urgent: true,
    },
    {
      title: "Wildfire Emergency Response",
      description: "Providing immediate aid to wildfire victims",
      raised: 45000,
      goal: 80000,
      progress: 56,
      urgent: true,
    },
    {
      title: "Earthquake Recovery Program",
      description: "Long-term support for earthquake-affected areas",
      raised: 120000,
      goal: 200000,
      progress: 60,
      urgent: false,
    },
  ];

  const impactStats = [
    { icon: Users, label: "Families Helped", value: "2,847" },
    { icon: Shield, label: "Emergency Kits Distributed", value: "15,432" },
    { icon: Heart, label: "Medical Aid Provided", value: "8,291" },
    { icon: Zap, label: "Power Restored", value: "423 homes" },
  ];

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(donationAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank You for Your Donation!",
      description: `Your ${donationType} donation of $${amount} will help save lives and support disaster relief efforts.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/OIP.webp" 
              alt="Disaster Hub Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Support Disaster Relief</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your donation helps provide immediate relief and long-term recovery support to communities affected by disasters.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Make a Donation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Donation Type</label>
                  <div className="flex gap-2">
                    <Button
                      variant={donationType === "one-time" ? "default" : "outline"}
                      onClick={() => setDonationType("one-time")}
                      className="flex-1"
                    >
                      One-time
                    </Button>
                    <Button
                      variant={donationType === "monthly" ? "default" : "outline"}
                      onClick={() => setDonationType("monthly")}
                      className="flex-1"
                    >
                      Monthly
                    </Button>
                  </div>
                </div>

                {/* Quick Amount Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Choose Amount</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setDonationAmount("");
                        }}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={donationAmount}
                      onChange={(e) => {
                        setDonationAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Payment Method</label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">PayPal</Button>
                      <Button variant="outline" size="sm">Apple Pay</Button>
                    </div>
                  </div>
                </div>

                <Button onClick={handleDonate} className="w-full bg-red-600 hover:bg-red-700">
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Campaigns */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Active Campaigns</h3>
              <div className="space-y-4">
                {causes.map((cause, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{cause.title}</h4>
                          {cause.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{cause.description}</p>
                        <div className="space-y-2">
                          <Progress value={cause.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>${cause.raised.toLocaleString()} raised</span>
                            <span>${cause.goal.toLocaleString()} goal</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          Donate to This Cause
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Donate?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• 95% of donations go directly to relief efforts</p>
                <p>• Immediate response to disaster emergencies</p>
                <p>• Long-term community rebuilding support</p>
                <p>• Transparent tracking of fund usage</p>
                <p>• Tax-deductible contributions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}