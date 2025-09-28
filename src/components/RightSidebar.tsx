import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Shield, AlertTriangle, LogOut, User, Crown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const preparednessItems = [
  { icon: Shield, title: "Emergency Kit", priority: "high" },
  { icon: AlertTriangle, title: "Evacuation Plan", priority: "high" },
  { icon: Bell, title: "Alert Systems", priority: "medium" },
  { icon: Mail, title: "Contact List", priority: "medium" },
];

const priorityColors = {
  high: "bg-destructive",
  medium: "bg-disaster-warning",
  low: "bg-status-verified"
};

export function RightSidebar() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleEmailSubscription = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address to subscribe to alerts.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubscribing(false);
      toast({
        title: "Subscription Successful!",
        description: `You'll now receive disaster alerts at ${email}. You can unsubscribe at any time.`,
      });
    }, 1500);
  };

  const handleViewAllTips = () => {
    toast({
      title: "Preparedness Tips",
      description: "Opening comprehensive disaster preparedness guide with safety tips and emergency procedures.",
    });
    // In a real app, this would navigate to a tips page
  };

  const handleTipClick = (tipTitle: string) => {
    toast({
      title: tipTitle,
      description: `Opening detailed guide for ${tipTitle.toLowerCase()}. Learn essential steps to stay prepared.`,
    });
    // In a real app, this would show detailed tip information
  };

  return (
    <aside className="w-80 space-y-6 p-6 bg-muted/30 h-screen sticky top-0 overflow-y-auto hidden xl:block">
      {/* Authentication Section */}
      {user ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-4 w-4" />
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{user.firstName} {user.lastName}</span>
                {user.role === 'admin' && (
                  <Badge variant="destructive" className="gap-1">
                    <Crown className="h-3 w-3" />
                    Admin
                  </Badge>
                )}
                {user.role === 'enduser' && (
                  <Badge variant="secondary">End User</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <div className="flex justify-between text-xs">
                <span>Contribution Score:</span>
                <span className="font-medium">{user.contributionScore}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Get Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline" className="w-full" onClick={handleSignUp}>
              Sign Up
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Join the community to verify disasters and help others stay safe.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Email Alerts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Email Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input 
            placeholder="Enter your email" 
            type="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribed}
          />
          <Button 
            variant={isSubscribed ? "outline" : "secondary"} 
            className="w-full"
            onClick={handleEmailSubscription}
            disabled={isSubscribing || isSubscribed}
          >
            {isSubscribing ? "Subscribing..." : isSubscribed ? "Subscribed ✓" : "Subscribe to Alerts"}
          </Button>
          <p className="text-xs text-muted-foreground">
            {isSubscribed 
              ? "You're subscribed! Check your email for confirmation."
              : "Get notified about disasters in your area and emergency updates."
            }
          </p>
        </CardContent>
      </Card>

      {/* Preparedness Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Preparedness Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {preparednessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-card rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleTipClick(item.title)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <Badge 
                  className={`${priorityColors[item.priority as keyof typeof priorityColors]} text-white text-xs`}
                >
                  {item.priority}
                </Badge>
              </div>
            );
          })}
          <Button variant="outline" className="w-full mt-3" onClick={handleViewAllTips}>
            View All Tips
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-xs text-muted-foreground">Active Reports</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-status-verified">856</div>
              <div className="text-xs text-muted-foreground">Verified</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}