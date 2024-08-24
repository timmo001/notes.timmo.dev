"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { ModeToggle } from "~/components/theme-toggle";

export default function Header() {
  const pathname = usePathname();

  const title = useMemo<
    Array<{
      name: string;
      href?: string;
    }>
  >(() => {
    switch (pathname) {
      case "/":
        return [];
      case "/notebook/new":
        return [{ name: "Notes", href: "/" }, { name: "New Notebook" }];
      default:
        return [{ name: "Notes" }];
    }
  }, [pathname]);

  return (
    <header className="flex w-full items-center justify-between gap-2 px-4 py-3">
      <h1 className="flex flex-1 select-none flex-row gap-4 text-2xl font-bold">
        {title.map((t, i) => (
          <span key={i}>
            {i > 0 && <span className="mr-4 text-gray-400">/</span>}
            {t.href ? <Link href={t.href}>{t.name}</Link> : t.name}
          </span>
        ))}
      </h1>
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
