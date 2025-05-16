import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PlayerCard } from "@/components/cards/player-card";
import { JobCard } from "@/components/cards/job-card";

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    photoUrl?: string;
    isVerified: boolean;
  };
  stats: {
    applications: number;
    messages: number;
    views: number;
    favorites: number;
  };
  recentApplications?: {
    id: string;
    jobTitle: string;
    teamName: string;
    status: string;
    appliedDate: Date;
  }[];
  recentJobs?: {
    id: string;
    title: string;
    teamName: string;
    location: string;
    positions: string[];
    compensation?: string;
    housing: boolean;
    contractLength?: string;
    logoUrl?: string;
    isActive: boolean;
  }[];
  recommendedPlayers?: {
    id: string;
    name: string;
    position: string;
    nationality: string;
    age?: number;
    experience?: string;
    photoUrl?: string;
    verified: boolean;
  }[];
}

export function PlayerDashboard({
  user,
  stats,
  recentApplications = [],
  recommendedPlayers = [],
}: DashboardProps) {
  // Get initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.photoUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground">
              {user.isVerified ? (
                <span className="flex items-center">
                  Verified Player
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">
                    Verified
                  </Badge>
                </span>
              ) : (
                "Complete your profile to get verified"
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button asChild variant="outline">
            <Link href="/profile/player">Edit Profile</Link>
          </Button>
          <Button asChild>
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
              <path d="M8 2h8v4H8z" />
              <path d="M16 13h-8" />
              <path d="M16 17h-8" />
              <path d="M10 9H8" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applications}</div>
            <p className="text-xs text-muted-foreground">
              {stats.applications > 0 ? "Active applications" : "No applications yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages}</div>
            <p className="text-xs text-muted-foreground">
              {stats.messages > 0 ? "Unread messages" : "No new messages"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.views}</div>
            <p className="text-xs text-muted-foreground">
              {stats.views > 0 ? "Last 30 days" : "No views yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <p className="text-xs text-muted-foreground">
              {stats.favorites > 0 ? "Saved jobs and teams" : "No saved items"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
          <TabsTrigger value="players">Players Like You</TabsTrigger>
        </TabsList>
        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentApplications.length > 0 ? (
              recentApplications.map((application) => (
                <Card key={application.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{application.jobTitle}</CardTitle>
                    <CardDescription>{application.teamName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge
                        className={`${
                          application.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : application.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : application.status === "REVIEWING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {application.status.charAt(0) + application.status.slice(1).toLowerCase()}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/applications/${application.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Applications Yet</CardTitle>
                  <CardDescription>
                    Start applying to jobs to see your applications here.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs && recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  teamName={job.teamName}
                  location={job.location}
                  positions={job.positions}
                  compensation={job.compensation}
                  housing={job.housing}
                  contractLength={job.contractLength}
                  logoUrl={job.logoUrl}
                  isActive={job.isActive}
                />
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Recommended Jobs</CardTitle>
                  <CardDescription>
                    Complete your profile to get personalized job recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/profile/player">Complete Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="players" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedPlayers.length > 0 ? (
              recommendedPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  id={player.id}
                  name={player.name}
                  position={player.position}
                  nationality={player.nationality}
                  age={player.age}
                  experience={player.experience}
                  photoUrl={player.photoUrl}
                  verified={player.verified}
                />
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Recommended Players</CardTitle>
                  <CardDescription>
                    Complete your profile to see players with similar backgrounds.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/profile/player">Complete Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
