/**
 * Represents a job posting with a title and description.
 */
export interface Job {
  id?: string; // Optional ID if needed later
  title: string;
  description: string;
}

/**
 * Represents a candidate profile with a name and summary/skills.
 */
export interface Candidate {
  id?: string; // Optional ID if needed later
  name: string;
  summary: string;
}
