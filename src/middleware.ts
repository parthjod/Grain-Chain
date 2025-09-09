import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // ✅ All supported locales
  locales: ["en", "hi", "or"],

  // ✅ Fallback when no locale matches
  defaultLocale: "en",
});

export const config = {
  matcher: [
    // Match all routes except:
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - Static files (contain a dot, e.g. favicon.ico, robots.txt, images, etc.)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
