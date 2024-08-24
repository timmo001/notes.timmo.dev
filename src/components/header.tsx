"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { ModeToggle } from "~/components/theme-toggle";

export default function Header() {
  const pathname = usePathname();

  const title = useMemo<string>(() => {
    switch (pathname) {
      case "/":
        return "";
      case "/settings":
        return "Settings";
      default:
        return "Notes";
    }
  }, [pathname]);

  return (
    <header className="flex w-full items-center justify-between gap-2 px-4 py-3">
      <h1 className="flex-1 text-2xl font-bold">{title}</h1>
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="transform rounded-md bg-violet-800/80 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105 hover:bg-violet-800">
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
    </header>
  );
}
