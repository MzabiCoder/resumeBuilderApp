import "server-only";

export interface SessionUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export interface Session {
  user: SessionUser;
}

/**
 * Phase 1 stub: everyone is a guest. Phase 5 replaces this with the real auth lookup
 * (which reads cookies, so callers already render it inside <Suspense>).
 */
export async function getSession(): Promise<Session | null> {
  return null;
}
