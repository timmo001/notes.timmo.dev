import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pages } from "~/server/db/schema";

const CreatePageSchema = z.object({
  title: z.string().min(1).max(256),
  content: z.string().optional(),
  notebookId: z.number().min(1),
});

export const pageRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreatePageSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(pages).values({
        title: input.title,
        content: input.content,
        notebookId: input.notebookId,
      });
    }),

  getAll: publicProcedure
    .input(z.object({ notebookId: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.pages.findMany({
        where: (pages, { eq }) => eq(pages.notebookId, input.notebookId),
        orderBy: (pages, { desc }) => [desc(pages.updatedAt)],
      });
      return post ?? null;
    }),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
        notebookId: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.pages.findFirst({
        // Adding notebookId to the where clause to ensure that the notebook is the owner of the page
        where: (pages, { eq }) =>
          eq(pages.id, input.id) && eq(pages.notebookId, input.notebookId),
      });
      return post ?? null;
    }),

  updateContent: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(pages)
        .set({
          content: input.content,
        })
        .where(eq(pages.id, input.id));
    }),
});
