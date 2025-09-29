import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Upload, AlertTriangle, Camera, X, Image, Wifi, WifiOff, Cloud, CloudOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOfflineStorage } from "@/hooks/useOfflineStorage";

export default function ShareInfo() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    description: "",
    severity: "",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { 
    isOnline, 
    saveOfflineReport, 
    syncInProgress, 
    getOfflineReportsCount 
  } = useOfflineStorage();

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const validFiles = files.filter(file => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a valid image format. Please use JPG, PNG, GIF, or WebP.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: `${file.name} is too large. Please use images under 5MB.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (selectedImages.length + validFiles.length > 5) {
      toast({
        title: "Too Many Images",
        description: "You can upload a maximum of 5 images per report.",
        variant: "destructive",
      });
      return;
    }

    // Add new images to existing ones
    const newImages = [...selectedImages, ...validFiles];
    setSelectedImages(newImages);

    // Create preview URLs
    const newPreviews = [...imagePreviews];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
    
    try {
      // Save report (works both online and offline)
      await saveOfflineReport({
        title: formData.title,
        type: formData.type,
        location: formData.location,
        description: formData.description,
        severity: formData.severity,
        images: selectedImages
      });

      // Reset form
      setFormData({ title: "", type: "", location: "", description: "", severity: "" });
      setSelectedImages([]);
      setImagePreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          
          {/* Network Status Indicator */}
          <div className="flex justify-center">
            <Alert className={`max-w-md ${isOnline ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-orange-600" />
                )}
                <AlertDescription className={isOnline ? 'text-green-800' : 'text-orange-800'}>
                  {isOnline ? (
                    <span>You're connected. Reports will be submitted immediately.</span>
                  ) : (
                    <span>You're offline. Reports will be saved and synced when connection is restored.</span>
                  )}
                  {!isOnline && getOfflineReportsCount() > 0 && (
                    <span className="ml-2 font-medium">
                      ({getOfflineReportsCount()} pending)
                    </span>
                  )}
                  {syncInProgress && (
                    <span className="ml-2 flex items-center gap-1">
                      <Cloud className="h-3 w-3 animate-pulse" />
                      Syncing...
                    </span>
                  )}
                </AlertDescription>
              </div>
            </Alert>
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

                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Upload Images (Optional) - Max 5 images, 5MB each
                    </label>
                    
                    <div 
                      className="border-2 border-dashed border-muted-foreground rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const files = Array.from(e.dataTransfer.files);
                        const event = { target: { files } } as any;
                        handleImageUpload(event);
                      }}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop images here or click to browse
                      </p>
                      <Button variant="outline" size="sm" type="button">
                        <Image className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Selected Images ({selectedImages.length}/5):</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                                {(selectedImages[index].size / 1024 / 1024).toFixed(1)}MB
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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