import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { notebooks } from "~/server/db/schema";

const CreateNotebookSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().optional(),
  userId: z.string().min(1),
});

// export const GetNotebookSchema = CreateNotebookSchema.extend({});

export const notebookRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateNotebookSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(notebooks).values({
        title: input.title,
        description: input.description,
        userId: input.userId,
      });
    }),

  getAll: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.notebooks.findMany({
        where: (notebooks, { eq }) => eq(notebooks.userId, input.userId),
        orderBy: (notebooks, { desc }) => [desc(notebooks.createdAt)],
      });
      return post ?? null;
    }),
});
