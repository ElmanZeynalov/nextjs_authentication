'use client'
import React, { useState, useTransition } from 'react';
import CardWrapper from '@/components/auth/card-wrapper';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '../../../shcemas';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import {Input} from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { register } from '../../../action/register';

function RegisterForm() {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState <string | undefined>('')
	const [isPending , startTransition] = useTransition()

	const form= useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues:{
			email:"",
			password:"",
			name: ""
		}
	})

	const onSubmit = (value : z.infer<typeof RegisterSchema>) =>{
		setError('')
		setSuccess('')
		startTransition(()=>{
			register(value).then((data)=>{
				setError(data.error);
				setSuccess(data.success)
			})
		})

	}

	return (
		<CardWrapper
			backButtonHref={'/auth/login'}
			backButtonLabel={"Already have a account?"}
			headerLabel={'Create an account!'}
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
										<Input {...field} disabled={isPending} placeholder="Enter your email" type={'email'}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						></FormField>

						<FormField
							control={form.control}
							name="name"
							render={({ field })=>(
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="Enter your name" type={'text'}/>
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
										<Input {...field} disabled={isPending} placeholder="Enter your password" type={'password'}/>
									</FormControl>
									<FormMessage/>
								</FormItem>
							)}
						></FormField>
					</div>
					<FormError message={error}/>
					<FormSuccess message={success}/>
					<Button type={'submit'} disabled={isPending} className={"w-full"}>
						Creat an account
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}

export default RegisterForm;
