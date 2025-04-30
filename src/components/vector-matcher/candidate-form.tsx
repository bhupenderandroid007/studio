"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { addCandidate, type FormState } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheck, CircleAlert } from "lucide-react";


const initialState: FormState = { message: '', type: 'idle' };

export function CandidateForm() {
  const [state, formAction] = useFormState(addCandidate, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const isSubmitting = submitButtonRef.current?.getAttribute("data-pending") === "true";

  useEffect(() => {
    if (state.type === 'success') {
      toast({
        title: "Success!",
        description: state.message,
      });
      formRef.current?.reset(); // Reset form on success
    } else if (state.type === 'error' && !state.errors) { // Show general error toast if no field errors
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
    }
  }, [state, toast]);

    // Function to get error message for a specific field
    const getFieldError = (fieldName: string): string | undefined => {
      return state.errors?.[fieldName]?.[0];
    };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Candidate</CardTitle>
        <CardDescription>Enter the details for the new candidate profile.</CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction} key={state.resetKey}> {/* Add key here */}
        <CardContent className="space-y-4">
          {state.type === 'error' && state.errors && (
            <Alert variant="destructive" className="mb-4">
              <CircleAlert className="h-4 w-4" />
              <AlertDescription>
                Please correct the errors below.
              </AlertDescription>
            </Alert>
          )}
           {state.type === 'success' && (
             <Alert variant="default" className="mb-4 bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700">
               <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
               <AlertDescription className="text-green-800 dark:text-green-200">
                 {state.message}
               </AlertDescription>
             </Alert>
           )}
          <div className="space-y-2">
            <Label htmlFor="name">Candidate Name</Label>
            <Input id="name" name="name" placeholder="e.g., Jane Doe" required disabled={isSubmitting} />
            {getFieldError('name') && <p className="text-sm font-medium text-destructive">{getFieldError('name')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary / Skills</Label>
            <Textarea id="summary" name="summary" placeholder="Describe the candidate's skills and experience..." required minLength={10} disabled={isSubmitting} />
             {getFieldError('summary') && <p className="text-sm font-medium text-destructive">{getFieldError('summary')}</p>}
          </div>
        </CardContent>
        <CardFooter>
           <Button type="submit" ref={submitButtonRef} disabled={isSubmitting} aria-disabled={isSubmitting}>
             {isSubmitting ? <LoadingSpinner size={16} className="mr-2"/> : null}
              {isSubmitting ? "Adding Candidate..." : "Add Candidate"}
           </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
