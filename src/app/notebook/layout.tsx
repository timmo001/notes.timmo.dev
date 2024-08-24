import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function NotebookLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-8">
        <SignedOut>
          <div className="transform rounded-md bg-violet-800/80 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105 hover:bg-violet-800">
            <SignInButton mode="modal">Please Sign In</SignInButton>
          </div>
        </SignedOut>
        <SignedIn>{children}</SignedIn>
      </section>
    </>
  );
}
