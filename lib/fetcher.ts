import { getSession } from 'next-auth/react';

interface Props {
	url: string;
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	body?: any;
	headers?: any;
}

export default async function fetcher({ url, ...rest }: Props) {
	const token = await getSession();
	const response = await fetch(url, {
		cache: 'no-store',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token?.access_token}`,
		},
		...rest,
	});
	return response;
}
