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
import { DialogFooter } from "~/components/ui/dialog";

const FormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(256, {
      message: "Title must be at most 256 characters.",
    }),
});

export function NewPageForm({
  notebookId,
  onCancel,
}: {
  notebookId: number;
  onCancel: () => void;
}) {
  const auth = useAuth();
  const router = useRouter();
  const utils = api.useUtils();

  const createPage = api.page.create.useMutation({
    onSuccess: async () => {
      await utils.notebook.invalidate();
      await utils.page.invalidate();
      router.push(`/notebook/${notebookId}/page/-1`);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("New page:", data);
    if (!auth.userId) {
      console.error("User is not authenticated");
      return;
    }

    createPage.mutate({
      title: data.title,
      notebookId: notebookId,
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
                <Input placeholder="Page" {...field} />
              </FormControl>
              <FormDescription>The name of your page.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create page</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
