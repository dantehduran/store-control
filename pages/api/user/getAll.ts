import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		await handleGET(res, req);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}

// GET /api/user
async function handleGET(res: NextApiResponse, req: NextApiRequest) {
	const users = await prisma.user.findMany({
		select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
	});
	res.json(users);
}
