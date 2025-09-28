import { DisasterCard } from "./DisasterCard";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Import the generated images
import earthquakeImage from "@/assets/earthquake-damage.jpg";
import floodImage from "@/assets/flood-scene.jpg";
import wildfireImage from "@/assets/wildfire-emergency.jpg";

const mockDisasters = [
  {
    id: "1",
    title: "6.2 Magnitude Earthquake Hits Downtown Area",
    type: "earthquake" as const,
    location: "San Francisco, CA",
    image: earthquakeImage,
    verified: "verified" as const,
    description: "Significant structural damage reported to several buildings in the financial district. Emergency responders are on scene.",
    timestamp: "2 hours ago"
  },
  {
    id: "2", 
    title: "Flash Flood Warning - Major Roads Affected",
    type: "flood" as const,
    location: "Houston, TX", 
    image: floodImage,
    verified: "pending" as const,
    description: "Heavy rainfall has caused widespread flooding. Multiple vehicles stranded, avoid downtown area.",
    timestamp: "4 hours ago"
  },
  {
    id: "3",
    title: "Wildfire Threatens Residential Communities",
    type: "fire" as const,
    location: "Los Angeles, CA",
    image: wildfireImage,
    verified: "verified" as const,
    description: "Fast-moving wildfire has consumed 1,200 acres. Evacuation orders issued for surrounding neighborhoods.",
    timestamp: "6 hours ago"
  },
  {
    id: "4",
    title: "Severe Storm System Approaching",
    type: "storm" as const,
    location: "Miami, FL",
    image: floodImage, // Using flood image as placeholder
    verified: "unverified" as const,
    description: "Weather models show potential for damaging winds and hail. Residents advised to secure outdoor items.",
    timestamp: "8 hours ago"
  }
];

const filterOptions = [
  { label: "All", value: "all", active: true },
  { label: "Verified", value: "verified" },
  { label: "Earthquake", value: "earthquake" },
  { label: "Flood", value: "flood" },
  { label: "Fire", value: "fire" },
  { label: "Storm", value: "storm" },
];

export function MainContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(["all"]);
  const [filteredDisasters, setFilteredDisasters] = useState(mockDisasters);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const { toast } = useToast();

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDisasters(query, activeFilters);
  };

  // Handle filter functionality
  const handleFilterClick = (filterValue: string) => {
    let newFilters: string[];
    
    if (filterValue === "all") {
      newFilters = ["all"];
    } else {
      newFilters = activeFilters.includes(filterValue)
        ? activeFilters.filter(f => f !== filterValue && f !== "all")
        : [...activeFilters.filter(f => f !== "all"), filterValue];
      
      if (newFilters.length === 0) {
        newFilters = ["all"];
      }
    }
    
    setActiveFilters(newFilters);
    filterDisasters(searchQuery, newFilters);
  };

  // Filter disasters based on search and filters
  const filterDisasters = (query: string, filters: string[]) => {
    let filtered = mockDisasters;

    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(disaster =>
        disaster.title.toLowerCase().includes(query.toLowerCase()) ||
        disaster.location.toLowerCase().includes(query.toLowerCase()) ||
        disaster.description.toLowerCase().includes(query.toLowerCase()) ||
        disaster.type.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply category filters
    if (!filters.includes("all")) {
      filtered = filtered.filter(disaster => {
        return filters.some(filter => {
          if (filter === "verified") return disaster.verified === "verified";
          return disaster.type === filter;
        });
      });
    }

    setFilteredDisasters(filtered);
  };

  // Handle load more functionality
  const handleLoadMore = () => {
    toast({
      title: "Loading more reports...",
      description: "Fetching additional disaster reports from the community.",
    });
    // In a real app, this would load more data from an API
  };

  return (
    <main className="flex-1 p-4 lg:p-6 space-y-6 max-w-none lg:max-w-4xl min-h-screen">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4 lg:hidden">
          <img 
            src="/OIP.webp" 
            alt="Disaster Hub Logo" 
            className="w-12 h-12 object-contain"
          />
          <div>
            <h2 className="text-xl font-bold text-foreground">Disaster Hub</h2>
            <p className="text-sm text-muted-foreground">Community Response</p>
          </div>
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Crowd-Sourced Insights on Disasters
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            Real-time disaster reports verified by the community. Help others stay safe by sharing accurate information.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search disasters by location, type, or keywords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <Filter className="h-4 w-4" />
              Filter ({activeFilters.length === 1 && activeFilters[0] === "all" ? 0 : activeFilters.length})
            </Button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Badge 
              key={option.value}
              variant={activeFilters.includes(option.value) ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => handleFilterClick(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl lg:text-2xl font-bold text-primary">{filteredDisasters.length}</div>
            <div className="text-xs lg:text-sm text-muted-foreground">
              {searchQuery || activeFilters.some(f => f !== "all") ? "Filtered" : "Total"} Reports
            </div>
          </div>
          <div>
            <div className="text-xl lg:text-2xl font-bold text-status-verified">
              {filteredDisasters.filter(d => d.verified === "verified").length}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Verified</div>
          </div>
          <div>
            <div className="text-xl lg:text-2xl font-bold text-status-pending">
              {filteredDisasters.filter(d => d.verified === "pending").length}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Pending</div>
          </div>
          <div>
            <div className="text-xl lg:text-2xl font-bold text-destructive">
              {filteredDisasters.filter(d => d.verified === "unverified").length}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Unverified</div>
          </div>
        </div>
      </div>

      {/* Disaster Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {filteredDisasters.length > 0 ? (
          filteredDisasters.map((disaster) => (
            <DisasterCard key={disaster.id} {...disaster} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No disasters found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setActiveFilters(["all"]);
                setFilteredDisasters(mockDisasters);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredDisasters.length > 0 && (
        <div className="text-center pt-6">
          <Button variant="outline" size="lg" onClick={handleLoadMore}>
            Load More Reports
          </Button>
        </div>
      )}
    </main>
  );
}