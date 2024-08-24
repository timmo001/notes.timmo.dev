import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { Navigation } from "~/app/notebook/[id]/_components/navigation";
import { TextFadeInUpGrab } from "~/components/animations/text";

export default async function Notebook({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) notFound();

  const notebook = await api.notebook.getOne({
    id: parseInt(params.id),
    userId: user.id,
  });

  void api.notebook.getOne.prefetch({
    id: parseInt(params.id),
    userId: user.id,
  });

  if (!notebook) notFound();

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-8">
        <TextFadeInUpGrab>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            {notebook.title}
          </h1>
          <h2 className="mt-4 text-wrap text-center text-xl font-light">
            {notebook.description ?? ""}
          </h2>
        </TextFadeInUpGrab>
      </section>
      <section className="items-between flex w-full flex-1 flex-row justify-between rounded-xl border shadow-md">
        <Navigation />
        <div className="flex flex-1 flex-col rounded-xl">
          <textarea className="h-full w-full rounded-xl bg-gray-950" />
        </div>
      </section>
    </>
  );
}
