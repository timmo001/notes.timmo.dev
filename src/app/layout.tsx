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
import { dark } from '@clerk/themes'

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { HydrateClient } from "~/trpc/server";
import { ModeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "Notes",
  description: "A simple notes app",
  icons: [{ rel: "icon", url: "/icon" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
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
                <header className="flex w-full items-center justify-between gap-2 p-4">
                  <h1 className="flex-1 text-2xl font-bold">Notes</h1>
                  <ModeToggle />
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <Button
                      className="transform rounded-md bg-violet-800 bg-opacity-80 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105 hover:bg-violet-800"
                      variant="outline"
                    >
                      <SignInButton mode="modal" />
                    </Button>
                  </SignedOut>
                </header>
                <main className="flex min-h-screen flex-col items-center justify-center">
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
