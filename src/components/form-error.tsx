import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
	message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;
	return (
		<div className="bg-red-100 p-3 rounded-md flex items-center text-sm gap-x-2 text-destructive">
			<ExclamationTriangleIcon className="h-4 w-4" />
			<p>{message}</p>
		</div>
	);
};
