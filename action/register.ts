'use server';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { RegisterSchema } from '../shcemas';
import { db } from '@/lib/db';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) return { error: 'Invalid Field' };

	const { email, password, name } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) {
		return { error: 'Email already in use!!' };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	return { success: 'User created' };
};
