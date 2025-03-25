import React from 'react';
import { auth } from '../../../../auth';

async function Page() {
	const session = await auth();

	console.log(JSON.stringify(session));
	return <div>settings</div>;
}

export default Page;
