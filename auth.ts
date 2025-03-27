// import NextAuth ,{DefaultSession}from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import authConfig from './auth.config';
// import { db } from '@/lib/db';
// import { getUserByEmail, getUserById } from './Data/user';
// import { UserRole } from '@prisma/client';


////////////////////////////////////////
// export const {
// 	handlers: { GET, POST },
// 	auth,
// 	signIn,
// 	signOut,
// } = NextAuth({
// 	callbacks: {
// 		// async signIn({ user }) {
// 		// 	const existingUser = await getUserById(user.id as string);
// 		// 	if (!existingUser || !existingUser.emailVerified) return false;
// 		//
// 		// 	return true
// 		// },
//
//
// 		async session({ token  , session }) {
// 			if (session.user && token.sub){
// 				session.user.id = token.sub
// 			}
// 			if(token.role && session.user){
// 				session.user.role = token.role as UserRole
// 			}
// 			// console.log({sessionToken :token})
//
// 			return session;
// 		},
// 		async jwt({token}){
// 			if (!token.sub) return token
// 			const existingUser = await getUserById(token.sub)
// 			if (!existingUser) return token
// 			token.role = existingUser.role
// 			return token;
// 	}},
// 		adapter: PrismaAdapter(db),
// 		session: { strategy: 'jwt' },
// 		...authConfig,
// 	});



//////////////////////////////////////////////


import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from './Data/user';
import { UserRole } from '@prisma/client';

const auth = NextAuth({
	callbacks: {
		async session({ token, session }) {
			if (session.user && token.sub) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.role = existingUser.role;
			return token;
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
});

// Bu şekilde `handlers`'ı doğru dışa aktarmalısınız.
export const handlers = {
	GET: auth.handlers.GET,
	POST: auth.handlers.POST,
};

export const { signIn, signOut } = auth;
