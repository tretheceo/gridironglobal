import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { JobCard } from "@/components/cards/job-card";
import { TeamCard } from "@/components/cards/team-card";

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
    jobListings: number;
    applicants: number;
    messages: number;
    teams: number;
  };
  recentJobListings?: {
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
    applicantCount: number;
  }[];
  teams?: {
    id: string;
    name: string;
    location: string;
    leagueLevel?: string;
    foundedYear?: number;
    logoUrl?: string;
    jobCount: number;
  }[];
  recentApplicants?: {
    id: string;
    name: string;
    position: string;
    jobTitle: string;
    appliedDate: Date;
    status: string;
  }[];
}

export function RecruiterDashboard({
  user,
  stats,
  recentJobListings = [],
  teams = [],
  recentApplicants = [],
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
                  Verified Recruiter
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">
                    Verified
                  </Badge>
                </span>
              ) : (
                "Complete your team profile to get verified"
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button asChild variant="outline">
            <Link href="/teams/manage">Manage Teams</Link>
          </Button>
          <Button asChild>
            <Link href="/jobs/create">Post New Job</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
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
            <div className="text-2xl font-bold">{stats.jobListings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.jobListings > 0 ? "Active job listings" : "No active jobs"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applicants</CardTitle>
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
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applicants}</div>
            <p className="text-xs text-muted-foreground">
              {stats.applicants > 0 ? "Total applicants" : "No applicants yet"}
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
            <CardTitle className="text-sm font-medium">Teams</CardTitle>
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
              <path d="M18 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teams}</div>
            <p className="text-xs text-muted-foreground">
              {stats.teams > 0 ? "Managed teams" : "No teams yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">My Job Listings</TabsTrigger>
          <TabsTrigger value="teams">My Teams</TabsTrigger>
          <TabsTrigger value="applicants">Recent Applicants</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentJobListings.length > 0 ? (
              recentJobListings.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <JobCard
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
                  <div className="p-4 pt-0 border-t mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        <Badge variant="secondary">{job.applicantCount}</Badge> Applicants
                      </span>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/jobs/${job.id}/applicants`}>View Applicants</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Job Listings Yet</CardTitle>
                  <CardDescription>
                    Create your first job listing to start recruiting players.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/jobs/create">Post New Job</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teams.length > 0 ? (
              teams.map((team) => (
                <Card key={team.id} className="overflow-hidden">
                  <TeamCard
                    id={team.id}
                    name={team.name}
                    location={team.location}
                    leagueLevel={team.leagueLevel}
                    foundedYear={team.foundedYear}
                    logoUrl={team.logoUrl}
                    jobCount={team.jobCount}
                  />
                  <div className="p-4 pt-0 border-t mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        <Badge variant="secondary">{team.jobCount}</Badge> Active Jobs
                      </span>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/teams/${team.id}/edit`}>Manage Team</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Teams Yet</CardTitle>
                  <CardDescription>
                    Create your first team to start posting job listings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/teams/create">Create Team</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="applicants" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentApplicants.length > 0 ? (
              recentApplicants.map((applicant) => (
                <Card key={applicant.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{applicant.name}</CardTitle>
                    <CardDescription>{applicant.position}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        Applied for: <span className="font-medium">{applicant.jobTitle}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`${
                            applicant.status === "ACCEPTED"
                              ? "bg-green-100 text-green-800"
                              : applicant.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : applicant.status === "REVIEWING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {applicant.status.charAt(0) + applicant.status.slice(1).toLowerCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(applicant.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="pt-2 flex space-x-2">
                        <Button asChild variant="outline" className="flex-1">
                          <Link href={`/players/${applicant.id}`}>View Profile</Link>
                        </Button>
                        <Button asChild className="flex-1">
                          <Link href={`/applications/${applicant.id}`}>Review</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>No Applicants Yet</CardTitle>
                  <CardDescription>
                    Post job listings to start receiving applications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/jobs/create">Post New Job</Link>
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
