'use client';
import CustomIcon from '@/components/Icon';
interface Product {
	id: number;
	name: string;
	price: string;
	description: string;
	stock: number;
}
interface Props {
	data: Product[];
	columns: string[];
	handleDelete: (id: number) => void;
	handleEdit: (product: Product) => void;
}
export default function ProductsTable({ data, columns, handleDelete, handleEdit }: Props) {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full text-sm text-left text-gray-500">
				<thead className="text-sm text-gray-400  bg-gray-50 border-b-2">
					<tr>
						{columns.map((column) => (
							<th scope="col" className="px-3 py-3 text-left" key={column}>
								{column}
							</th>
						))}

						<th scope="col" className="px-6 py-3 text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{data.map((product: Product) => (
						<tr key={product.name}>
							<td className="text-left p-3">
								<span>{product.name}</span>
							</td>
							<td className="text-left p-3">
								<span>{product.description}</span>
							</td>
							<td className="text-left p-3">
								<span>{product.price}</span>
							</td>
							<td className="text-left p-3">
								<span>{product.stock}</span>
							</td>
							<td className="py-3">
								<div className="flex items-center justify-center gap-4">
									<button onClick={() => handleDelete(product.id)}>
										<CustomIcon icon="carbon:trash-can" className="w-5 h-5 text-gray-500" />
									</button>
									<button onClick={() => handleEdit(product)}>
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
