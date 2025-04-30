"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { matchCandidates } from "@/lib/actions";
import type { Candidate } from "@/lib/types";
import { LoadingSpinner } from "./loading-spinner";
import { CandidateCard } from "./candidate-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Info, CircleAlert } from "lucide-react";

export function MatchSection() {
  const [jobInput, setJobInput] = useState<string>("");
  const [matchedCandidates, setMatchedCandidates] = useState<Candidate[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleMatch = () => {
    setError(null); // Clear previous errors
    setMatchedCandidates(null); // Clear previous results
    if (!jobInput.trim()) {
      setError("Please enter a job description or ID.");
      return;
    }

    startTransition(async () => {
      const result = await matchCandidates(jobInput);
      if (result.error) {
        setError(result.error);
      } else {
        setMatchedCandidates(result.candidates);
      }
    });
  };

  return (
    <Card className="col-span-1 lg:col-span-2"> {/* Span across both columns on larger screens */}
      <CardHeader>
        <CardTitle>Match Candidates</CardTitle>
        <CardDescription>Enter a job description or ID to find the top matching candidates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="job-match-input">Job Description or ID</Label>
          <Textarea
            id="job-match-input"
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            placeholder="Paste job description or enter job ID here..."
            rows={4}
            disabled={isPending}
          />
        </div>
        {error && (
          <Alert variant="destructive">
             <CircleAlert className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
         {isPending && (
            <div className="flex items-center justify-center py-4">
                <LoadingSpinner size={32} />
                <span className="ml-2 text-muted-foreground">Finding matches...</span>
            </div>
         )}

        {!isPending && matchedCandidates !== null && (
          <div>
            <h3 className="text-lg font-semibold mb-3 mt-4">Matching Candidates</h3>
            {matchedCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedCandidates.map((candidate, index) => (
                  <CandidateCard key={candidate.id || index} candidate={candidate} />
                ))}
              </div>
            ) : (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>No matching candidates found for this job description.</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleMatch} disabled={isPending || !jobInput.trim()} aria-disabled={isPending || !jobInput.trim()}>
           {isPending ? <LoadingSpinner size={16} className="mr-2" /> : <Search className="mr-2 h-4 w-4" />}
          {isPending ? "Matching..." : "Find Matches"}
        </Button>
      </CardFooter>
    </Card>
  );
}
