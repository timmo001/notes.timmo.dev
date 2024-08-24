
import { NewNotebookForm } from "~/app/notebook/new/_components/form";
import { TextFadeInUpGrab } from "~/components/animations/text";

// import { api } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <>
      <TextFadeInUpGrab>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          New Notebook
        </h1>
      </TextFadeInUpGrab>
      <NewNotebookForm />
    </>
  );
}
