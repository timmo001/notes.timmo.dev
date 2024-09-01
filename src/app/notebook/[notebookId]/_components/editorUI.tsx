"use client";
import { Suspense, useMemo, useState } from "react";
import { JSONContent } from "novel";

import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Navigation } from "~/app/notebook/[notebookId]/_components/navigation";
import { NewPageForm } from "~/app/notebook/[notebookId]/_components/newPageForm";
import { Editor } from "~/components/editor";
import { Notebook, Page } from "~/lib/types";
import { EditorHeader } from "~/components/editor/header";
import { useRouter } from "next/navigation";

let updateTimeout: NodeJS.Timeout | null = null;
export function EditorUI({
  notebook: initialNotebook,
  pages: initialPages,
  selectedPage,
}: {
  notebook: Notebook;
  pages: Array<Page>;
  selectedPage: number | null;
}) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [notebook, setNotebook] = useState<Notebook>(initialNotebook);
  const [pages, setPages] = useState<Array<Page>>(initialPages);

  const utils = api.useUtils();

  const router = useRouter();

  const deletePage = api.page.delete.useMutation({
    onSuccess: async () => {
      await utils.page.invalidate();
      router.push(`/notebook/${notebook.id}`);
    },
  });

  const updatePageTitle = api.page.updateTitle.useMutation({
    onSuccess: async () => {
      await utils.page.invalidate();
    },
  });

  const updatePageContent = api.page.updateContent.useMutation({
    onSuccess: async () => {
      await utils.page.invalidate();
    },
  });

  function handleNewPage() {
    console.log("New Page");
    setDialogOpen(true);
  }

  function handleDeletePage() {
    if (selectedPage === null) return;
    console.log("Delete Page:", selectedPage);
    deletePage.mutate({ id: selectedPage, notebookId: notebook.id });
  }

  function handleUpdateTitle(title: string) {
    if (selectedPage === null) return;

    // Update the title locally
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.id === selectedPage ? { ...page, title } : page,
      ),
    );

    // Update the title after a delay to prevent too many requests
    if (updateTimeout) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      console.log("Saving title:", title);
      updatePageTitle.mutate({ id: selectedPage!, title });
      updateTimeout = null;
    }, 400);
  }

  function handleUpdateContent(content: JSONContent) {
    if (selectedPage === null) return;

    // Update the content after a delay to prevent too many requests
    if (updateTimeout) clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      console.log("Saving content:", content);
      updatePageContent.mutate({
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
        : null,
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
      <div className="flex h-full flex-1 flex-col">
        {selectedPage !== null && page && (
          <>
            <EditorHeader
              page={page}
              onDelete={handleDeletePage}
              onUpdateTitle={handleUpdateTitle}
            />
            <Editor
              initialValue={initialContent}
              onChange={handleUpdateContent}
            />
          </>
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
