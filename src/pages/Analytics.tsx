import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, AlertTriangle, CheckCircle, TrendingUp, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  const analyticsData = {
    totalReports: 1247,
    verifiedReports: 892,
    pendingReports: 355,
    activeUsers: 3428,
    newUsersToday: 47,
    emergencyAlerts: 23,
    resolvedIncidents: 156,
    responseTime: "12 min"
  };

  const recentActivity = [
    { id: 1, action: "New earthquake report verified", location: "Los Angeles, CA", time: "2 min ago", type: "verified" },
    { id: 2, action: "Flood warning issued", location: "Houston, TX", time: "15 min ago", type: "alert" },
    { id: 3, action: "Wildfire incident resolved", location: "Phoenix, AZ", time: "1 hour ago", type: "resolved" },
    { id: 4, action: "Storm report submitted", location: "Miami, FL", time: "2 hours ago", type: "pending" },
    { id: 5, action: "New user registered", location: "Seattle, WA", time: "3 hours ago", type: "user" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'pending': return <Activity className="h-4 w-4 text-orange-500" />;
      case 'user': return <Users className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor disaster reports, user activity, and system performance
            </p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalReports.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Reports</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.verifiedReports.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+8%</span> verification rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+{analyticsData.newUsersToday}</span> new today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.responseTime}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">-3 min</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.location} • {activity.time}
                    </p>
                  </div>
                  <Badge variant={activity.type === 'verified' ? 'default' : 'secondary'}>
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Response Time</span>
                  <Badge variant="default">Excellent</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Database Performance</span>
                  <Badge variant="default">Good</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Server Uptime</span>
                  <Badge variant="default">99.9%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-500">{analyticsData.resolvedIncidents}</div>
                    <div className="text-xs text-muted-foreground">Resolved Today</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">{analyticsData.emergencyAlerts}</div>
                    <div className="text-xs text-muted-foreground">Active Alerts</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Earthquakes</span>
                  <span className="font-medium">312</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Floods</span>
                  <span className="font-medium">289</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Wildfires</span>
                  <span className="font-medium">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Storms</span>
                  <span className="font-medium">412</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">California</span>
                  <span className="font-medium">428</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Texas</span>
                  <span className="font-medium">312</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Florida</span>
                  <span className="font-medium">267</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">New York</span>
                  <span className="font-medium">240</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Response Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Avg Response</span>
                  <span className="font-medium">12 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">First Responders</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Resources Deployed</span>
                  <span className="font-medium">567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium">94.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;