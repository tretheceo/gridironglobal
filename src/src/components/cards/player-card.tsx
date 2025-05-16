import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface PlayerCardProps {
  id: string;
  name: string;
  position: string;
  nationality: string;
  age?: number;
  experience?: string;
  photoUrl?: string;
  verified?: boolean;
}

export function PlayerCard({
  id,
  name,
  position,
  nationality,
  age,
  experience,
  photoUrl,
  verified = false,
}: PlayerCardProps) {
  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={photoUrl} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">
                {name}
                {verified && (
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">
                    Verified
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {position} • {nationality}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {age && (
            <div>
              <span className="text-muted-foreground">Age:</span> {age}
            </div>
          )}
          {experience && (
            <div>
              <span className="text-muted-foreground">Experience:</span> {experience}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link href={`/players/${id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
