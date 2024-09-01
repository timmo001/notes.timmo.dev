import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { type Page } from "~/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { DateFromNow } from "~/components/date";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
});

export function EditorHeader({
  page,
  onDelete,
  onUpdateTitle,
}: {
  page: Page;
  onDelete: () => void;
  onUpdateTitle: (title: string) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: page.title ?? "",
    },
  });

  return (
    <>
      <div className="mb-2 flex w-full flex-row items-center justify-between rounded-xl border px-3 py-3">
        <div className="flex flex-col">
          <Form {...form}>
            <form className="w-full space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Page 01"
                        {...field}
                        className="border-none p-0 text-3xl font-bold outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={(e) => {
                          field.onChange(e);
                          onUpdateTitle(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <p className="mt-1 text-sm text-gray-500">
            Last updated: <DateFromNow date={page.updatedAt} />
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex flex-row gap-2">
              <Button
                className="hover:bg-destructive/80"
                size="icon"
                variant="outline"
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Page</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this page?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
