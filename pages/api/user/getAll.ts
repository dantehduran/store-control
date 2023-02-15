import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	// const session = await getServerSession(req, res, authOptions);
	// console.log(session);
	// if (!session) {
	// 	return res.status(401).json({ message: 'Please signin.' });
	// }
	if (req.method === 'GET') {
		await handleGET(res, req);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}

// GET /api/user
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
	const user = await prisma.user.findMany({
		select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
	});
	res.json(user);
}
