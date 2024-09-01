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
  delete: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
        notebookId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const page = await ctx.db.query.pages.findFirst({
        where: (pages, { eq }) => eq(pages.id, input.id),
      });

      // Ensure that the page belongs to the notebook
      if (page?.notebookId !== input.notebookId) return false;

      console.log("Delete page:", page);

      await ctx.db.delete(pages).where(eq(pages.id, input.id));
      return true;
    }),

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
      const page = await ctx.db.query.pages.findMany({
        where: (pages, { eq }) => eq(pages.notebookId, input.notebookId),
        orderBy: (pages, { asc }) => [asc(pages.title)],
      });
      return page ?? null;
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
      const page = await ctx.db.query.pages.findFirst({
        where: (pages, { eq }) => eq(pages.id, input.id),
      });

      // Ensure that the page belongs to the notebook
      if (page?.notebookId !== input.notebookId) return null;

      return page ?? null;
    }),

  updateTitle: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
        title: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(pages)
        .set({
          title: input.title,
        })
        .where(eq(pages.id, input.id));
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
