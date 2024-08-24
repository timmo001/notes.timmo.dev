import "~/styles/globals.css";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { HydrateClient } from "~/trpc/server";
import { ModeToggle } from "~/components/theme-toggle";

export const metadata: Metadata = {
  title: "Notes",
  description: "A simple notes app",
  icons: [{ rel: "icon", url: "/icon" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <HydrateClient>
                <header className="flex w-full items-center justify-between bg-gradient-to-r from-[#2e026d] to-[#15162c] p-4">
                  <h1 className="text-2xl font-bold">Notes</h1>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <ModeToggle />
                </header>
                <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                  <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    {children}
                  </div>
                </main>
              </HydrateClient>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
