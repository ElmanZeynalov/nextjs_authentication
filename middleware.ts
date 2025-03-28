import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { publicRoutes, authRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from './routes';

const { auth } = NextAuth(authConfig);
// export default auth((req) => {
// 	console.log("Middleware test mesajı");
// 	return NextResponse.json({ message: "Middleware işə düşdü!" });
// });

export default auth((req): any => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) return null;

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
	}

	if (!isLoggedIn && !isPublicRoute) {
		return Response.redirect(new URL('auth/login', nextUrl));
	}
	return null;
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
	// matcher: ['/dashboard', '/', '/auth/login'],
};
