'use client';
import CustomIcon from '@/components/Icon';
import fetcher from '@/lib/fetcher';
import { useState } from 'react';
import { mutate } from 'swr';

export default function AddUser({ closeAddUser }: { closeAddUser: () => void }) {
	const [formData, setFormData] = useState({
		username: '',
		fullName: '',
		password: '',
	});
	const [errors, setErrors] = useState<string[] | null>(null);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await fetcher({
			url: `${process.env.NEXT_PUBLIC_API}/users`,
			method: 'POST',
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		if (response.ok) {
			mutate(`${process.env.NEXT_PUBLIC_API}/users`);
			closeAddUser();
		}
		setErrors(data.message);
	};
	return (
		<div className="flex flex-col gap-2 ">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 ">
							Full Name
						</label>
						<input
							type="text"
							id="fullname"
							onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
					<div>
						<label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">
							Username
						</label>
						<input
							type="text"
							id="username"
							onChange={(e) => setFormData({ ...formData, username: e.target.value })}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
							Password
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
				</div>
				{errors && (
					<div className="text-sm text-rose-500 px-5">
						<ul className="list-disc">
							{errors.map((error, index) => (
								<li key={index} className="capitalize">
									{error}
								</li>
							))}
						</ul>
					</div>
				)}
				<div className="flex justify-end items-center gap-4">
					<button type="submit" className="py-1 px-3 bg-teal-600 text-white rounded-md">
						<CustomIcon icon="carbon:checkmark" className="w-6 h-6 fill-current" />
					</button>
					<button className="py-1 px-3 bg-rose-400 text-white rounded-md" onClick={closeAddUser}>
						<CustomIcon icon="carbon:close" className="w-6 h-6 fill-current" />
					</button>
				</div>
			</form>
			<hr className="py-2" />
		</div>
	);
}
