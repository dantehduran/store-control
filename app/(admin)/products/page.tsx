'use client';
import CustomIcon from '@/components/Icon';
import { useState } from 'react';
import AddProduct from './AddProduct';

export default function ProductsPage() {
	const [addActive, setAddActive] = useState(false);
	return (
		<div className="flex flex-col px-10">
			<div className="flex items-center justify-between py-7">
				<div>
					<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Products</h1>
					<p className="text-sm font-medium text-gray-500">Create your product and upload here</p>
				</div>
				<button
					onClick={() => setAddActive(true)}
					className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
				>
					<CustomIcon icon="carbon:add" className="w-6 h-6 fill-current" />
					<span className="text-sm font-semibold tracking-wide">Create Item</span>
				</button>
			</div>
			<hr className="py-2" />
			{addActive && <AddProduct closeAddProduct={() => setAddActive(false)} />}
		</div>
	);
}
