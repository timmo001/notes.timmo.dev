import {
  Calculator,
  Calendar,
  CreditCard,
  Plus,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";

export function Navigation() {
  return (
    <div className="flex min-h-full flex-col border-e md:w-[240px]">
      <Command className="min-h-full w-full rounded-xl">
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
    </div>
  );
}
