import { Calculator } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export function Navigation() {
  return (
    <Command className="flex max-h-[72vh] flex-col rounded-s-xl border-e md:w-[248px]">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {[...Array(20)].map((_, i) => (
            <CommandItem key={i}>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Page {(i + 1).toString().padStart(2, "0")}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
