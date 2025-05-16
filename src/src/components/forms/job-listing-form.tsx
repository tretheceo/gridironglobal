import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobListingSchema, JobListingFormValues } from "@/lib/validations";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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

// League levels
const LEAGUE_LEVELS = [
  "Professional",
  "Semi-Professional",
  "Amateur",
  "University",
  "Division 1",
  "Division 2",
  "Division 3",
  "Youth"
];

export function JobListingForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobListingFormValues>({
    resolver: zodResolver(jobListingSchema),
    defaultValues: {
      title: "",
      description: "",
      positions: [],
      country: "",
      housing: false,
      visaAssistance: false,
    },
  });

  const onSubmit = async (data: JobListingFormValues) => {
    setIsLoading(true);
    try {
      // Job listing creation logic will be implemented here
      console.log(data);
      // Redirect to job listings page
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePositionChange = (selectedPositions: string[]) => {
    setValue("positions", selectedPositions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="e.g., Quarterback for Berlin Rebels"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the position, requirements, and what you're looking for in a candidate..."
            className="min-h-[150px]"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Positions Needed</Label>
          <MultiSelect
            options={POSITIONS.map(pos => ({ label: pos, value: pos }))}
            placeholder="Select positions you're recruiting for"
            onChange={handlePositionChange}
          />
          {errors.positions && (
            <p className="text-sm text-red-500">{errors.positions.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select onValueChange={(value) => setValue("country", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="e.g., Berlin"
              {...register("city")}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="leagueLevel">League Level</Label>
          <Select onValueChange={(value) => setValue("leagueLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select league level" />
            </SelectTrigger>
            <SelectContent>
              {LEAGUE_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.leagueLevel && (
            <p className="text-sm text-red-500">{errors.leagueLevel.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="compensation">Compensation</Label>
          <Input
            id="compensation"
            placeholder="e.g., €1000/month + bonuses"
            {...register("compensation")}
          />
          <p className="text-xs text-gray-500">
            Describe the salary, bonuses, or other compensation details
          </p>
          {errors.compensation && (
            <p className="text-sm text-red-500">{errors.compensation.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contractLength">Contract Length</Label>
          <Input
            id="contractLength"
            placeholder="e.g., 6 months, 1 season, 1 year"
            {...register("contractLength")}
          />
          {errors.contractLength && (
            <p className="text-sm text-red-500">{errors.contractLength.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watch("startDate") ? (
                  format(watch("startDate"), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={watch("startDate")}
                onSelect={(date) => setValue("startDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && (
            <p className="text-sm text-red-500">{errors.startDate.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tryoutInfo">Tryout Information</Label>
          <Textarea
            id="tryoutInfo"
            placeholder="Provide details about tryouts if applicable..."
            {...register("tryoutInfo")}
          />
          {errors.tryoutInfo && (
            <p className="text-sm text-red-500">{errors.tryoutInfo.message}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="housing"
            checked={watch("housing")}
            onCheckedChange={(checked) => setValue("housing", checked)}
          />
          <Label htmlFor="housing">Housing Included</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="visaAssistance"
            checked={watch("visaAssistance")}
            onCheckedChange={(checked) => setValue("visaAssistance", checked)}
          />
          <Label htmlFor="visaAssistance">Visa Assistance Available</Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Job Listing..." : "Create Job Listing"}
      </Button>
    </form>
  );
}
