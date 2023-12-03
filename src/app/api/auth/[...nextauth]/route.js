import dbConnect from "@/db";
import ExternelUser from "@/modules/users/externel-users.model";
import User from "@/modules/users/users.model";
import passwordMatcher from "@/utils/passwordMatcher";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(creds) {
                await dbConnect();
                try {
                    const user = await User.findOne({ username: creds.username });
                    if (user) {
                        const isPasswordCorrect = await passwordMatcher(creds.password, user.hashedPassword);
                        if (isPasswordCorrect) {
                            return user;
                        }
                    }
                } catch (err) {
                    throw new Error(err);
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

    ],
    callbacks: {
        async signIn({ user, account }) {
            console.log(user, account);
            if (account.provider === 'credentials') {
                return true;
            }
            else {
                await dbConnect();
                try {
                    const existing = await User.find({ email: user?.email || "anonymous@gmail.com" });
                    if (existing) {
                        return true;
                    }
                    await ExternelUser.findOneAndUpdate({ email: user?.email || "anonymous@gmail.com" }, user, { upsert: true });

                    return true;
                } catch (err) {
                    console.log('error in route.ts 50 line', err);
                    return false;
                }
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
        ,
        async session({ session, token, user }) {
            session.user = token.user;
            return session;
        },
    }
};


export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };