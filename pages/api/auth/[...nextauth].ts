import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prismadb';
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'test@prisma.io' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials as { email: string; password: string };
				const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/check-credentials`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email,
						password,
					}),
				});
				const user = await res.json();
				if (res.ok && user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			return { ...token, ...user };
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.user = token;

			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
	secret: process.env.SECRET,
};

export default NextAuth(authOptions);
