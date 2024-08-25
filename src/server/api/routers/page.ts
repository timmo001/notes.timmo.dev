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
      console.log("Create page:", input);
      await ctx.db.insert(pages).values({
        title: input.title,
        content: input.content,
        notebookId: input.notebookId,
      });
    }),

  getAll: publicProcedure
    .input(z.object({ notebookId: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      console.log("Get all pages:", input);
      const post = await ctx.db.query.pages.findMany({
        where: (pages, { eq }) => eq(pages.notebookId, input.notebookId),
        orderBy: (pages, { asc }) => [asc(pages.title)],
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
      console.log("Get one page:", input);
      const post = await ctx.db.query.pages.findFirst({
        where: (pages, { eq }) => eq(pages.id, input.id),
      });

      // Ensure that the page belongs to the notebook
      if (post?.notebookId !== input.notebookId) return null;

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
