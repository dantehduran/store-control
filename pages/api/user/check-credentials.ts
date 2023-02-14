import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';
const bcrypt = require('bcrypt');

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		await handlePOST(res, req);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}

const comparePassword = (hashPassword: string, unHashPassword: string) => {
	return bcrypt.compareSync(unHashPassword, hashPassword);
};

// POST /api/user
async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
	const user = await prisma.user.findUnique({
		where: { email: req.body.username },
		select: {
			id: true,
			name: true,
			email: true,
			image: true,
			password: true,
		},
	});
	if (user && comparePassword(user.password, req.body.password)) {
		const { password: _, ...userWithoutPassword } = user;
		res.json(userWithoutPassword);
	} else {
		res.status(400).end('Invalid credentials');
	}
}
