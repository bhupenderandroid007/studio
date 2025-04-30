import { JobForm } from "@/components/vector-matcher/job-form";
import { CandidateForm } from "@/components/vector-matcher/candidate-form";
import { MatchSection } from "@/components/vector-matcher/match-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8 min-h-screen bg-secondary">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-1">VectorMatcher</h1>
        <p className="text-muted-foreground">A simple Job-Candidate Matching System</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Add Forms */}
        <div className="space-y-8">
          <JobForm />
          <CandidateForm />
        </div>

        {/* Column 2: Match Section */}
        {/* Ensure MatchSection spans correctly or resides in its intended column */}
         <div className="lg:col-span-1">
             <MatchSection />
         </div>

      </div>
    </main>
  );
}
