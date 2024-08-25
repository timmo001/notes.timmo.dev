"use client";
import { NotebookText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export function Navigation({
  notebookId,
  pages,
  selectedPage,
  onNewPage,
}: {
  notebookId: number;
  pages: Array<{
    id: number;
    title: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    content: string | null;
    notebookId: number;
  }>;
  selectedPage: number | null;
  onNewPage: () => void;
}) {
  const router = useRouter();

  return (
    <Command className="flex max-h-[72vh] w-[248px] flex-col rounded-s-xl">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandGroup heading="Pages">
          <CommandEmpty>No pages found.</CommandEmpty>
          <CommandItem aria-selected={false} onSelect={onNewPage}>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Page</span>
          </CommandItem>
          {pages.map((page) => (
            <CommandItem
              key={page.id}
              className={`${
                selectedPage === page.id ? "bg-accent/50" : ""
              } hover:bg-accent-hover`}
              onSelect={() => {
                router.push(`/notebook/${notebookId}/page/${page.id}`);
              }}
            >
              <NotebookText className="mr-2 h-4 w-4" />
              <span>{page.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
