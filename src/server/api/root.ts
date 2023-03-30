import { createTRPCRouter } from "~/server/api/trpc";
import { porfileRouter } from "./routers/porfile";
import { postsRouter } from "./routers/posts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  porfile: porfileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
