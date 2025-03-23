'use server'
import * as z from 'zod'
import {  RegisterSchema } from '../shcemas';



export  const  register = async  (values: z.infer<typeof RegisterSchema>	) =>{
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success)
		return {error : "Invalid Field"}

	return {success : "email sent"}
}