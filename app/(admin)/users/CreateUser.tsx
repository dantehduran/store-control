import { useRef } from 'react';

export default function CreateUser() {
	const email = useRef('');
	const password = useRef('');
	const name = useRef('');
	return (
		<div className="flex flex-row flex-wrap p-4 mt-4">
			<form>
				<div className="flex flex-col md:flex-row gap-2 justify-center items-center">
					<label htmlFor="email" className="text-sm font-medium text-gray-700">
						Email
					</label>
					<input type="email" id="email" name="email" className="px-2 py-1.5" />
				</div>
			</form>
		</div>
	);
}
