import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // ✅ All supported locales
  locales: ["en", "hi", "or"],

  // ✅ Default locale when no match is found
  defaultLocale: "en",

  // ✅ Enable automatic locale detection
  localeDetection: true,
});

export const config = {
  // ✅ Match all routes except API, Next.js internals, Vercel internals, or static files
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
