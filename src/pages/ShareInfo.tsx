import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Upload, AlertTriangle, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ShareInfo() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
    severity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const disasterTypes = [
    { value: "earthquake", label: "Earthquake" },
    { value: "flood", label: "Flood" },
    { value: "fire", label: "Wildfire" },
    { value: "storm", label: "Storm" },
    { value: "hurricane", label: "Hurricane" },
    { value: "tornado", label: "Tornado" },
    { value: "other", label: "Other" },
  ];

  const severityLevels = [
    { value: "low", label: "Low", color: "bg-green-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "high", label: "High", color: "bg-orange-500" },
    { value: "critical", label: "Critical", color: "bg-red-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.location || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted Successfully!",
        description: "Thank you for sharing this information. Your report will be reviewed by the community.",
      });
      setFormData({ title: "", type: "", location: "", description: "", severity: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/OIP.webp" 
              alt="Disaster Hub Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Share Disaster Information</h1>
            <p className="text-muted-foreground">
              Help your community stay safe by sharing accurate disaster information. Your reports help others prepare and respond effectively.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Report a Disaster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                      placeholder="Brief description of the disaster"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Disaster Type *</label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {disasterTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Severity Level</label>
                      <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          {severityLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${level.color}`} />
                                {level.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location *
                    </label>
                    <Input
                      placeholder="City, State or specific address"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description *</label>
                    <Textarea
                      placeholder="Provide detailed information about the disaster, its impact, and current situation..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Upload Images (Optional)
                    </label>
                    <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drop images here or click to browse
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting Report..." : "Submit Report"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reporting Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">✅ Do Include:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Accurate location details</li>
                    <li>• Current situation updates</li>
                    <li>• Photos if safe to take</li>
                    <li>• Official information sources</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">❌ Don't Include:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Unverified rumors</li>
                    <li>• Personal information</li>
                    <li>• Graphic content</li>
                    <li>• Misinformation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Emergency:</span>
                  <Badge variant="destructive">911</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Non-Emergency:</span>
                  <Badge variant="secondary">311</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Red Cross:</span>
                  <Badge variant="outline">1-800-RED-CROSS</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}