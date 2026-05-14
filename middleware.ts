// Middleware is now a pass-through. The A/B test has concluded and the
// single new landing lives at /. The deltanova_variant cookie left over
// from prior sessions is harmless — we no longer read it for routing.
//
// You can delete this file entirely once you're confident no /apply or
// /a / /b URLs are still in circulation (emails, posts, ads, etc.).
// Until then, keep it so those old URLs 404 cleanly via the default
// Next.js handler.

export function middleware() {
  // no-op
}

export const config = {
  matcher: [],
};
