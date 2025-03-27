import NextAuth, { DefaultSession } from 'next-auth';
import { UserRole } from '@prisma/client';

export type ExtendUser = DefaultSession['user'] &{
	role: UserRole,
	id:string
}

declare module 'next-auth' {
	interface Session {
		user: ExtendUser
	}
}
