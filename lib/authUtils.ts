
interface Request {
    nextUrl: URL;
    auth?: any;
}

interface HandleAuthParams {
    req: Request;
    apiAuthPrefix: string;
    publicRoutes: string[];
    authRoutes: string[];
    DEFAULT_LOGIN_REDIRECT: string;
}

export const handleAuth = (
    req: HandleAuthParams['req'],
    apiAuthPrefix: HandleAuthParams['apiAuthPrefix'],
    publicRoutes: HandleAuthParams['publicRoutes'],
    authRoutes: HandleAuthParams['authRoutes'],
    DEFAULT_LOGIN_REDIRECT: HandleAuthParams['DEFAULT_LOGIN_REDIRECT']
): Response | void => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return;

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
    }
};
  