import CustomIcon from '@/components/Icon';
import { getToken } from '@/lib/session';
import UsersTable from './UsersTable';

async function getData() {
	const token = await getToken();
	const response = await fetch(`${process.env.SERVER_BASE_URL}/users/me`, {
		cache: 'no-store',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export default async function UsersPage() {
	const me = await getData();
	const medata = JSON.stringify(me);
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
			{medata}

			<div className="md:grid md:grid-cols-3 md:gap-6 ">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Account users</h3>
						<p className="mt-1 text-sm text-gray-600">
							Admins can add and remove users, and manage organization-level settings.
						</p>
					</div>
				</div>
				<div className="md:col-span-2">
					<UsersTable />
				</div>
			</div>
		</div>
	);
}
