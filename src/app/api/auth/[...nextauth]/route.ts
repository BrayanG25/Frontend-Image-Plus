import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"}
            },
            authorize(credentials, req) {
                console.log(req);
                console.log(credentials);
                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };