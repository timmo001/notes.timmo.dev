"use client";
import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Navigation } from "~/app/notebook/[notebookId]/_components/navigation";
import { NewPageForm } from "~/app/notebook/[notebookId]/_components/newPageForm";

type Page = {
  id: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  content: string | null;
  notebookId: number;
};

export function Editor({
  notebook,
  pages,
  selectedPage,
}: {
  notebook: {
    id: number;
    title: string | null;
    description: string | null;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
  pages: Array<Page>;
  selectedPage: number | null;
}) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  function handleNewPage() {
    console.log("New Page");
    setDialogOpen(true);
  }

  const page = useMemo<Page | null>(
    () => pages.find((page) => page.id === selectedPage) ?? null,
    [pages, selectedPage],
  );

  return (
    <>
      <Navigation
        notebookId={notebook.id}
        pages={pages}
        selectedPage={selectedPage}
        onNewPage={handleNewPage}
      />
      <div className="flex flex-1 flex-col rounded-xl">
        {selectedPage !== null && (
          <textarea className="h-full w-full rounded-e-xl bg-gray-950" />
        )}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Page</DialogTitle>
            <DialogDescription>
              Create a new page in the notebook.
            </DialogDescription>
          </DialogHeader>
          <NewPageForm
            notebookId={notebook.id}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
