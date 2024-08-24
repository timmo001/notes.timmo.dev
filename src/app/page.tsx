import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";

import { api } from "~/trpc/server";
import { TextFadeInUpGrab } from "~/components/animations/text";

export default async function Home() {
  const user = await currentUser();
  if (!user) notFound();

  const notebooks = await api.notebook.getAll({ userId: user.id });

  void api.notebook.getAll.prefetch({ userId: user.id });

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-8">
        <TextFadeInUpGrab>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Notes
          </h1>
        </TextFadeInUpGrab>
      </section>
      <section className="flex flex-col items-center justify-center gap-8">
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
            {notebooks.map((notebook) => (
              <Link
                key={notebook.id}
                className="flex max-w-xs flex-col items-start justify-between gap-2 rounded-xl bg-white/10 p-4 transition-all delay-200 hover:bg-white/20"
                href={`/notebook/${notebook.id}`}
              >
                <div>
                  <h3 className="text-2xl font-semibold">{notebook.title}</h3>
                  <div className="mt-1 text-lg font-light">
                    {notebook.description ?? ""}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(
                    notebook.updatedAt ?? notebook.createdAt,
                  ).toUTCString()}
                </div>
              </Link>
            ))}
            <Link
              className="flex max-w-xs flex-col items-center justify-center rounded-xl bg-white/10 p-4 py-8 opacity-60 transition-all delay-200 hover:bg-white/20 hover:opacity-100"
              href="/notebook/new"
            >
              <Plus size={128} />
              <div className="text-lg font-normal">Create a new notebook</div>
            </Link>
          </div>
        </SignedIn>
      </section>
    </>
  );
}
