"use client";

import { type z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { CreateNotebookSchema } from "~/server/api/routers/notebook";
import { useRouter } from "next/navigation";

export function NewNotebookForm() {
  const auth = useAuth();
  const router = useRouter();
  const utils = api.useUtils();

  const createNotebook = api.notebook.create.useMutation({
    onSuccess: async () => {
      await utils.notebook.invalidate();
      router.replace("/");
    },
  });

  const form = useForm<z.infer<typeof CreateNotebookSchema>>({
    resolver: zodResolver(CreateNotebookSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof CreateNotebookSchema>) {
    console.log("New notebook:", data);
    if (!auth.userId) {
      console.error("User is not authenticated");
      return;
    }

    createNotebook.mutate({
      title: data.title,
      description: data.description,
      userId: auth.userId,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Notebook" {...field} />
              </FormControl>
              <FormDescription>The name of your notebook.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="A notebook" {...field} multiple />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
