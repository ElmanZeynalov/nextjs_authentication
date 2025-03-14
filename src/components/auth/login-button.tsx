'use client'

import {useRouter} from 'next/navigation';

interface LoginButtonProps {
	children: React.ReactNode,
	mode?: "modal" | "redirect",
	asChild?: boolean
}

export const LoginButton = ({children , mode="redirect", asChild}:LoginButtonProps) =>{

	const router = useRouter();

	if (mode==='modal'){
		return <span>todo</span>
	}

	const onClick = ()=>{
		router.push("/auth/login");
		console.log("clicked");
	}

	return(
		<span onClick={onClick} className="cursor-pointer">{children}</span>
	)
}