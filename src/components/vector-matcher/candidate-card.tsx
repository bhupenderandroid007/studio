import type { Candidate } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <User className="h-6 w-6 text-muted-foreground" />
        <div>
          <CardTitle className="text-lg">{candidate.name}</CardTitle>
          <CardDescription>Matched Candidate</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{candidate.summary}</p>
      </CardContent>
    </Card>
  );
}
