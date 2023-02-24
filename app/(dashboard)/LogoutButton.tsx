'use client';
import CustomIcon from '@/components/Icon';
import { signOut } from 'next-auth/react';
export default function LogoutButton() {
	const handleLogout = async () => {
		await signOut({ callbackUrl: '/login' });
	};
	return (
		<button className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-teal-600 group" onClick={handleLogout}>
			<span className="absolute w-1.5 h-8 bg-teal-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
			<CustomIcon icon="carbon:logout" className="w-6 h-6 fill-current" />
			<span>Log Out</span>
		</button>
	);
}
