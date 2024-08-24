import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { notebooks } from "~/server/db/schema";

export const CreateNotebookSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(256, {
      message: "Title must be at most 256 characters.",
    }),
  description: z.string().optional(),
  userId: z.string().min(1, {
    message: "User ID must be at least 1 character.",
  }),
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

  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  //   return post ?? null;
  // }),
});
