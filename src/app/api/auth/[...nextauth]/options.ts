import { NextAuthOptions, Session, Token } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { string } from "zod";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }

                        ]});
                        if(!user) {
                            throw new Error("No user found");
                        }
                        if(!user.isVerified) {
                            throw new Error("Please verify your email");
                        }
                    
                      const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                        if(isPasswordCorrect) {
                            return user;
                        }
                        else {
                            throw new Error("Incorrect password");
                        }
                } catch (error : any) {
                    if (error) {
                        throw new Error(error);
                    }
                    
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.isAcceptingMessages = user.isAcceptingMessages;

            }
            return token;
        },
        async Session({ session, token }: { session: Session; token: Token }) {
            if
            (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }
    },

    pages: { 
        signIn: "sign-in"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

}
}