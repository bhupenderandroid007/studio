"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { addJob, type FormState } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleCheck, CircleAlert } from "lucide-react";

const initialState: FormState = { message: '', type: 'idle' };

export function JobForm() {
  const [state, formAction] = useFormState(addJob, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null); // Ref for submit button

  // Track submitting state
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
        <CardTitle>Add New Job</CardTitle>
        <CardDescription>Enter the details for the new job posting.</CardDescription>
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
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" name="title" placeholder="e.g., Software Engineer" required disabled={isSubmitting} />
             {getFieldError('title') && <p className="text-sm font-medium text-destructive">{getFieldError('title')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea id="description" name="description" placeholder="Describe the role and responsibilities..." required minLength={10} disabled={isSubmitting} />
            {getFieldError('description') && <p className="text-sm font-medium text-destructive">{getFieldError('description')}</p>}
          </div>
        </CardContent>
        <CardFooter>
           <Button type="submit" ref={submitButtonRef} disabled={isSubmitting} aria-disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner size={16} className="mr-2"/> : null}
              {isSubmitting ? "Adding Job..." : "Add Job"}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
