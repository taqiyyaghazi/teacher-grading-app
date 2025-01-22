'use client';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAssignmentStore } from '@/stores/assignment-store';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  grade: z.coerce.number().min(0).max(100),
  feedback: z.string().min(1),
});

const GradeForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grade: 0,
      feedback: '',
    },
  });

  const { assessAssignment, selectedAssignment, isLoadingAssessment } =
    useAssignmentStore();

  const { toast } = useToast();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (selectedAssignment) {
      assessAssignment({ ...data, assignmentId: selectedAssignment.id }, toast);
    }
  };

  return (
    <DialogFooter>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem className="w-20">
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Give feedback to students"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoadingAssessment}>
            Submit
          </Button>
        </form>
      </Form>
    </DialogFooter>
  );
};

export default GradeForm;
