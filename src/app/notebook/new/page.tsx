"use client";
import { NewNotebookForm } from "~/app/notebook/new/_components/newNotebookForm";
import { TextFadeInUpGrab } from "~/components/animations/text";

export default function NewNotebook() {
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
