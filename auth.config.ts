import type { NextAuthConfig } from 'next-auth';
import Credential from 'next-auth/providers/credentials';
import { LoginSchema } from './shcemas';
import { getUserByEmail } from './Data/user';
import bcrypt from 'bcrypt';

export default {
	providers: [
		Credential({
			async authorize(credential) {
				const validatedFields = LoginSchema.safeParse(credential);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;

					const passwordMatch = await bcrypt.compare(password, user.password);
					if (passwordMatch) {
						return user;
					}
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
