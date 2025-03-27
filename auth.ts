import NextAuth ,{DefaultSession}from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from '@/lib/db';
import { getUserById } from './Data/user';
import { UserRole } from '@prisma/client';


export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async session({ token  , session }) {
			if (session.user && token.sub){
				session.user.id = token.sub
			}
			if(token.role && session.user){
				session.user.role = token.role as UserRole
			}
			console.log({sessionToken :token})

			return session
		},
		async jwt({token}){
			if (!token.sub) return token
			const existingUser = await getUserById(token.sub)
			if (!existingUser) return token

			token.role = existingUser.role

		// 	token.customField ='test'
		// console.log({token})
		return token
	}},
		adapter: PrismaAdapter(db),
		session: { strategy: 'jwt' },
		...authConfig,
	});

// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import authConfig from './auth.config';
// import { db } from '@/lib/db';
//
// const nextAuthInstance = NextAuth({
// 	adapter: PrismaAdapter(db),
// 	session: { strategy: 'jwt' },
// 	...authConfig,
// });
//
// export const { handlers, auth } = nextAuthInstance;
