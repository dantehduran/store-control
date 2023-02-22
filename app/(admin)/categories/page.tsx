'use client';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';
// import AddCategory from './AddCategory';
import { getSession, signOut } from 'next-auth/react';
import useSWR from 'swr';
// import EditCategory from './EditCategory';
import Table from '@/components/Table';
interface Category {
	id: number;
	name: string;
}

const columns = [
	{
		name: 'Name',
		key: 'name',
	},
	{
		name: 'Created At',
		key: 'createdAt',
	},
];

const getCategories = async () => {
	const token = await getSession();
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token?.access_token}`,
		},
	});
	const data = await response.json();
	if (!response.ok) {
		const error = new Error(data.message);
		signOut();
		throw error;
	}
	return data;
};
export default function CategoryPage() {
	const [addActive, setAddActive] = useState(false);
	const [editActive, setEditActive] = useState(false);
	const [caetegory, setCategory] = useState<Category | null>(null);
	const handleDelete = async (id: number) => {
		const token = await getSession();
		await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${id}`, {
			cache: 'no-store',
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.access_token}`,
			},
		});
		mutate();
	};
	const handleEdit = async (category: Category) => {
		setEditActive(true);
		setCategory(category);
	};
	const { data, isLoading, error, mutate } = useSWR<Category[]>(
		`${process.env.NEXT_PUBLIC_API}/categories`,
		getCategories
	);

	return (
		<div className="flex flex-col px-10">
			<div className="flex items-center justify-between py-7">
				<div>
					<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Categories</h1>
					<p className="text-sm font-medium text-gray-500">Create your category here</p>
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
			{/* {addActive && <AddCategory closeAddCategory={() => setAddActive(false)} />} */}
			{/* {editActive && category != null && <EditCategory closeEditCategory={() => setEditActive(false)} category={category} />} */}
			{isLoading && <span>loading</span>}
			{error && data === undefined && <span>{error}</span>}
			{!error && !isLoading && (
				<Table data={data || []} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit} />
			)}
		</div>
	);
}
