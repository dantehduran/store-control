'use client';
import { format } from 'date-fns';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import Table from '@/components/Table';
import fetcher from '@/lib/fetcher';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { User } from '@/types';

const columns = [
	{
		name: 'Username',
		key: 'username',
	},
	{
		name: 'Full Name',
		key: 'fullName',
	},
	{
		name: 'Created At',
		key: 'createdAt',
		accessor: (value: string) => format(new Date(value), 'dd/MM/yyyy'),
	},
];
const getUsers = async () => {
	const response = await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/users`, method: 'GET' });
	const data = await response.json();
	if (!response.ok) {
		const error = new Error(data.message);
		signOut();
		throw error;
	}
	return data;
};

export default function UsersPage() {
	const [addActive, setAddActive] = useState(false);
	const [editActive, setEditActive] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const handleDelete = async (id: number) => {
		await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/users/${id}`, method: 'DELETE' });
		mutate();
	};
	const handleEdit = async (user: User) => {
		setEditActive(true);
		setUser(user);
	};
	const { data, isLoading, error, mutate } = useSWR<User[]>(`${process.env.NEXT_PUBLIC_API}/users`, getUsers);
	return (
		<div className="flex flex-col px-10">
			<div className="flex items-center justify-between py-7">
				<div>
					<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Users</h1>
					<p className="text-sm font-medium text-gray-500">Create your users here</p>
				</div>
				<button
					onClick={() => setAddActive((prev) => !prev)}
					className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
				>
					<CustomIcon icon="carbon:add" className="w-6 h-6 fill-current" />
					<span className="text-sm font-semibold tracking-wide">Create Item</span>
				</button>
			</div>
			<hr className="py-2" />
			{addActive && <AddUser closeAddUser={() => setAddActive(false)} />}

			{editActive && user != null && <EditUser closeEditUser={() => setEditActive(false)} user={user} />}
			{isLoading && <span>loading</span>}
			{error && data === undefined && <span>{error}</span>}
			{!error && !isLoading && (
				<Table data={data || []} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit} />
			)}
		</div>
	);
}
