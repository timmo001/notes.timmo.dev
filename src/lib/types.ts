export type Notebook = {
  id: number;
  title: string | null;
  description: string | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Page = {
  id: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  content: string | null;
  notebookId: number;
};
