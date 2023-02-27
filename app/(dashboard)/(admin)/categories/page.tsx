'use client';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import EditCategory from './EditCategory';
import AddCategory from './AddCategory';
import Table from '@/components/Table';
import fetcher from '@/lib/fetcher';
import { Category } from '@/types';
import Pagination from '@/components/Pagination';

const columns = [
	{
		name: 'Name',
		key: 'name',
	},
];

const getCategories = async (url: string) => {
	const response = await fetcher({ url, method: 'GET' });
	const data = await response.json();
	if (!response.ok) {
		const error = new Error(data.message);
		signOut();
		throw error;
	}
	return data;
};
let pageSize = 10;
export default function CategoryPage() {
	const [addActive, setAddActive] = useState(false);
	const [editActive, setEditActive] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [category, setCategory] = useState<Category | null>(null);
	const handleDelete = async (id: number) => {
		await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/categories/${id}`, method: 'DELETE' });
		mutate();
	};
	const handleEdit = async (category: Category) => {
		setEditActive(true);
		setCategory(category);
	};
	const { data, isLoading, error, mutate } = useSWR<{ rows: Category[]; totalCount: number }>(
		`${process.env.NEXT_PUBLIC_API}/categories?currentPage=${currentPage}&limit=${pageSize}`,
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
			{addActive && <AddCategory closeAddCategory={() => setAddActive(false)} mutate={mutate} />}
			{editActive && category != null && (
				<EditCategory closeEditCategory={() => setEditActive(false)} category={category} mutate={mutate} />
			)}
			{isLoading && <span>loading</span>}
			{error && data === undefined && <span>{error}</span>}

			<Table data={data?.rows || []} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit} />

			<div className="flex justify-end mt-8">
				<Pagination
					currentPage={currentPage}
					totalCount={data?.totalCount || 0}
					pageSize={pageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
		</div>
	);
}
