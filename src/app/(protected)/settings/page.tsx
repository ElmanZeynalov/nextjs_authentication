import React from 'react';
import { auth,signOut } from '../../../../auth';
import { Button } from '@/components/ui/button';


async function Page() {
	const session = await auth();

	// console.log(JSON.stringify(session));
	return <div>{JSON.stringify(session)}

		<form onSubmit={
			async ()=>{
				'use server'
				await signOut();
			}
		}>
			<Button type="submit">sing out</Button>
		</form>

	</div>;
}

export default Page;
