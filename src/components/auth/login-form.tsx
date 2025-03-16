import React from 'react';
import CardWrapper from '@/components/auth/card-wrapper';

function LoginForm() {
	return (
		<CardWrapper
			backButtonHref={'/href/login'}
			backButtonLabel={"Don't have a account?"}
			headerLabel={'Welcome back!'}
			showSocial
		>
			login form
		</CardWrapper>
	);
}

export default LoginForm;
