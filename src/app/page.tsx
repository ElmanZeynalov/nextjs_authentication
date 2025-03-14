import {Poppins} from 'next/font/google';
import { Button } from "@/components/ui/button"
import { LoginButton } from '@/components/auth/login-button';
export default function Home() {
	return (
		<main className='flex h-full min-h-screen flex-col items-center justify-center bg-amber-900 p-24'>
			<div className='space-y-6 text-center'>
				<h1 className='text-6xl font-semibold text-white drop-shadow-md'>Authentication</h1>
				<p className='text-white text-lg'>Authentication service</p>
			</div>
			<div>
				<LoginButton>
				<Button variant='secondary' size={'lg'}>
					Sing In
				</Button>
				</LoginButton>
			</div>
		</main>
	);
}
