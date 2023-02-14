import CustomIcon from '@/components/Icon';
const users = [
	{ name: 'John', email: 'john@example.com', role: 'admin', dateAdded: '2022-01-01', lastActive: '2022-01-10' },
	{ name: 'Jane', email: 'jane@example.com', role: 'user', dateAdded: '2022-01-01', lastActive: '2022-01-10' },
	{ name: 'Jack', email: 'jack@example.com', role: 'user', dateAdded: '2022-01-01', lastActive: '2022-01-10' },
];
export default function UsersPage() {
	return (
		<div className="flex flex-col px-10">
			<div className="flex items-center justify-between py-7 ">
				<div>
					<h1 className="text-2xl font-semibold leading-relaxed text-gray-800">Users</h1>
					<p className="text-sm font-medium text-gray-500">Manage your users and their account permissions here.</p>
				</div>
				<button className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1">
					<CustomIcon icon="carbon:add" className="w-6 h-6 fill-current" />
					<span className="text-sm font-semibold tracking-wide">Create User</span>
				</button>
			</div>
			<hr className="py-2" />
			<div className="md:grid md:grid-cols-3 md:gap-6 ">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Admin users</h3>
						<p className="mt-1 text-sm text-gray-600">
							Admins can add and remove users, and manage organization-level settings.
						</p>
					</div>
				</div>
				<div className="md:col-span-2">
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
								{users.map((user) => (
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
											<span>{user.dateAdded}</span>
										</td>
										<td className="text-right py-3">
											<span>{user.lastActive}</span>
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
				</div>
			</div>
			<br />
			<hr className="py-4 " />
			<div className="md:grid md:grid-cols-3 md:gap-6 pb-10">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Account users</h3>
						<p className="mt-1 text-sm text-gray-600">Account users can add and edit items.</p>
					</div>
				</div>
				<div className="md:col-span-2">
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
								{users.map((user) => (
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
											<span>{user.dateAdded}</span>
										</td>
										<td className="text-right py-3">
											<span>{user.lastActive}</span>
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
				</div>
			</div>
		</div>
	);
}
