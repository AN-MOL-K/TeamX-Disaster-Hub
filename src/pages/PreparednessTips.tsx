import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Home, 
  Briefcase, 
  Car, 
  Heart, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Droplets,
  Wind,
  Flame
} from "lucide-react";

export default function PreparednessTips() {
  const [completedTips, setCompletedTips] = useState<string[]>([]);

  const toggleTipComplete = (tipId: string) => {
    setCompletedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const disasterTypes = [
    {
      id: "earthquake",
      name: "Earthquake",
      icon: Zap,
      color: "bg-orange-500",
      tips: [
        { id: "eq1", text: "Secure heavy furniture and appliances to walls", category: "home" },
        { id: "eq2", text: "Keep emergency supplies in multiple locations", category: "supplies" },
        { id: "eq3", text: "Practice 'Drop, Cover, and Hold On' drills", category: "safety" },
        { id: "eq4", text: "Identify safe spots in each room", category: "home" },
        { id: "eq5", text: "Create a family communication plan", category: "communication" }
      ]
    },
    {
      id: "flood",
      name: "Flood",
      icon: Droplets,
      color: "bg-blue-500",
      tips: [
        { id: "fl1", text: "Know your evacuation routes and higher ground locations", category: "safety" },
        { id: "fl2", text: "Keep important documents in waterproof containers", category: "supplies" },
        { id: "fl3", text: "Install sump pumps and backup power", category: "home" },
        { id: "fl4", text: "Sign up for local flood warnings", category: "communication" },
        { id: "fl5", text: "Practice evacuation with pets", category: "safety" }
      ]
    },
    {
      id: "hurricane",
      name: "Hurricane",
      icon: Wind,
      color: "bg-purple-500",
      tips: [
        { id: "hu1", text: "Board up windows and secure outdoor items", category: "home" },
        { id: "hu2", text: "Stock up on non-perishable food and water", category: "supplies" },
        { id: "hu3", text: "Fill bathtubs and containers with water", category: "supplies" },
        { id: "hu4", text: "Charge all electronic devices", category: "communication" },
        { id: "hu5", text: "Know shelter locations in your area", category: "safety" }
      ]
    },
    {
      id: "wildfire",
      name: "Wildfire",
      icon: Flame,
      color: "bg-red-500",
      tips: [
        { id: "wf1", text: "Create defensible space around your home", category: "home" },
        { id: "wf2", text: "Keep a go-bag ready with essentials", category: "supplies" },
        { id: "wf3", text: "Install fire-resistant roofing and siding", category: "home" },
        { id: "wf4", text: "Monitor local fire conditions regularly", category: "communication" },
        { id: "wf5", text: "Plan multiple evacuation routes", category: "safety" }
      ]
    }
  ];

  const essentialSupplies = [
    { category: "Water & Food", items: ["1 gallon water per person per day (3-day supply)", "3-day supply of non-perishable food", "Manual can opener", "Disposable plates and utensils"] },
    { category: "First Aid", items: ["First aid kit", "Prescription medications", "Over-the-counter medications", "Medical supplies"] },
    { category: "Communication", items: ["Battery or hand-crank radio", "Cell phone chargers", "Emergency contact list", "Whistle for signaling"] },
    { category: "Tools & Supplies", items: ["Flashlights", "Batteries", "Multi-tool or knife", "Duct tape and plastic sheeting"] },
    { category: "Personal Items", items: ["Change of clothing", "Sleeping bags or blankets", "Personal hygiene items", "Important documents copies"] }
  ];

  const categoryIcons = {
    home: Home,
    supplies: Briefcase,
    safety: Shield,
    communication: Phone
  };

  const categoryColors = {
    home: "bg-green-500",
    supplies: "bg-blue-500",
    safety: "bg-red-500",
    communication: "bg-purple-500"
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/OIP.webp" 
              alt="Disaster Hub Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Disaster Preparedness Guide</h1>
            <p className="text-muted-foreground">
              Be ready for any emergency with our comprehensive preparedness tips and checklists
            </p>
          </div>
        </div>

        <Tabs defaultValue="disasters" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="disasters">By Disaster Type</TabsTrigger>
            <TabsTrigger value="supplies">Emergency Kit</TabsTrigger>
            <TabsTrigger value="planning">Family Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="disasters" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {disasterTypes.map((disaster) => {
                const Icon = disaster.icon;
                return (
                  <Card key={disaster.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${disaster.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        {disaster.name} Preparedness
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {disaster.tips.map((tip) => {
                          const CategoryIcon = categoryIcons[tip.category as keyof typeof categoryIcons];
                          const isCompleted = completedTips.includes(tip.id);
                          
                          return (
                            <div
                              key={tip.id}
                              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                                isCompleted ? 'bg-green-50 border-green-200' : 'hover:bg-muted/50'
                              }`}
                              onClick={() => toggleTipComplete(tip.id)}
                            >
                              <div className="flex-shrink-0 mt-1">
                                {isCompleted ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                  {tip.text}
                                </p>
                                <Badge 
                                  variant="outline" 
                                  className={`mt-1 text-xs ${categoryColors[tip.category as keyof typeof categoryColors]} text-white border-0`}
                                >
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {tip.category}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="supplies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Emergency Supply Kit Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {essentialSupplies.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-semibold text-lg">{category.category}</h3>
                      <div className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <div className="h-3 w-3 border border-muted-foreground rounded" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">3-Day Supply</h3>
                  <p className="text-sm text-muted-foreground">Minimum recommended emergency supplies</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Multiple Locations</h3>
                  <p className="text-sm text-muted-foreground">Keep supplies at home, work, and in car</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Regular Updates</h3>
                  <p className="text-sm text-muted-foreground">Check and refresh supplies every 6 months</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Family Emergency Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Communication Plan</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Designate an out-of-state contact person</li>
                      <li>• Program emergency numbers in all phones</li>
                      <li>• Choose meeting places near home and work</li>
                      <li>• Keep emergency contact cards in wallets</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Evacuation Planning</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Know multiple routes out of your area</li>
                      <li>• Practice evacuation with entire family</li>
                      <li>• Plan for pets and livestock</li>
                      <li>• Identify shelter locations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Important Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Keep Copies Safe</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Driver's licenses and ID cards</li>
                      <li>• Passports and birth certificates</li>
                      <li>• Insurance policies</li>
                      <li>• Bank and credit card information</li>
                      <li>• Medical records and prescriptions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm"><strong>Tip:</strong> Store copies in waterproof containers and consider digital backups in cloud storage.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Special Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Seniors & Disabled
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Extra medical supplies</li>
                      <li>• Backup power for devices</li>
                      <li>• Accessible evacuation routes</li>
                      <li>• Support network contacts</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Children
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Age-appropriate explanations</li>
                      <li>• Comfort items and games</li>
                      <li>• School emergency plans</li>
                      <li>• Updated emergency contacts</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Pets
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Pet-friendly shelter locations</li>
                      <li>• Vaccination records</li>
                      <li>• Pet supplies and medications</li>
                      <li>• Identification and photos</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}