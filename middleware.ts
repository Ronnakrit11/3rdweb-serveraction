import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/pricing"],
  ignoredRoutes: ["/api/webhook"],
  beforeAuth: (req) => {
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204 });
    }
    return null;
  },
  afterAuth(auth, req) {
    // Ensure clean redirects after sign out
    if (!auth.userId && !auth.isPublicRoute) {
      const signOutUrl = new URL("/", req.url);
      return Response.redirect(signOutUrl);
    }
    return null;
  },
});
 
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};