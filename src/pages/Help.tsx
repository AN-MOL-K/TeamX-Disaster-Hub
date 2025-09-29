import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Shield, 
  HelpCircle,
  ExternalLink,
  Users,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  const emergencyContacts = [
    {
      service: "Emergency Services",
      number: "911",
      description: "Fire, Police, Medical Emergencies",
      available: "24/7",
      icon: AlertTriangle,
      priority: "critical"
    },
    {
      service: "Non-Emergency Police",
      number: "311",
      description: "Non-urgent police matters",
      available: "24/7",
      icon: Shield,
      priority: "high"
    },
    {
      service: "Poison Control",
      number: "1-800-222-1222",
      description: "Poison emergency assistance",
      available: "24/7",
      icon: Phone,
      priority: "high"
    },
    {
      service: "Disaster Relief Hotline",
      number: "1-800-621-3362",
      description: "Red Cross disaster assistance",
      available: "24/7",
      icon: Heart,
      priority: "medium"
    }
  ];

  const supportResources = [
    {
      title: "FEMA Disaster Assistance",
      description: "Federal disaster relief and recovery resources",
      contact: "1-800-621-3362",
      website: "www.fema.gov",
      icon: Shield
    },
    {
      title: "Red Cross Emergency Assistance",
      description: "Shelter, food, and emergency aid",
      contact: "1-800-733-2767",
      website: "www.redcross.org",
      icon: Heart
    },
    {
      title: "Salvation Army Disaster Relief",
      description: "Emergency shelter and disaster recovery",
      contact: "1-800-725-2769",
      website: "www.salvationarmyusa.org",
      icon: Users
    },
    {
      title: "211 Community Resources",
      description: "Local community services and assistance",
      contact: "211",
      website: "www.211.org",
      icon: MapPin
    }
  ];

  const faqItems = [
    {
      question: "How do I report a disaster?",
      answer: "Use our 'Share Info' feature to submit disaster reports with photos and location details. Your reports help the community stay informed and safe."
    },
    {
      question: "What should I do during an earthquake?",
      answer: "Drop, Cover, and Hold On. Get under a sturdy desk or table, cover your head and neck, and hold on until the shaking stops."
    },
    {
      question: "How can I prepare for emergencies?",
      answer: "Create an emergency kit with water, food, medications, and important documents. Develop a family communication plan and know your evacuation routes."
    },
    {
      question: "How do I verify disaster reports?",
      answer: "Verified users can review and verify disaster reports. Look for multiple sources, check photos for authenticity, and confirm with local authorities when possible."
    },
    {
      question: "What if I need immediate help?",
      answer: "Call 911 for immediate emergencies. For non-urgent assistance, contact 311 or use the emergency contacts listed on this page."
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="h-8 w-8" />
              Help & Support
            </h1>
            <p className="text-muted-foreground mt-1">
              Emergency contacts, resources, and answers to common questions
            </p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        {/* Emergency Alert */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Emergency Situation?</h3>
                <p className="text-red-700 text-sm">
                  If you're in immediate danger, call <strong>911</strong> right away. Don't use this app for emergency reporting.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>Important numbers to call during emergencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{contact.service}</h4>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{contact.available}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`${getPriorityColor(contact.priority)} text-white text-xs`}>
                          {contact.priority}
                        </Badge>
                      </div>
                      <a 
                        href={`tel:${contact.number}`}
                        className="text-lg font-bold text-primary hover:underline"
                      >
                        {contact.number}
                      </a>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Support Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Support Resources
              </CardTitle>
              <CardDescription>Organizations that provide disaster assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <a href={`tel:${resource.contact}`} className="text-primary hover:underline">
                              {resource.contact}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <ExternalLink className="h-3 w-3" />
                            <a 
                              href={`https://${resource.website}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {resource.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Common questions about disaster response and preparedness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and helpful resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => navigate('/share-info')}
              >
                <AlertTriangle className="h-6 w-6" />
                Report Disaster
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => navigate('/preparedness-tips')}
              >
                <Shield className="h-6 w-6" />
                Preparedness Tips
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2"
                onClick={() => navigate('/donate')}
              >
                <Heart className="h-6 w-6" />
                Donate Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Technical Support</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Having trouble with the app? Need help reporting disasters or accessing features?
                </p>
                <div className="space-y-1 text-sm">
                  <div>📧 support@disasterhub.com</div>
                  <div>📞 1-800-HELP-123</div>
                  <div>💬 Live chat available 24/7</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Community Support</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Connect with other community members and share experiences.
                </p>
                <div className="space-y-1 text-sm">
                  <div>🌐 community.disasterhub.com</div>
                  <div>📱 Discord: DisasterHub Community</div>
                  <div>📘 Facebook: @DisasterHubSupport</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;