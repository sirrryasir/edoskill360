import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  description: string;
  skills: string[];
  isVerifiedHost?: boolean;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  description,
  skills,
  isVerifiedHost = false,
}: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-zinc-200 dark:border-zinc-800">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
              <Link href={`/jobs/${id}`}>{title}</Link>
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <span className="font-medium text-foreground">{company}</span>
              {isVerifiedHost && (
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
              )}
              <span>•</span>
              <span className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </span>
            </div>
          </div>
          <Badge variant="outline" className="shrink-0">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
          <div className="flex items-center text-foreground font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-md">
            <DollarSign className="h-4 w-4 mr-0.5" />
            {salary}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {postedAt}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="text-xs font-normal"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{skills.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t flex justify-end">
        <Link href={`/jobs/${id}`} className="w-full">
          <Button className="w-full bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200">
            Apply Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
