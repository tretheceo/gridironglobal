import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { playerProfileSchema, PlayerProfileFormValues } from "@/lib/validations";
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

// Languages
const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Chinese",
  "Russian",
  "Arabic",
  "Swedish",
  "Norwegian",
  "Finnish",
  "Danish",
  "Dutch"
];

export function PlayerProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PlayerProfileFormValues>({
    resolver: zodResolver(playerProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      type: "PLAYER",
      positions: [],
      preferredCountries: [],
      languages: [],
      videoUrls: [],
    },
  });

  const onSubmit = async (data: PlayerProfileFormValues) => {
    setIsLoading(true);
    try {
      // Profile creation logic will be implemented here
      console.log(data);
      // Redirect to dashboard
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePositionChange = (selectedPositions: string[]) => {
    setValue("positions", selectedPositions);
  };

  const handleCountryChange = (selectedCountries: string[]) => {
    setValue("preferredCountries", selectedCountries);
  };

  const handleLanguageChange = (selectedLanguages: string[]) => {
    setValue("languages", selectedLanguages);
  };

  // For video URLs
  const [videoUrl, setVideoUrl] = useState("");
  const videoUrls = watch("videoUrls") || [];

  const addVideoUrl = () => {
    if (videoUrl && videoUrl.trim() !== "") {
      setValue("videoUrls", [...videoUrls, videoUrl]);
      setVideoUrl("");
    }
  };

  const removeVideoUrl = (index: number) => {
    const updatedUrls = [...videoUrls];
    updatedUrls.splice(index, 1);
    setValue("videoUrls", updatedUrls);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell teams about yourself, your playing style, and career goals..."
            className="min-h-[120px]"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              {...register("height", { valueAsNumber: true })}
            />
            {errors.height && (
              <p className="text-sm text-red-500">{errors.height.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              {...register("weight", { valueAsNumber: true })}
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Select onValueChange={(value) => setValue("nationality", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.nationality && (
            <p className="text-sm text-red-500">{errors.nationality.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Positions</Label>
          <MultiSelect
            options={POSITIONS.map(pos => ({ label: pos, value: pos }))}
            placeholder="Select your positions"
            onChange={handlePositionChange}
          />
          {errors.positions && (
            <p className="text-sm text-red-500">{errors.positions.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select onValueChange={(value) => setValue("experience", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High School">High School</SelectItem>
              <SelectItem value="College">College</SelectItem>
              <SelectItem value="Semi-Pro">Semi-Pro</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
            </SelectContent>
          </Select>
          {errors.experience && (
            <p className="text-sm text-red-500">{errors.experience.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Preferred Countries</Label>
          <MultiSelect
            options={COUNTRIES.map(country => ({ label: country, value: country }))}
            placeholder="Select countries you'd like to play in"
            onChange={handleCountryChange}
          />
          {errors.preferredCountries && (
            <p className="text-sm text-red-500">{errors.preferredCountries.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Languages Spoken</Label>
          <MultiSelect
            options={LANGUAGES.map(lang => ({ label: lang, value: lang }))}
            placeholder="Select languages you speak"
            onChange={handleLanguageChange}
          />
          {errors.languages && (
            <p className="text-sm text-red-500">{errors.languages.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Highlight Videos</Label>
          <div className="flex space-x-2">
            <Input
              placeholder="YouTube or Vimeo URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <Button type="button" onClick={addVideoUrl} variant="outline">
              Add
            </Button>
          </div>
          {videoUrls.length > 0 && (
            <div className="mt-2 space-y-2">
              {videoUrls.map((url, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm truncate max-w-[80%]">{url}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVideoUrl(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
          {errors.videoUrls && (
            <p className="text-sm text-red-500">{errors.videoUrls.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="resumeUpload">Resume Upload (PDF)</Label>
          <Input
            id="resumeUpload"
            type="file"
            accept=".pdf"
          />
          <p className="text-xs text-gray-500">
            Upload your football resume or CV (PDF format only)
          </p>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Profile..." : "Create Player Profile"}
      </Button>
    </form>
  );
}
