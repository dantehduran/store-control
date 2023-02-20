import CustomIcon from '@/components/Icon';

type User = {
	name?: string;
	email: string;
	id: string;
	createdAt: string;
	updatedAt: string;
};

export default function UsersTable() {
	const data = [
		{
			name: 'John Doe',
			email: 'jd@jd.com',
			id: '1',
			createdAt: '2022-01-01',
			updatedAt: '2022-01-01',
		},
	];
	return (
		<div className="relative overflow-x-auto">
			<table className="w-full text-sm text-left text-gray-500">
				<thead className="text-sm text-gray-400  bg-gray-50 border-b-2">
					<tr>
						<th scope="col" className="p-4">
							<div className="flex items-center">
								<input
									id="checkbox-all-search"
									type="checkbox"
									className="w-4 h-4 text-rose-500 bg-gray-100 border-gray-300 rounded focus:ring-rose-400 focus:ring-2"
								/>
								<label htmlFor="checkbox-all-search" className="sr-only">
									checkbox
								</label>
							</div>
						</th>
						<th scope="col" className=" py-3 text-left">
							Name
						</th>
						<th scope="col" className="py-3 text-right">
							Date added
						</th>
						<th scope="col" className="py-3 text-right">
							Last active
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{data?.map((user: User) => (
						<tr key={user.email}>
							<td className="p-4 ">
								<div className="flex items-center">
									<input
										id="checkbox-all-search"
										type="checkbox"
										className="w-4 h-4 text-rose-500 bg-gray-100 border-gray-300 rounded focus:ring-rose-400 focus:ring-2"
									/>
									<label htmlFor="checkbox-all-search" className="sr-only">
										checkbox
									</label>
								</div>
							</td>
							<td className="py-3 ">
								<div className="flex flex-col gap-1">
									<span className="text-base font-medium text-gray-700">{user.name}</span>
									<span>{user.email}</span>
								</div>
							</td>
							<td className="text-right py-3">
								<span>{user.createdAt}</span>
							</td>
							<td className="text-right py-3">
								<span>{user.updatedAt}</span>
							</td>
							<td className="py-3">
								<div className="flex items-center justify-center gap-4">
									<button>
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
