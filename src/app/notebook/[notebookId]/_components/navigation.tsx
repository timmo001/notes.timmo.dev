"use client";
import { NotebookText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { type Page } from "~/lib/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { NewPageForm } from "~/app/notebook/[notebookId]/_components/newPageForm";

export function Navigation({
  notebookId,
  pages,
  selectedPage,
}: {
  notebookId: number;
  pages: Array<Page>;
  selectedPage: number | null;
}) {
  return (
    <Command className="flex max-h-[72vh] w-[248px] flex-col rounded-b-lg rounded-t-xl border">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandGroup heading="Pages">
          <Dialog>
            <DialogTrigger>
              <CommandItem aria-selected={false}>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Page</span>
              </CommandItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Page</DialogTitle>
                <DialogDescription>
                  Create a new page in the notebook.
                </DialogDescription>
              </DialogHeader>
              <NewPageForm notebookId={notebookId} />
            </DialogContent>
          </Dialog>
        </CommandGroup>
        <CommandGroup>
          <CommandEmpty>No pages found.</CommandEmpty>
          {pages.map((page) => (
            <Item
              key={page.id}
              notebookId={notebookId}
              page={page}
              selected={selectedPage === page.id}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Item({
  notebookId,
  page,
  selected,
}: {
  notebookId: number;
  page: Page;
  selected: boolean;
}) {
  const router = useRouter();

  return (
    <CommandItem
      key={page.id}
      className={`${selected ? "bg-accent/50" : ""} hover:bg-accent-hover`}
      onSelect={() => {
        router.push(`/notebook/${notebookId}/page/${page.id}`);
      }}
    >
      <NotebookText className="mr-2 h-4 w-4" />
      <span>{page.title}</span>
    </CommandItem>
  );
}
