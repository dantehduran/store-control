import { Prisma, PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const userData = [
	{
		name: 'Jhon',
		email: 'jhon@prisma.io',
		password: '123456',
	},
	{
		name: 'Admin',
		email: 'admin@prisma.io',
		password: '123456',
	},
	{
		name: 'test',
		email: 'test@prisma.io',
		password: '123456',
	},
];

async function main() {
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.create({
			data: { ...u, password: await bcrypt.hash(u.password, 10) },
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
