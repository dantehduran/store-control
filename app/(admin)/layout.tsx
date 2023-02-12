import CustomIcon from '@/components/Icon';
import Link from 'next/link';

const sidebarLinks = [
	{ name: 'Overview', icon: 'carbon:overlay' },
	{ name: 'Products', icon: 'carbon:product' },
	{ name: 'Analytics', icon: 'carbon:analytics' },
	{ name: 'Schedule', icon: 'carbon:calendar-heat-map' },
	{ name: 'Settings', icon: 'carbon:settings' },
	{ name: 'Logout', icon: 'carbon:logout' },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
			<aside className="py-6 px-10 w-64 border-r border-gray-200">
				<CustomIcon
					icon="carbon:carbon-for-ibm-product"
					className="flex justify-center items-center w-28 text-teal-500 mx-auto"
				/>
				<ul className="flex flex-col gap-y-6 pt-20">
					{sidebarLinks.map((link) => (
						<li key={link.name}>
							<Link href={'/'} className="flex gap-x-4 items-center py-2 text-gray-500 hover:text-teal-600 group">
								<span className="absolute w-1.5 h-8 bg-teal-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
								<CustomIcon icon={link.icon} className="w-6 h-6 fill-current" />
								<span>{link.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</aside>
			{children}
		</div>
	);
}
