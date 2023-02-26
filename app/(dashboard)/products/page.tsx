'use client';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';
import AddProduct from './AddProduct';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import EditProduct from './EditProduct';
import Table from '@/components/Table';
import fetcher from '@/lib/fetcher';
import { Category, Product } from '@/types';

const columns = [
	{
		name: 'Name',
		key: 'name',
	},
	{
		name: 'Price',
		key: 'price',
	},
	{
		name: 'Description',
		key: 'description',
	},
	{
		name: 'Stock',
		key: 'stock',
	},
	{
		name: 'Categories',
		key: 'categories',
		accessor: (values: Category[]) => values.map((v) => v.name).join(', '),
	},
];

const getProducts = async () => {
	const response = await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/products`, method: 'GET' });
	const data = await response.json();
	if (!response.ok) {
		const error = new Error(data.message);
		signOut();
		throw error;
	}
	return data;
};
export default function ProductsPage() {
	const [addActive, setAddActive] = useState(false);
	const [editActive, setEditActive] = useState(false);
	const [product, setProduct] = useState<Product | null>(null);
	const handleDelete = async (id: number) => {
		await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/products/${id}`, method: 'DELETE' });
		mutate();
	};
	const handleEdit = async (product: Product) => {
		setEditActive(true);
		setProduct(product);
	};
	const { data, isLoading, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API}/products`, getProducts);

	return (
		<div className="flex flex-col px-10">
			<div className="flex items-center justify-between py-7">
				<div>
					<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Products</h1>
					<p className="text-sm font-medium text-gray-500">Create your product and upload here</p>
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
			{addActive && <AddProduct closeAddProduct={() => setAddActive(false)} />}
			{editActive && product != null && <EditProduct closeEditProduct={() => setEditActive(false)} product={product} />}
			{isLoading && <span>loading</span>}
			{error && data === undefined && <span>{error}</span>}
			{data && <Table data={data || []} columns={columns} handleDelete={handleDelete} handleEdit={handleEdit} />}
		</div>
	);
}
