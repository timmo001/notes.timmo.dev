"use client";

import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
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

const FormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(256, {
      message: "Title must be at most 256 characters.",
    }),
  description: z.string().optional(),
});

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
