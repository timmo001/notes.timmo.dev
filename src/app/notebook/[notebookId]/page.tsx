import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { api } from "~/trpc/server";
import { TextFadeInUpGrab } from "~/components/animations/text";

export default async function Notebook({
  params,
}: {
  params: { notebookId: string };
}) {
  const user = await currentUser();
  if (!user) notFound();

  const notebook = await api.notebook.getOne({
    id: parseInt(params.notebookId),
    userId: user.id,
  });

  void api.notebook.getOne.prefetch({
    id: parseInt(params.notebookId),
    userId: user.id,
  });

  if (!notebook) notFound();

  return (
    // <div className="container flex w-full flex-col flex-wrap items-center justify-around gap-4 px-4 py-4">
    <>
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
      <section className="items-between flex w-full flex-1 flex-row justify-between rounded-xl border shadow-md" />
    </>
    // </div>
  );
}
