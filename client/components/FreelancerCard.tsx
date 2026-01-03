import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle2, Star, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FreelancerCardProps {
  id: string;
  name: string;
  title: string;
  location: string;
  rate: string;
  verified: boolean;
  score: number;
  skills: string[];
  reviews: number;
  rating: number;
}

export default function FreelancerCard({
  id,
  name,
  title,
  location,
  rate,
  verified,
  score,
  skills,
  reviews,
  rating,
}: FreelancerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-zinc-200 dark:border-zinc-800">
      <CardHeader className="text-center pb-2 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-400 mb-3 relative">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
          {verified && (
            <div
              className="absolute bottom-0 right-0 bg-white dark:bg-zinc-950 rounded-full p-1"
              title="Verified Skill"
            >
              <CheckCircle2 className="h-6 w-6 text-blue-500 fill-blue-50 dark:fill-blue-900" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center items-center gap-1 text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-bold text-foreground">{rating}</span>
          <span className="text-muted-foreground text-xs ml-1">
            ({reviews} reviews)
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span>Skill Score</span>
            <span className="text-blue-600">{score}/100</span>
          </div>
          <Progress value={score} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs h-5 px-2">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm pt-2 border-t mt-2">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </div>
          <div className="font-semibold">{rate}/hr</div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/profile/${id}`} className="w-full">
          <Button className="w-full bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
