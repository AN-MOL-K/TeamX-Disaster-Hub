import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Droplets, 
  Wind, 
  Flame,
  Mountain,
  Cloud,
  Thermometer,
  AlertTriangle,
  TrendingUp,
  Globe,
  Clock,
  MapPin
} from "lucide-react";

export default function DisasterInfo() {
  const disasters = [
    {
      id: "earthquake",
      name: "Earthquakes",
      icon: Zap,
      color: "bg-orange-500",
      description: "Sudden ground shaking caused by tectonic plate movement",
      frequency: "About 20,000 per year worldwide",
      severity: "Can range from barely felt to catastrophic",
      facts: [
        "The Pacific Ring of Fire accounts for 81% of earthquakes",
        "Most earthquakes occur at depths of 70km or less",
        "The largest recorded earthquake was 9.5 magnitude in Chile (1960)",
        "Alaska has the most earthquakes in the US"
      ],
      preparedness: [
        "Secure heavy furniture and appliances",
        "Practice Drop, Cover, and Hold On",
        "Keep emergency supplies accessible",
        "Know your building's safe spots"
      ],
      safetyTips: [
        "Drop to hands and knees immediately",
        "Take cover under a desk or table",
        "Hold on to your shelter and protect your head",
        "Stay away from glass and heavy objects"
      ]
    },
    {
      id: "hurricane",
      name: "Hurricanes",
      icon: Wind,
      color: "bg-blue-600",
      description: "Powerful tropical storms with winds exceeding 74 mph",
      frequency: "6-7 hurricanes per year in Atlantic",
      severity: "Categories 1-5 based on wind speed",
      facts: [
        "Hurricane season runs June 1 - November 30",
        "The eye of a hurricane can be 20-40 miles wide",
        "Storm surge causes 50% of hurricane deaths",
        "Hurricanes can spawn tornadoes"
      ],
      preparedness: [
        "Board up windows and secure outdoor items",
        "Stock emergency supplies for 7+ days",
        "Know evacuation routes and shelter locations",
        "Fill bathtubs and containers with water"
      ],
      safetyTips: [
        "Evacuate if ordered by authorities",
        "Stay indoors away from windows",
        "Use flashlights, not candles",
        "Don't venture out during the eye of the storm"
      ]
    },
    {
      id: "wildfire",
      name: "Wildfires",
      icon: Flame,
      color: "bg-red-500",
      description: "Fast-spreading fires in wildland areas",
      frequency: "60,000-70,000 per year in US",
      severity: "Depend on weather, terrain, and fuel",
      facts: [
        "Lightning causes 10% of wildfires, humans cause 90%",
        "Fire season is getting longer due to climate change",
        "Wildfires can move up to 14 mph",
        "They create their own weather systems"
      ],
      preparedness: [
        "Create defensible space around property",
        "Use fire-resistant landscaping",
        "Keep go-bags ready",
        "Plan multiple evacuation routes"
      ],
      safetyTips: [
        "Monitor local fire conditions",
        "Evacuate early if advised",
        "Close all windows and doors",
        "Remove flammable materials from around home"
      ]
    },
    {
      id: "flood",
      name: "Floods",
      icon: Droplets,
      color: "bg-cyan-500",
      description: "Overflow of water onto normally dry land",
      frequency: "Most common natural disaster",
      severity: "From minor to catastrophic damage",
      facts: [
        "6 inches of moving water can knock you down",
        "12 inches can carry away a vehicle",
        "Flash floods can occur within minutes",
        "Urban areas are increasingly flood-prone"
      ],
      preparedness: [
        "Know your evacuation routes",
        "Keep important documents elevated",
        "Install sump pumps if needed",
        "Sign up for flood warnings"
      ],
      safetyTips: [
        "Turn around, don't drown - avoid flooded roads",
        "Get to higher ground immediately",
        "Stay away from moving water",
        "Listen for evacuation orders"
      ]
    },
    {
      id: "tornado",
      name: "Tornadoes",
      icon: Wind,
      color: "bg-purple-600",
      description: "Violently rotating columns of air",
      frequency: "1,000-1,200 per year in US",
      severity: "EF0 to EF5 scale based on damage",
      facts: [
        "Tornado Alley includes parts of Texas, Oklahoma, Kansas",
        "Peak season is April through June",
        "Most occur between 3-9 PM",
        "Can have winds over 300 mph"
      ],
      preparedness: [
        "Know the signs of tornado weather",
        "Have a safe room identified",
        "Practice tornado drills",
        "Keep weather radio accessible"
      ],
      safetyTips: [
        "Go to lowest floor, interior room",
        "Avoid windows and large roof spans",
        "Get under sturdy furniture",
        "Protect head and neck with arms"
      ]
    },
    {
      id: "blizzard",
      name: "Blizzards",
      icon: Cloud,
      color: "bg-gray-500",
      description: "Severe snowstorms with high winds and low visibility",
      frequency: "Varies by region and season",
      severity: "Based on wind speed and snow accumulation",
      facts: [
        "Defined as winds over 35 mph with snow",
        "Visibility less than 1/4 mile for 3+ hours",
        "Can drop temperatures below freezing",
        "Great Plains and Northeast most affected"
      ],
      preparedness: [
        "Winterize your home and vehicles",
        "Stock heating fuel and warm clothing",
        "Keep flashlights and batteries ready",
        "Store non-perishable food"
      ],
      safetyTips: [
        "Stay indoors during the storm",
        "Avoid overexertion when shoveling",
        "Keep exhaust pipes clear on vehicles",
        "Conserve body heat and stay dry"
      ]
    }
  ];

  const globalStats = [
    { label: "Natural Disasters per Year", value: "300-400", icon: Globe },
    { label: "People Affected Annually", value: "200M+", icon: TrendingUp },
    { label: "Economic Losses", value: "$300B+", icon: TrendingUp },
    { label: "Average Response Time", value: "72 hours", icon: Clock }
  ];

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
            <h1 className="text-3xl font-bold text-foreground">Disaster Information Center</h1>
            <p className="text-muted-foreground">
              Learn about different types of disasters, their impacts, and how to stay safe
            </p>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {globalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Disaster Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {disasters.map((disaster) => {
            const Icon = disaster.icon;
            return (
              <Card key={disaster.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${disaster.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {disaster.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{disaster.description}</p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="facts" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="facts">Facts</TabsTrigger>
                      <TabsTrigger value="prepare">Prepare</TabsTrigger>
                      <TabsTrigger value="safety">Safety</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="facts" className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        <div className="bg-muted p-2 rounded text-sm">
                          <strong>Frequency:</strong> {disaster.frequency}
                        </div>
                        <div className="bg-muted p-2 rounded text-sm">
                          <strong>Severity:</strong> {disaster.severity}
                        </div>
                      </div>
                      <ul className="space-y-1 text-sm">
                        {disaster.facts.map((fact, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="prepare" className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        {disaster.preparedness.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="safety" className="space-y-2">
                      <ul className="space-y-2 text-sm">
                        {disaster.safetyTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Badge variant="destructive" className="text-xs mt-0.5 flex-shrink-0">
                              {index + 1}
                            </Badge>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Climate Change Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Climate Change Impact on Disasters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">Increasing Intensity</h4>
                <p className="text-sm text-muted-foreground">
                  Hurricanes, wildfires, and heat waves are becoming more intense due to rising global temperatures.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-orange-600">Changing Patterns</h4>
                <p className="text-sm text-muted-foreground">
                  Traditional disaster seasons are extending, with some disasters occurring in new regions.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-600">Sea Level Rise</h4>
                <p className="text-sm text-muted-foreground">
                  Coastal flooding and storm surge impacts are increasing as sea levels continue to rise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Emergency Resources & Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Emergency Services</h4>
                <div className="space-y-1 text-sm">
                  <div>Emergency: <Badge variant="destructive">911</Badge></div>
                  <div>Non-Emergency: <Badge variant="secondary">311</Badge></div>
                  <div>Poison Control: <Badge variant="outline">1-800-222-1222</Badge></div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Relief Organizations</h4>
                <div className="space-y-1 text-sm">
                  <div>Red Cross: <Badge variant="outline">1-800-RED-CROSS</Badge></div>
                  <div>Salvation Army: <Badge variant="outline">1-800-SAL-ARMY</Badge></div>
                  <div>FEMA: <Badge variant="outline">1-800-621-3362</Badge></div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Weather Services</h4>
                <div className="space-y-1 text-sm">
                  <div>National Weather Service</div>
                  <div>Weather.gov</div>
                  <div>Emergency Alert System</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Utilities</h4>
                <div className="space-y-1 text-sm">
                  <div>Report Power Outages</div>
                  <div>Gas Leak Emergency</div>
                  <div>Water Service Issues</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}