'use client';
import CustomIcon from '@/components/Icon';

interface Props {
	data: any[];
	columns: { name: string; key: string }[];
	handleDelete: (id: number) => void;
	handleEdit: (item: any) => void;
}
export default function Table({ data, columns, handleDelete, handleEdit }: Props) {
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full text-sm text-left text-gray-500">
				<thead className="text-sm text-gray-400  bg-gray-50 border-b-2">
					<tr>
						{columns.map((column) => (
							<th scope="col" className="px-3 py-3 text-left capitalize" key={column.name}>
								{column.name}
							</th>
						))}

						<th scope="col" className="px-6 py-3 text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{data.map((item, i) => (
						<tr key={i}>
							{Object.keys(item)
								.filter((a) => columns.some((c) => c.key === a))
								.map((key) => (
									<td className="text-left p-3" key={key}>
										<span>{item[key as keyof typeof item]}</span>
									</td>
								))}

							<td className="py-3">
								<div className="flex items-center justify-center gap-4">
									<button onClick={() => handleDelete(item.id)}>
										<CustomIcon icon="carbon:trash-can" className="w-5 h-5 text-gray-500" />
									</button>
									<button onClick={() => handleEdit(item)}>
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
