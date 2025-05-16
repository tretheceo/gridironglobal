import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";

// Football positions for selection
const POSITIONS = [
  "Quarterback",
  "Running Back",
  "Wide Receiver",
  "Tight End",
  "Offensive Tackle",
  "Offensive Guard",
  "Center",
  "Defensive End",
  "Defensive Tackle",
  "Linebacker",
  "Cornerback",
  "Safety",
  "Kicker",
  "Punter",
  "Long Snapper",
  "Return Specialist"
];

// Common countries for international football
const COUNTRIES = [
  "United States",
  "Canada",
  "Mexico",
  "Germany",
  "United Kingdom",
  "France",
  "Italy",
  "Spain",
  "Austria",
  "Switzerland",
  "Sweden",
  "Finland",
  "Denmark",
  "Norway",
  "Netherlands",
  "Belgium",
  "Poland",
  "Czech Republic",
  "Japan",
  "Australia",
  "Brazil"
];

// Experience levels
const EXPERIENCE_LEVELS = [
  "High School",
  "College",
  "Semi-Pro",
  "Professional"
];

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  type: 'players' | 'jobs' | 'teams';
}

export function SearchFilters({ onFilterChange, type }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    query: "",
    positions: [] as string[],
    countries: [] as string[],
    experienceLevel: "",
    hasVideo: false,
    isVerified: false,
    minAge: "",
    maxAge: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    housing: false,
    visaAssistance: false,
    leagueLevel: "",
  });

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePositionChange = (selectedPositions: string[]) => {
    handleFilterChange("positions", selectedPositions);
  };

  const handleCountryChange = (selectedCountries: string[]) => {
    handleFilterChange("countries", selectedCountries);
  };

  const handleReset = () => {
    const resetFilters = {
      query: "",
      positions: [] as string[],
      countries: [] as string[],
      experienceLevel: "",
      hasVideo: false,
      isVerified: false,
      minAge: "",
      maxAge: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      housing: false,
      visaAssistance: false,
      leagueLevel: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <Input
              placeholder={`Search ${type}...`}
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label>Positions</Label>
              <MultiSelect
                options={POSITIONS.map(pos => ({ label: pos, value: pos }))}
                placeholder="Select positions"
                onChange={handlePositionChange}
                value={filters.positions.map(pos => ({ label: pos, value: pos }))}
              />
            </div>

            <div>
              <Label>Countries</Label>
              <MultiSelect
                options={COUNTRIES.map(country => ({ label: country, value: country }))}
                placeholder="Select countries"
                onChange={handleCountryChange}
                value={filters.countries.map(country => ({ label: country, value: country }))}
              />
            </div>

            {type === 'players' && (
              <>
                <div>
                  <Label>Experience Level</Label>
                  <Select 
                    onValueChange={(value) => handleFilterChange("experienceLevel", value)}
                    value={filters.experienceLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Age</Label>
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minAge}
                      onChange={(e) => handleFilterChange("minAge", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Max Age</Label>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxAge}
                      onChange={(e) => handleFilterChange("maxAge", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Height (cm)</Label>
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minHeight}
                      onChange={(e) => handleFilterChange("minHeight", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Max Height (cm)</Label>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxHeight}
                      onChange={(e) => handleFilterChange("maxHeight", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Weight (kg)</Label>
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minWeight}
                      onChange={(e) => handleFilterChange("minWeight", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Max Weight (kg)</Label>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxWeight}
                      onChange={(e) => handleFilterChange("maxWeight", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasVideo"
                    checked={filters.hasVideo}
                    onCheckedChange={(checked) => handleFilterChange("hasVideo", checked)}
                  />
                  <Label htmlFor="hasVideo">Has Video Highlights</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isVerified"
                    checked={filters.isVerified}
                    onCheckedChange={(checked) => handleFilterChange("isVerified", checked)}
                  />
                  <Label htmlFor="isVerified">Verified Players Only</Label>
                </div>
              </>
            )}

            {type === 'jobs' && (
              <>
                <div>
                  <Label>League Level</Label>
                  <Select 
                    onValueChange={(value) => handleFilterChange("leagueLevel", value)}
                    value={filters.leagueLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any league level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Semi-Professional">Semi-Professional</SelectItem>
                      <SelectItem value="Amateur">Amateur</SelectItem>
                      <SelectItem value="University">University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="housing"
                    checked={filters.housing}
                    onCheckedChange={(checked) => handleFilterChange("housing", checked)}
                  />
                  <Label htmlFor="housing">Housing Included</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visaAssistance"
                    checked={filters.visaAssistance}
                    onCheckedChange={(checked) => handleFilterChange("visaAssistance", checked)}
                  />
                  <Label htmlFor="visaAssistance">Visa Assistance Available</Label>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
            <Button>
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
