import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { api } from "~/trpc/server";
import { Editor } from "~/app/notebook/[notebookId]/_components/editor";
import { TextFadeInUpGrab } from "~/components/animations/text";

export default async function Notebook({
  params,
}: {
  params: { notebookId: string; pageId: string };
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

  const pages = (await api.page.getAll({ notebookId: notebook.id })) || [];

  void api.page.getAll.prefetch({ notebookId: notebook.id });

  const pageId = params.pageId ? (parseInt(params.pageId) ?? -1) : -1;

  // Redirect to the last page if the pageId is invalid or out of bounds
  if (pageId < 0 || pages.findIndex((page) => page.id === pageId) < 0) {
    const lastPage = pages[pages.length - 1];
    if (!lastPage || !pages || pages.length < 1) {
      redirect(`/notebook/${params.notebookId}`);
    } else {
      redirect(`/notebook/${params.notebookId}/page/${lastPage.id}`);
    }
  }

  return (
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
      <section className="items-between flex w-full flex-1 flex-row justify-between rounded-xl border shadow-md">
        <Editor
          notebook={notebook}
          pages={pages}
          selectedPage={parseInt(params.pageId)}
        />
      </section>
    </>
  );
}
