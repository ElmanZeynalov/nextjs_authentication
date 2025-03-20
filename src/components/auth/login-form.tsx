'use client'
import React from 'react';
import CardWrapper from '@/components/auth/card-wrapper';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../../../shcemas';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {Input} from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

function LoginForm() {
	const form= useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues:{
			email:"",
			password:""
		}
	})

	const onSubmit = (value : z.infer<typeof LoginSchema>) =>{
		console.log(value)
	}

	return (
		<CardWrapper
			backButtonHref={'/href/login'}
			backButtonLabel={"Don't have a account?"}
			headerLabel={'Welcome back!'}
			showSocial
		>
			<Form {...form}>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name="email"
							render={({ field })=>(
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter your email" type={'email'}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						></FormField>

						<FormField
							control={form.control}
							name="password"
							render={({ field })=>(
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter your password" type={'password'}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						></FormField>
					</div>
					<FormError message={"Something went wrong"}/>
					<FormSuccess message={"Email sent"}/>
					<Button type={'submit'} className={"w-full"}>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}

export default LoginForm;
