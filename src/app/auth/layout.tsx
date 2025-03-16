function AuthLayout({ children }: { children: React.ReactNode }) {
	return <div className="h-screen flex items-center justify-center bg-amber-900">{children}</div>;
}

export default AuthLayout;
