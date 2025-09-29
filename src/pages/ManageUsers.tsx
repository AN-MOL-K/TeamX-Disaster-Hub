import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Filter, 
  Settings, 
  UserPlus, 
  Shield, 
  Eye, 
  Edit, 
  Trash2,
  Crown,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'enduser' | 'guest';
  status: 'active' | 'inactive' | 'suspended';
  lastActive: string;
  reportsSubmitted: number;
  joinDate: string;
}

const ManageUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Mock user data
  const mockUsers: UserData[] = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@teamx.com",
      role: "admin",
      status: "active",
      lastActive: "2 minutes ago",
      reportsSubmitted: 45,
      joinDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "enduser",
      status: "active",
      lastActive: "1 hour ago",
      reportsSubmitted: 23,
      joinDate: "2024-03-20"
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      role: "enduser",
      status: "active",
      lastActive: "3 hours ago",
      reportsSubmitted: 31,
      joinDate: "2024-02-10"
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "enduser",
      status: "inactive",
      lastActive: "2 days ago",
      reportsSubmitted: 7,
      joinDate: "2024-04-05"
    },
    {
      id: "5",
      name: "James Wilson",
      email: "james.wilson@email.com",
      role: "enduser",
      status: "suspended",
      lastActive: "1 week ago",
      reportsSubmitted: 12,
      joinDate: "2024-01-30"
    },
    {
      id: "6",
      name: "Guest User",
      email: "guest@example.com",
      role: "guest",
      status: "active",
      lastActive: "30 minutes ago",
      reportsSubmitted: 0,
      joinDate: "2024-09-29"
    }
  ];

  const filteredUsers = mockUsers.filter(userData => {
    const matchesSearch = userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userData.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || userData.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'enduser': return <User className="h-4 w-4 text-blue-500" />;
      case 'guest': return <Eye className="h-4 w-4 text-gray-500" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'enduser': return 'secondary';
      case 'guest': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleUserAction = (action: string, userId: string, userName: string) => {
    toast({
      title: `${action} User`,
      description: `Action "${action}" performed on user ${userName}`,
    });
  };

  const userStats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
    endusers: mockUsers.filter(u => u.role === 'enduser').length,
    guests: mockUsers.filter(u => u.role === 'guest').length
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-8 w-8" />
              Manage Users
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{userStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">{userStats.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-500">{userStats.admins}</div>
              <div className="text-sm text-muted-foreground">Admins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">{userStats.endusers}</div>
              <div className="text-sm text-muted-foreground">End Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-500">{userStats.guests}</div>
              <div className="text-sm text-muted-foreground">Guests</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterRole === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterRole("all")}
                >
                  All
                </Button>
                <Button
                  variant={filterRole === "admin" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterRole("admin")}
                >
                  <Crown className="h-4 w-4 mr-1" />
                  Admins
                </Button>
                <Button
                  variant={filterRole === "enduser" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterRole("enduser")}
                >
                  <User className="h-4 w-4 mr-1" />
                  End Users
                </Button>
                <Button
                  variant={filterRole === "guest" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterRole("guest")}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Guests
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((userData) => (
                <div key={userData.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <Avatar>
                      <AvatarFallback>
                        {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{userData.name}</h3>
                        {getRoleIcon(userData.role)}
                      </div>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getRoleBadgeVariant(userData.role)} className="text-xs">
                          {userData.role}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(userData.status)} className="text-xs">
                          {userData.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="hidden md:block text-right text-sm">
                      <div className="text-muted-foreground">Last active</div>
                      <div className="font-medium">{userData.lastActive}</div>
                    </div>
                    <div className="hidden lg:block text-right text-sm">
                      <div className="text-muted-foreground">Reports</div>
                      <div className="font-medium">{userData.reportsSubmitted}</div>
                    </div>
                    <div className="hidden lg:block text-right text-sm">
                      <div className="text-muted-foreground">Joined</div>
                      <div className="font-medium">{new Date(userData.joinDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUserAction("View", userData.id, userData.name)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUserAction("Edit", userData.id, userData.name)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {userData.role !== 'admin' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction("Suspend", userData.id, userData.name)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { user: "Sarah Johnson", action: "submitted a flood report", time: "2 hours ago" },
                { user: "Mike Chen", action: "updated profile information", time: "4 hours ago" },
                { user: "Emily Davis", action: "logged in from mobile", time: "6 hours ago" },
                { user: "James Wilson", action: "account suspended for violation", time: "1 day ago" },
                { user: "New User", action: "registered account", time: "2 days ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action}</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageUsers;