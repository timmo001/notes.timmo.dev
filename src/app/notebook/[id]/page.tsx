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
    <div
      className="min-w-screen container fixed top-16 flex w-screen flex-col items-center justify-around gap-4 px-4 py-4"
      style={{
        maxHeight: "calc(100vh - 4rem)",
      }}
    >
      <section className="flex flex-col items-center justify-center">
        <TextFadeInUpGrab>
          <h1 className="text-7xl font-extrabold tracking-tight">
            {notebook.title}
          </h1>
          <h2 className="mt-3 text-wrap text-center text-xl font-light">
            {notebook.description ?? ""}
          </h2>
        </TextFadeInUpGrab>
      </section>
      <section className="items-between flex w-full flex-1 flex-row justify-between rounded-xl border shadow-md">
        <Navigation />
        <div className="flex flex-1 flex-col rounded-xl">
          <textarea className="h-full w-full rounded-e-xl bg-gray-950" />
        </div>
      </section>
    </div>
  );
}
