'use server'
import * as z from 'zod'
import { LoginSchema } from '../shcemas';



export  const  login = async  (values: z.infer<typeof LoginSchema>	) =>{
	const validatedFields = LoginSchema.safeParse(values)

	if (!validatedFields.success)
		return {error : "Invalid Field"}

	return {success : "email sent"}
}