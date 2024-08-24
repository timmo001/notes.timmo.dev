import "~/styles/globals.css";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { HydrateClient } from "~/trpc/server";
import Header from "~/components/header";

export const metadata: Metadata = {
  title: "Notes",
  description: "A simple notes app",
  icons: [{ rel: "icon", url: "/icon" }],
  openGraph: {
    images: [
      {
        url: "/api/og",
      },
    ],
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
                <Header />
                <main
                  className="flex min-h-screen flex-col items-center justify-center"
                  style={{
                    minHeight: "calc(100vh - 64px)",
                  }}
                >
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
