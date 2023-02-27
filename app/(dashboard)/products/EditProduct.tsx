'use client';
import CustomIcon from '@/components/Icon';
import Autocomplete from '@/components/Autocomplete';
import { getSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Category, Product } from '@/types';

const getCategories = async () => {
	const response = await fetcher({ url: `${process.env.NEXT_PUBLIC_API}/categories`, method: 'GET' });
	const data = await response.json();
	if (!response.ok) {
		const error = new Error(data.message);
		signOut();
		throw error;
	}
	return data;
};

export default function EditProduct({
	closeEditProduct,
	product,
	mutate,
}: {
	closeEditProduct: () => void;
	product: Product;
	mutate: () => void;
}) {
	const { data } = useSWR<Category[]>(`${process.env.NEXT_PUBLIC_API}/categories`, getCategories);
	const [categories, setCategories] = useState<Category[]>(product.categories);
	const [formData, setFormData] = useState({
		name: product.name,
		price: product.price,
		description: product.description,
		stock: product.stock,
	});

	const handleSelect = (category: Category) => {
		setCategories((prev) => [...prev, category]);
	};
	const handleDelete = async (id: number) => {
		setCategories((prev) => prev.filter((category) => category.id !== id));
	};

	const [errors, setErrors] = useState<string[] | null>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const token = await getSession();
		const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${product.id}`, {
			cache: 'no-store',
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.access_token}`,
			},
			body: JSON.stringify({ ...formData, categories: categories.map((category) => category.id) }),
		});
		const data = await response.json();
		if (response.ok) {
			mutate();
			closeEditProduct();
		}
		setErrors(data.message);
	};
	return (
		<div className="flex flex-col gap-2 ">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
							Name
						</label>
						<input
							type="text"
							id="name"
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							value={formData.name}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
					<div>
						<label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">
							Description
						</label>
						<input
							type="text"
							id="description"
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							value={formData.description}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
					<div>
						<label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">
							Price
						</label>
						<input
							type="text"
							id="price"
							onChange={(e) => setFormData({ ...formData, price: e.target.value })}
							value={formData.price}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
					<div>
						<label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 ">
							Initial Stock
						</label>
						<input
							type="number"
							id="stock"
							onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
							value={formData.stock}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5 "
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-900 ">Categories</label>
						{data && (
							<Autocomplete
								options={data.filter((d) => !categories.some((c) => c.id === d.id))}
								handleSelect={handleSelect}
							/>
						)}
					</div>
					<div className="flex flex-wrap my-3 gap-1">
						{categories.map(({ name, id }) => (
							<span
								key={id}
								className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200   rounded px-4 py-2 font-bold leading-loose "
							>
								{name}
								<button className="ml-4 hover:bg-gray-300" onClick={() => handleDelete(id)}>
									<CustomIcon icon="carbon:close" className="h-4 w-4 " />
								</button>
							</span>
						))}
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
					<button className="py-1 px-3 bg-rose-400 text-white rounded-md" onClick={closeEditProduct}>
						<CustomIcon icon="carbon:close" className="w-6 h-6 fill-current" />
					</button>
				</div>
			</form>
			<hr className="py-2" />
		</div>
	);
}
