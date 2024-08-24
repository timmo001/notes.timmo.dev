import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

import { TextFadeInUpGrab } from "~/components/animations/text";

// import { api } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-8">
        <TextFadeInUpGrab>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Notes
          </h1>
        </TextFadeInUpGrab>
        <SignedOut>
          <div className="transform rounded-md bg-violet-800/80 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105 hover:bg-violet-800">
            <SignInButton mode="modal">Please Sign In</SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <TextFadeInUpGrab>
            <h2 className="text-3xl font-bold">Notebooks</h2>
          </TextFadeInUpGrab>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href={""}
            >
              <h3 className="text-2xl font-bold">Name</h3>
              <div className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col items-center justify-center rounded-xl bg-white/10 p-4 py-8 hover:bg-white/20"
              href="/notebook/new"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-32"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <div className="text-lg">Create a new notebook</div>
            </Link>
          </div>
        </SignedIn>
      </section>
    </>
  );
}
