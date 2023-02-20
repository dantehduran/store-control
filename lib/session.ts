import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

// Getting the session in Next13 app/ directory
// https://next-auth.js.org/configuration/nextjs#in-app-directory
export async function getSession() {
	return await getServerSession(authOptions);
}

export async function getCurrentUser() {
	const session = await getSession();
	const response = await fetch(`${process.env.SERVER_BASE_URL}/users/me`, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.access_token}`,
		},
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	}
	return null;
}

export async function getToken() {
	const session = await getSession();
	return session?.access_token;
}
