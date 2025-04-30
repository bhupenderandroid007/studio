import type { Job, Candidate } from "@/lib/types";

// Simulate API call latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Asynchronously adds a new job posting.
 * Simulates an API call.
 *
 * @param job The job posting to add.
 * @returns A promise that resolves when the job is successfully added.
 */
export async function addJob(job: Job): Promise<void> {
  console.log("[API Simulation] Adding job:", job);
  await delay(500); // Simulate network latency
  // In a real app, this would be:
  // const response = await fetch('/api/jobs', { method: 'POST', body: JSON.stringify(job), headers: {'Content-Type': 'application/json'} });
  // if (!response.ok) throw new Error('Failed to add job');
  console.log("[API Simulation] Job added successfully.");
  return Promise.resolve();
}

/**
 * Asynchronously adds a new candidate profile.
 * Simulates an API call.
 *
 * @param candidate The candidate profile to add.
 * @returns A promise that resolves when the candidate is successfully added.
 */
export async function addCandidate(candidate: Candidate): Promise<void> {
  console.log("[API Simulation] Adding candidate:", candidate);
  await delay(500); // Simulate network latency
  // In a real app, this would be:
  // const response = await fetch('/api/candidates', { method: 'POST', body: JSON.stringify(candidate), headers: {'Content-Type': 'application/json'} });
  // if (!response.ok) throw new Error('Failed to add candidate');
  console.log("[API Simulation] Candidate added successfully.");
  return Promise.resolve();
}

/**
 * Asynchronously retrieves the top 3 matching candidates for a given job description or ID.
 * Simulates an API call.
 *
 * @param input The job description or ID to match candidates against.
 * @returns A promise that resolves to a list of the top 3 matching candidates.
 */
export async function matchCandidates(input: string): Promise<Candidate[]> {
  console.log("[API Simulation] Matching candidates for input:", input);
  await delay(1000); // Simulate matching process latency

  // Simulate different results based on input for basic testing
  let results: Candidate[];
  if (input.toLowerCase().includes("react")) {
     results = [
      {
        id: '1',
        name: 'Celena Chang',
        summary: 'Formerly at Flatiron Health; expert in React, TypeScript, PostgreSQL; CS grad from UC Berkeley.',
      },
      {
        id: '3',
        name: 'Calvin Goah',
        summary: 'Engineer at IXL Learning; skilled in Node.js, React, PostgreSQL; CS grad from Columbia.',
      },
       {
        id: '2',
        name: 'Alonso Koumba',
        summary: 'Ex-Google engineer; expert in Python and PostgreSQL; CS grad from Stanford.',
      },
    ];
  } else if (input.toLowerCase().includes("python")) {
     results = [
       {
        id: '2',
        name: 'Alonso Koumba',
        summary: 'Ex-Google engineer; expert in Python and PostgreSQL; CS grad from Stanford.',
      },
        {
        id: '1',
        name: 'Celena Chang',
        summary: 'Formerly at Flatiron Health; expert in React, TypeScript, PostgreSQL; CS grad from UC Berkeley.',
      },
      {
        id: '3',
        name: 'Calvin Goah',
        summary: 'Engineer at IXL Learning; skilled in Node.js, React, PostgreSQL; CS grad from Columbia.',
      },
    ];
  } else {
      // Default or fallback results if no specific keywords match
      results = [
           {
            id: '1',
            name: 'Celena Chang',
            summary: 'Formerly at Flatiron Health; expert in React, TypeScript, PostgreSQL; CS grad from UC Berkeley.',
           },
            {
            id: '2',
            name: 'Alonso Koumba',
            summary: 'Ex-Google engineer; expert in Python and PostgreSQL; CS grad from Stanford.',
            },
            {
            id: '3',
            name: 'Calvin Goah',
            summary: 'Engineer at IXL Learning; skilled in Node.js, React, PostgreSQL; CS grad from Columbia.',
            },
        ].sort(() => 0.5 - Math.random()).slice(0, 3); // Randomize for other inputs
  }


  // In a real app, this would be:
  // const response = await fetch('/api/match', { method: 'POST', body: JSON.stringify({ input }), headers: {'Content-Type': 'application/json'} });
  // if (!response.ok) throw new Error('Failed to match candidates');
  // const candidates = await response.json();
  // return candidates;

  console.log("[API Simulation] Found matches:", results.map(c => c.name));
  return Promise.resolve(results);
}
