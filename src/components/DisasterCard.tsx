import { MapPin, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DisasterCardProps {
  id: string;
  title: string;
  type: 'earthquake' | 'flood' | 'fire' | 'storm' | 'warning';
  location: string;
  image: string;
  verified: 'verified' | 'pending' | 'unverified';
  description: string;
  timestamp: string;
}

const typeLabels = {
  earthquake: 'Earthquake',
  flood: 'Flood',
  fire: 'Wildfire',
  storm: 'Storm',
  warning: 'Weather Alert'
};

const typeColors = {
  earthquake: 'bg-disaster-earthquake',
  flood: 'bg-disaster-flood', 
  fire: 'bg-disaster-fire',
  storm: 'bg-disaster-storm',
  warning: 'bg-disaster-warning'
};

const statusIcons = {
  verified: CheckCircle,
  pending: Clock,
  unverified: AlertTriangle
};

const statusColors = {
  verified: 'text-status-verified',
  pending: 'text-status-pending', 
  unverified: 'text-status-unverified'
};

export function DisasterCard({ 
  id, 
  title, 
  type, 
  location, 
  image, 
  verified, 
  description, 
  timestamp 
}: DisasterCardProps) {
  const [currentStatus, setCurrentStatus] = useState(verified);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const StatusIcon = statusIcons[currentStatus];

  const handleVerify = async () => {
    if (!hasPermission('verify_reports')) {
      toast({
        title: "Permission Denied",
        description: "Only admins can verify disaster reports. Please contact an administrator.",
        variant: "destructive",
      });
      return;
    }

    if (currentStatus === 'verified') {
      toast({
        title: "Already Verified",
        description: "This disaster report has already been verified by the community.",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setCurrentStatus('verified');
      setIsVerifying(false);
      toast({
        title: "Report Verified!",
        description: `Thank you for helping verify "${title}". Your contribution helps keep the community informed.`,
      });
    }, 1500);
  };

  const handleCardClick = () => {
    navigate(`/disaster/${id}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-card to-muted/30 cursor-pointer">
      <CardContent className="p-0" onClick={handleCardClick}>
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge 
            className={`absolute top-3 left-3 ${typeColors[type]} text-white font-medium`}
          >
            {typeLabels[type]}
          </Badge>
          <div className={`absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1`}>
            <StatusIcon className={`h-3 w-3 ${statusColors[currentStatus]}`} />
            <span className="text-xs font-medium capitalize">{currentStatus}</span>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">{timestamp}</span>
            {hasPermission('verify_reports') ? (
              <Button 
                size="sm" 
                variant={currentStatus === 'verified' ? 'secondary' : 'default'}
                className="text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVerify();
                }}
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : currentStatus === 'verified' ? 'Verified' : 'Verify'}
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <StatusIcon className={`h-3 w-3 ${statusColors[currentStatus]}`} />
                <span className="text-xs font-medium capitalize">{currentStatus}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}