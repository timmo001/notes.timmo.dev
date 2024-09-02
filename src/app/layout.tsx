import "~/styles/prosemirror.css";
import "~/styles/globals.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter as FontSans } from "next/font/google";

import { cn } from "~/lib/utils";
import { Header } from "~/components/header";
import { HydrateClient } from "~/trpc/server";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Notes",
  description: "A simple notes app",
  keywords: ["notes", "app"],
  icons: [{ rel: "icon", url: "/icon" }],
  metadataBase: new URL("https://notes.timmo.dev"),
  openGraph: {
    images: [
      {
        url: "/api/og",
      },
    ],
    siteName: "Notes",
    url: "https://notes.timmo.dev",
  },
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
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <HydrateClient>
                <Header />
                <main
                  className="container flex min-h-screen flex-col items-center justify-around gap-12 px-4 py-4"
                  style={{
                    minHeight: "calc(100vh - 64px)",
                  }}
                >
                  {children}
                </main>
                <Toaster />
              </HydrateClient>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
