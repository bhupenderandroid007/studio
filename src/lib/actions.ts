"use server";

import type { Job, Candidate } from "./types";
import { addJob as addJobApi, addCandidate as addCandidateApi, matchCandidates as matchCandidatesApi } from '@/services/job-board';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const JobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const CandidateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
});

const MatchSchema = z.string().min(3, "Job description or ID must be provided");

export type FormState = {
  message: string;
  type: 'success' | 'error' | 'idle';
  errors?: Record<string, string[]> | null;
  resetKey?: string;
};

const initialState: FormState = { message: '', type: 'idle' };

export async function addJob(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = JobSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addJobApi(validatedFields.data);
    revalidatePath('/'); // Revalidate the page to potentially update job lists if displayed
    return { message: 'Job added successfully!', type: 'success', resetKey: Date.now().toString() };
  } catch (error) {
    console.error("Failed to add job:", error);
    return { message: 'Failed to add job. Please try again.', type: 'error' };
  }
}


export async function addCandidate(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = CandidateSchema.safeParse({
    name: formData.get('name'),
    summary: formData.get('summary'),
  });

   if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addCandidateApi(validatedFields.data);
    revalidatePath('/'); // Revalidate the page if candidate lists are displayed
    return { message: 'Candidate added successfully!', type: 'success', resetKey: Date.now().toString() };
  } catch (error) {
    console.error("Failed to add candidate:", error);
    return { message: 'Failed to add candidate. Please try again.', type: 'error' };
  }
}

export async function matchCandidates(jobInput: string): Promise<{ candidates: Candidate[] | null; error: string | null }> {
  const validatedInput = MatchSchema.safeParse(jobInput);

  if (!validatedInput.success) {
      return { candidates: null, error: "Invalid input for matching." };
  }

  try {
    const candidates = await matchCandidatesApi(validatedInput.data);
    return { candidates, error: null };
  } catch (error) {
    console.error("Failed to match candidates:", error);
    return { candidates: null, error: 'Failed to match candidates. Please try again.' };
  }
}
