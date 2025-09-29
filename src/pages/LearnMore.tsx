import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Shield, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin,
  Heart,
  Zap,
  Eye,
  Info,
  PlayCircle,
  Download,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  const learningModules = [
    {
      id: 1,
      title: "Earthquake Preparedness",
      description: "Learn how to prepare for and respond to earthquakes effectively",
      duration: "15 min",
      difficulty: "Beginner",
      progress: 0,
      icon: AlertTriangle,
      topics: ["Drop, Cover, Hold", "Emergency Kits", "Home Safety", "After the Quake"]
    },
    {
      id: 2,
      title: "Flood Safety & Response",
      description: "Understanding flood risks and proper evacuation procedures",
      duration: "20 min",
      difficulty: "Beginner",
      progress: 0,
      icon: Shield,
      topics: ["Flood Types", "Evacuation Routes", "Water Safety", "Recovery Steps"]
    },
    {
      id: 3,
      title: "Wildfire Evacuation",
      description: "Essential knowledge for wildfire-prone areas",
      duration: "18 min",
      difficulty: "Intermediate",
      progress: 0,
      icon: Zap,
      topics: ["Evacuation Zones", "Go-Bags", "Fire Defense", "Air Quality"]
    },
    {
      id: 4,
      title: "Community Response",
      description: "How to organize and help your community during disasters",
      duration: "25 min",
      difficulty: "Advanced",
      progress: 0,
      icon: Users,
      topics: ["Neighborhood Networks", "Communication", "Resource Sharing", "Recovery"]
    }
  ];

  const quickTips = [
    {
      category: "Emergency Kit",
      icon: Shield,
      tips: [
        "Store 1 gallon of water per person per day for 3 days",
        "Keep non-perishable food for 3 days minimum",
        "Include flashlight, radio, and extra batteries",
        "Pack first aid kit and personal medications",
        "Store copies of important documents in waterproof container"
      ]
    },
    {
      category: "Communication Plan",
      icon: Users,
      tips: [
        "Choose out-of-state contact person for family coordination",
        "Ensure everyone knows important phone numbers by heart",
        "Establish meeting places near home and neighborhood",
        "Keep emergency contact cards in wallets/purses",
        "Practice your plan with all family members regularly"
      ]
    },
    {
      category: "Home Safety",
      icon: MapPin,
      tips: [
        "Secure heavy furniture and appliances to walls",
        "Know how to turn off utilities (gas, water, electricity)",
        "Install smoke and carbon monoxide detectors",
        "Keep fire extinguisher and know how to use it",
        "Clear debris from yard that could become projectiles"
      ]
    }
  ];

  const statistics = [
    {
      number: "90%",
      label: "of disasters are weather-related",
      icon: AlertTriangle
    },
    {
      number: "72 hours",
      label: "average time before help arrives",
      icon: Clock
    },
    {
      number: "60%",
      label: "of families don't have emergency plan",
      icon: Users
    },
    {
      number: "3 days",
      label: "minimum supplies you should store",
      icon: Shield
    }
  ];

  const resources = [
    {
      title: "FEMA Preparedness Guide",
      description: "Comprehensive federal guide to disaster preparedness",
      type: "PDF Download",
      size: "2.3 MB",
      icon: Download
    },
    {
      title: "Red Cross Emergency App",
      description: "Mobile app with emergency alerts and safety tips",
      type: "Mobile App",
      size: "Free",
      icon: PlayCircle
    },
    {
      title: "Ready.gov Resources",
      description: "Government resources for emergency preparedness",
      type: "Website",
      size: "Online",
      icon: ExternalLink
    },
    {
      title: "Local Emergency Management",
      description: "Connect with your local emergency management office",
      type: "Directory",
      size: "Varies",
      icon: MapPin
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              Learn More
            </h1>
            <p className="text-muted-foreground mt-1">
              Educational resources for disaster preparedness and community response
            </p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Modules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Interactive Learning Modules
            </CardTitle>
            <CardDescription>
              Comprehensive courses on disaster preparedness and response
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningModules.map((module) => {
                const Icon = module.icon;
                return (
                  <div key={module.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className="h-6 w-6 text-primary mt-1" />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{module.duration}</span>
                      <Badge className={`${getDifficultyColor(module.difficulty)} text-white text-xs ml-2`}>
                        {module.difficulty}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      Start Learning
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Quick Preparedness Tips
            </CardTitle>
            <CardDescription>
              Essential tips you can implement today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {quickTips.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index}>
                    <h3 className="font-medium text-foreground flex items-center gap-2 mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                      {section.category}
                    </h3>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Additional Resources
            </CardTitle>
            <CardDescription>
              External tools and guides for further learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Community Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community Stories
              </CardTitle>
              <CardDescription>
                Real experiences from disaster survivors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm italic mb-2">
                    "Having an emergency kit saved our family during the 2023 floods. We were without power for 5 days but had everything we needed."
                  </p>
                  <p className="text-xs text-muted-foreground">- Sarah M., Houston TX</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm italic mb-2">
                    "Our neighborhood communication plan helped us evacuate safely during the wildfire. Everyone knew exactly what to do."
                  </p>
                  <p className="text-xs text-muted-foreground">- Mike C., California</p>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Read More Stories
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Get Involved
              </CardTitle>
              <CardDescription>
                Ways to help your community prepare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/share-info')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Become a Disaster Reporter
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/donate')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Support Relief Efforts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Organize Local Group
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Volunteer with Red Cross
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-4">
              Take the first step in making your community more resilient to disasters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/preparedness-tips')}>
                View Preparedness Tips
              </Button>
              <Button variant="outline" onClick={() => navigate('/share-info')}>
                Report a Disaster
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearnMore;