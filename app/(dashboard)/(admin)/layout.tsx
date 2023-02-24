import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const user = await getCurrentUser();
	if (user.username !== 'admin') {
		redirect('/');
	}
	return <>{children}</>;
}
