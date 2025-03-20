import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormSuccessProps {
	message?: string
}


export const FormSuccess = ({ message }: FormSuccessProps)=>{
	if (!message) return null
return (
	<div className="bg-green-100 p-3 rounded-md flex items-center text-sm gap-x-2 text-emerald-800">
		<CheckCircledIcon className='h-5 w-5'/>
		<p>{message}</p>
	</div>
)
}