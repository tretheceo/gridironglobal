
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface JobCardProps {
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
}

export function JobCard({
  id,
  title,
  teamName,
  location,
  positions,
  compensation,
  housing,
  contractLength,
  logoUrl,
  isActive = true,
}: JobCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${!isActive ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {logoUrl && (
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img src={logoUrl} alt={teamName} className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              <CardTitle className="text-xl">
                {title}
                {!isActive && (
                  <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-700">
                    Closed
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {teamName} • {location}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {positions.map((position) => (
            <Badge key={position} variant="secondary" className="text-xs">
              {position}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {compensation && (
            <div>
              <span className="text-muted-foreground">Compensation:</span> {compensation}
            </div>
          )}
          {contractLength && (
            <div>
              <span className="text-muted-foreground">Contract:</span> {contractLength}
            </div>
          )}
          {housing && (
            <div>
              <span className="text-muted-foreground">Housing:</span> Included
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full" disabled={!isActive}>
          <Link href={`/jobs/${id}`}>{isActive ? "View Details" : "Position Filled"}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
