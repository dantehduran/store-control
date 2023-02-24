import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { username, password } = credentials as { username: string; password: string };
				const res = await fetch(`${process.env.SERVER_BASE_URL}/auth/signin`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username,
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
		maxAge: 86400,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.access_token = user.access_token;
				token.username = user.username;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			if (token) {
				session.access_token = token.access_token;
				session.username = token.username;
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export default NextAuth(authOptions);
