import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
const bcrypt = require('bcrypt');

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: 'Please signin to create a user.' });
	}
	if (req.method === 'POST') {
		await handlePOST(res, req);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}

const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

// POST /api/user
async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
	const user = await prisma.user.create({
		data: { ...req.body, password: await hashPassword(req.body.password) },
	});
	res.json(user);
}
