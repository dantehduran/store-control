'use client';
import CustomIcon from '@/components/Icon';
import { getSession } from 'next-auth/react';
import useSWR from 'swr';
interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	stock: number;
}
const getProducts = async () => {
	const token = await getSession();
	const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products`, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token?.access_token}`,
		},
	});
	const data = await response.json();
	return data;
};
export default function ProductsTable() {
	const handleDelete = async (id: number) => {
		const token = await getSession();
		await fetch(`${process.env.NEXT_PUBLIC_API}/products/${id}`, {
			cache: 'no-store',
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token?.access_token}`,
			},
		});
		mutate();
	};
	const { data, isLoading, error, mutate } = useSWR<Product[]>(`${process.env.NEXT_PUBLIC_API}/products`, getProducts);
	if (isLoading) return <span>loading</span>;
	if (error) return <span>{error}</span>;
	else
		return (
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-sm text-gray-400  bg-gray-50 border-b-2">
						<tr>
							<th scope="col" className="px-3 py-3 text-left">
								Name
							</th>
							<th scope="col" className="py-3 text-left">
								Description
							</th>
							<th scope="col" className="py-3 text-right">
								Price
							</th>
							<th scope="col" className="py-3 text-right">
								Stock
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{data &&
							data?.map((product: Product) => (
								<tr key={product.name}>
									<td className="text-left p-3">
										<span>{product.name}</span>
									</td>
									<td className="text-left py-3">
										<span>{product.description}</span>
									</td>
									<td className="text-right py-3">
										<span>{product.price}</span>
									</td>
									<td className="text-right py-3">
										<span>{product.stock}</span>
									</td>
									<td className="py-3">
										<div className="flex items-center justify-center gap-4">
											<button onClick={() => handleDelete(product.id)}>
												<CustomIcon icon="carbon:trash-can" className="w-5 h-5 text-gray-500" />
											</button>
											<button>
												<CustomIcon icon="carbon:edit" className="w-5 h-5 text-gray-500" />
											</button>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		);
}
