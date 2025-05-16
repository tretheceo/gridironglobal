import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface TeamCardProps {
  id: string;
  name: string;
  location: string;
  leagueLevel?: string;
  foundedYear?: number;
  logoUrl?: string;
  jobCount?: number;
}

export function TeamCard({
  id,
  name,
  location,
  leagueLevel,
  foundedYear,
  logoUrl,
  jobCount = 0,
}: TeamCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {logoUrl && (
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img src={logoUrl} alt={name} className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <CardTitle className="text-xl">{name}</CardTitle>
              <CardDescription>
                {location} {leagueLevel && `• ${leagueLevel}`}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {foundedYear && (
            <div>
              <span className="text-muted-foreground">Founded:</span> {foundedYear}
            </div>
          )}
          {jobCount > 0 && (
            <div>
              <span className="text-muted-foreground">Open Positions:</span>{" "}
              <Badge variant="secondary" className="text-xs">
                {jobCount}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link href={`/teams/${id}`}>View Team</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
