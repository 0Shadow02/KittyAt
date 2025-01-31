/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * A condition to bypass authentication for static assets and a specific API route
 * Static assets are files served by Next.js that start with '/_next/' or contain a dot ('.') but do not end with '.html'
 * The specific API route '/api/v1/events' is also bypassed
 * @param {URL} nextUrl - The URL of the incoming request
 * @returns {boolean} - Returns true if the request is for a static asset or the specific API route, otherwise false
 */
export const isBypassRoute = (nextUrl: URL): boolean => {
  const isStaticAsset = nextUrl.pathname.startsWith('/_next/') || 
                        nextUrl.pathname.includes('.') && 
                        !nextUrl.pathname.endsWith('.html');
  return isStaticAsset || nextUrl.pathname.startsWith("/api/v1/events");
};