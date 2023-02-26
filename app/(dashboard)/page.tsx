'use client';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
// import EditCategory from './EditCategory';
// import AddCategory from './AddCategory';

import Table from '@/components/Table';
import fetcher from '@/lib/fetcher';
import { format } from 'date-fns';
import AddRecord from './(admin)/AddRecord';
import { User } from '@/types';
interface Record {
	id: number;
	createdAt: string;
	type: 'INCREMENT' | 'DECREMENT';
	amount: number;
	user: any;
	product: any;
}

const columns = [
	{
		name: 'Date',
		key: 'createdAt',
		accessor: (value: string) => format(new Date(value), 'dd/MM/yyyy'),
	},
	{
		name: 'Type',
		key: 'type',
		accessor: (value: any) => (
			<div className={`text-sm text-white uppercase ${value === 'INCREMENT' ? 'bg-teal-500' : 'bg-rose-400'}`}>
				{value === 'INCREMENT' ? 'in' : 'out'}
			</div>
		),
	},
	{
		name: 'Product',
		key: 'product',
		accessor: (product: any) => product.name,
	},
	{
		name: 'Amount',
		key: 'amount',
	},
	{
		name: 'Created By',
		key: 'user',
		accessor: (user: User) => user.username,
	},
];

const getRecords = async () => {
	const response = await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/records`, method: 'GET' });
	const data = await response.json();
	if (!response.ok) {
		const error = new Error(data.message);
		signOut();
		throw error;
	}
	return data;
};
export default function Home() {
	const [addActive, setAddActive] = useState(false);
	const [editActive, setEditActive] = useState(false);
	const [record, setRecord] = useState<Record | null>(null);
	const handleDelete = async (id: number) => {
		await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/records/${id}`, method: 'DELETE' });
		mutate();
	};

	const { data, isLoading, error, mutate } = useSWR<Record[]>(`${process.env.NEXT_PUBLIC_API}/records`, getRecords);
	return (
		<div className="flex flex-col px-10">
			<div className="flex items-center justify-between py-7">
				<div>
					<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Records</h1>
					<p className="text-sm font-medium text-gray-500">Create your records here</p>
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
			{addActive && <AddRecord closeAddRecord={() => setAddActive(false)} />}
			{isLoading && <span>loading</span>}
			{error && data === undefined && <span>{error}</span>}
			{!error && !isLoading && <Table data={data || []} columns={columns} handleDelete={handleDelete} />}
		</div>
	);
}

