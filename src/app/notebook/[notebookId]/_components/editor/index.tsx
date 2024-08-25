"use client";
import { Suspense, useMemo, useState } from "react";
import { EditorContent, EditorRoot, JSONContent } from "novel";
import { EditorEvents } from "@tiptap/react";

import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { defaultExtensions } from "~/app/notebook/[notebookId]/_components/editor/extensions";
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

let updateTimeout: NodeJS.Timeout | null = null;
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
  const utils = api.useUtils();

  const updateNotebook = api.page.updateContent.useMutation({
    onSuccess: async () => {
      await utils.page.invalidate();
    },
  });

  function handleNewPage() {
    console.log("New Page");
    setDialogOpen(true);
  }

  function handleUpdateContent({ editor }: EditorEvents["update"]) {
    if (updateTimeout) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      const content = editor.getJSON();
      console.log("Saving content:", content);
      updateNotebook.mutate({
        id: selectedPage!,
        content: JSON.stringify(content),
      });
      updateTimeout = null;
    }, 400);
  }

  const page = useMemo<Page | null>(
    () => pages.find((page) => page.id === selectedPage) ?? null,
    [pages, selectedPage],
  );

  const initialContent = useMemo<JSONContent | undefined>(
    () =>
      page?.content && page.content.startsWith("{")
        ? JSON.parse(page.content)
        : undefined,
    [page?.content],
  );

  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col rounded-xl">
          <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
      }
    >
      <Navigation
        notebookId={notebook.id}
        pages={pages}
        selectedPage={selectedPage}
        onNewPage={handleNewPage}
      />
      <div className="flex h-full flex-1 flex-col rounded-e-xl border-s">
        {selectedPage !== null && (
          <EditorRoot>
            <EditorContent
              autofocus
              // className="min-h-96"
              extensions={defaultExtensions}
              immediatelyRender={false}
              initialContent={initialContent}
              onUpdate={handleUpdateContent}
            />
          </EditorRoot>
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
    </Suspense>
  );
}
