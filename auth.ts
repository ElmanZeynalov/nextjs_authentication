import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from './auth.config';
import { db } from '@/lib/db';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
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
