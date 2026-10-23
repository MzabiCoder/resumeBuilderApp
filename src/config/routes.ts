/**
 * Route indexing policy, shared by robots.ts, sitemap.ts and the a11y test suite.
 * Private prefixes are disallowed in robots and also set `noindex` in their metadata.
 */
export const privateRoutePrefixes = [
  "/resume/builder",
  "/resume/upload",
  "/resume/new",
  "/cover-letter/builder",
  "/cover-letter/start",
  "/dashboard",
  "/account",
  "/privacy-center",
  "/share",
  "/api",
  "/template-preview",
  "/sign-in",
  "/sign-up",
] as const;

/** Static, indexable routes that exist today. Content routes are appended as phases land. */
export const staticIndexableRoutes: ReadonlyArray<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/resume/start", priority: 0.9 },
];
