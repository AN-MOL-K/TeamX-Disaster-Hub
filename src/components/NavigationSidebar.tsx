import { 
  Home, 
  Share, 
  Heart, 
  Shield, 
  AlertTriangle, 
  HelpCircle, 
  Info, 
  User,
  Settings,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const baseNavigationItems = [
  { icon: Home, label: "Home", path: "/", roles: ["guest", "enduser", "admin"] },
  { icon: Share, label: "Share Info", path: "/share-info", roles: ["enduser", "admin"] },
  { icon: Heart, label: "Donate", path: "/donate", roles: ["guest", "enduser", "admin"] },
  { icon: Shield, label: "Preparedness Tips", path: "/preparedness-tips", roles: ["guest", "enduser", "admin"] },
  { icon: AlertTriangle, label: "Disaster's Info", path: "/disaster-info", roles: ["guest", "enduser", "admin"] },
  { icon: HelpCircle, label: "Help", path: "/help", roles: ["guest", "enduser", "admin"] },
  { icon: Info, label: "Learn More", path: "/learn-more", roles: ["guest", "enduser", "admin"] },
  { icon: User, label: "Profile", path: "/profile", roles: ["enduser", "admin"] },
];

const adminNavigationItems = [
  { icon: BarChart3, label: "Analytics", path: "/analytics", roles: ["admin"] },
  { icon: Settings, label: "Manage Users", path: "/manage-users", roles: ["admin"] },
];

export function NavigationSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission } = useAuth();
  const { toast } = useToast();

  const getNavigationItems = () => {
    const userRole = user?.role || "guest";
    const filteredItems = baseNavigationItems.filter(item => 
      item.roles.includes(userRole)
    );
    
    // Add admin items if user is admin
    if (user?.role === "admin") {
      return [...filteredItems, ...adminNavigationItems];
    }
    
    return filteredItems;
  };

  const handleNavigation = (item: typeof baseNavigationItems[0]) => {
    if (item.path === "/help" || item.path === "/learn-more" || item.path === "/analytics" || item.path === "/manage-users") {
      // For pages we haven't created yet, show toast
      const actionMessages = {
        "/help": "Get help and support. Contact emergency services or find local resources.",
        "/learn-more": "Discover more about disaster preparedness and community response.",
        "/analytics": "View detailed analytics and reports dashboard (Admin only).",
        "/manage-users": "Manage user accounts and permissions (Admin only)."
      };

      toast({
        title: item.label,
        description: actionMessages[item.path as keyof typeof actionMessages] || `${item.label} page coming soon!`,
      });
    } else {
      navigate(item.path);
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 p-4 space-y-2 hidden lg:block">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <img 
            src="/OIP.webp" 
            alt="Disaster Hub Logo" 
            className="w-10 h-10 object-contain"
          />
          <h2 className="text-lg font-semibold text-foreground">
            Disaster Hub
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Community-driven disaster response
        </p>
      </div>
      
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 h-11"
              onClick={() => handleNavigation(item)}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </nav>
      
      <div className="pt-6 mt-auto">
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-sm text-foreground">
            Emergency Contacts
          </h3>
          <p className="text-xs text-muted-foreground">
            Emergency: 911<br />
            Non-Emergency: 311
          </p>
        </div>
      </div>
    </aside>
  );
}