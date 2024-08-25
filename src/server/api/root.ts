import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { notebookRouter } from "~/server/api/routers/notebook";
import { pageRouter } from "~/server/api/routers/page";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  notebook: notebookRouter,
  page: pageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.notebook.all();
 *       ^? Notebook[]
 */
export const createCaller = createCallerFactory(appRouter);
