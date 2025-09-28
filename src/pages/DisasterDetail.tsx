import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ArrowLeft,
  Share,
  Heart,
  MessageCircle,
  Flag,
  Eye,
  Calendar,
  User,
  Phone,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import the generated images
import earthquakeImage from "@/assets/earthquake-damage.jpg";
import floodImage from "@/assets/flood-scene.jpg";
import wildfireImage from "@/assets/wildfire-emergency.jpg";

export default function DisasterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<"verified" | "pending" | "unverified">("pending");

  // Mock data - in a real app, this would come from an API based on the ID
  const mockDisasters = {
    "1": {
      id: "1",
      title: "6.2 Magnitude Earthquake Hits Downtown Area",
      type: "earthquake" as const,
      location: "San Francisco, CA",
      coordinates: "37.7749° N, 122.4194° W",
      image: earthquakeImage,
      verified: "verified" as const,
      description: "A significant 6.2 magnitude earthquake struck the downtown San Francisco area at 2:30 PM local time. The quake caused structural damage to several buildings in the financial district, with emergency responders currently on scene assessing the situation. Multiple aftershocks have been reported, and residents are advised to stay alert.",
      timestamp: "2 hours ago",
      reportedBy: "SF Emergency Services",
      casualties: { injured: 12, fatalities: 0 },
      affectedArea: "Downtown Financial District",
      emergencyResponse: "Active",
      updates: [
        { time: "4:45 PM", message: "Emergency shelters opened at Moscone Center and City Hall" },
        { time: "4:20 PM", message: "BART services suspended on all lines for safety inspection" },
        { time: "3:15 PM", message: "Structural engineers dispatched to assess building damage" },
        { time: "2:30 PM", message: "Initial earthquake reported, magnitude 6.2" }
      ],
      resources: [
        { type: "Shelter", name: "Moscone Center Emergency Shelter", contact: "(415) 555-0123" },
        { type: "Medical", name: "UCSF Emergency Services", contact: "(415) 555-0456" },
        { type: "Information", name: "SF Emergency Hotline", contact: "311" }
      ],
      safetyTips: [
        "Stay away from damaged buildings and structures",
        "Be prepared for aftershocks",
        "Check for gas leaks and turn off utilities if necessary",
        "Listen to official emergency broadcasts for updates"
      ]
    }
  };

  const disaster = mockDisasters[id as keyof typeof mockDisasters];

  if (!disaster) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Disaster Report Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const statusIcons = {
    verified: CheckCircle,
    pending: Clock,
    unverified: AlertTriangle
  };

  const statusColors = {
    verified: 'text-green-600',
    pending: 'text-yellow-600', 
    unverified: 'text-red-600'
  };

  const typeColors = {
    earthquake: 'bg-orange-500',
    flood: 'bg-blue-500', 
    fire: 'bg-red-500',
    storm: 'bg-purple-500',
    warning: 'bg-yellow-500'
  };

  const StatusIcon = statusIcons[currentStatus];

  const handleVerify = async () => {
    if (currentStatus === 'verified') {
      toast({
        title: "Already Verified",
        description: "This disaster report has already been verified by the community.",
      });
      return;
    }

    setIsVerifying(true);
    
    setTimeout(() => {
      setCurrentStatus('verified');
      setIsVerifying(false);
      toast({
        title: "Report Verified!",
        description: "Thank you for helping verify this disaster report.",
      });
    }, 1500);
  };

  const handleShare = () => {
    toast({
      title: "Share Link Copied",
      description: "The link to this disaster report has been copied to your clipboard.",
    });
  };

  const handleReport = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting this content. Our team will review it shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Reports
            </Button>
            <div className="flex items-center gap-2">
              <img 
                src="/OIP.webp" 
                alt="Disaster Hub Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-foreground">Disaster Hub</span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {disaster.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {disaster.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {disaster.timestamp}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {disaster.reportedBy}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${typeColors[disaster.type]} text-white`}>
                    {disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-1">
                    <StatusIcon className={`h-4 w-4 ${statusColors[currentStatus]}`} />
                    <span className="text-sm font-medium capitalize">{currentStatus}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleVerify} disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : currentStatus === 'verified' ? 'Verified' : 'Verify Report'}
                </Button>
                <Button variant="outline" onClick={handleShare} className="gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Support
                </Button>
                <Button variant="outline" onClick={handleReport} className="gap-2">
                  <Flag className="h-4 w-4" />
                  Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <Card>
              <CardContent className="p-0">
                <img 
                  src={disaster.image} 
                  alt={disaster.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Situation Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {disaster.description}
                </p>
              </CardContent>
            </Card>

            {/* Tabs for detailed information */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="updates" className="w-full">
                  <div className="border-b px-6 pt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="updates">Live Updates</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="safety">Safety Tips</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="updates" className="p-6 space-y-4">
                    {disaster.updates.map((update, index) => (
                      <div key={index} className="flex gap-3 pb-4">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-muted-foreground">{update.time}</div>
                          <p className="text-foreground mt-1">{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="resources" className="p-6 space-y-4">
                    {disaster.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{resource.name}</div>
                          <div className="text-sm text-muted-foreground">{resource.type}</div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Phone className="h-4 w-4" />
                          {resource.contact}
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="safety" className="p-6 space-y-3">
                    {disaster.safetyTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Impact Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{disaster.casualties.injured}</div>
                    <div className="text-xs text-muted-foreground">Injured</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{disaster.casualties.fatalities}</div>
                    <div className="text-xs text-muted-foreground">Fatalities</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Affected Area:</span>
                    <span className="font-medium">{disaster.affectedArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Response:</span>
                    <Badge variant="destructive">{disaster.emergencyResponse}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Coordinates:</span>
                    <span className="font-medium text-xs">{disaster.coordinates}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Emergency Services</span>
                  <Badge variant="destructive">911</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Local Emergency</span>
                  <Badge variant="secondary">311</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Red Cross</span>
                  <Badge variant="outline">1-800-RED-CROSS</Badge>
                </div>
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <ExternalLink className="h-4 w-4" />
                  More Resources
                </Button>
              </CardContent>
            </Card>

            {/* Community Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Join Discussion
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Heart className="h-4 w-4" />
                  Donate to Relief
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  Follow Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}