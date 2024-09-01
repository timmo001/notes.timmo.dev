import { Trash2 } from "lucide-react";

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

export function EditorHeader({
  page,
  onDelete,
}: {
  page: Page;
  onDelete: () => void;
}) {
  return (
    <>
      <div className="mb-2 flex w-full flex-row items-center justify-between rounded-xl border px-3 py-3">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{page.title}</h1>
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
