import { NextAuthOptions } from "next-auth";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import GoogleProvider from "next-auth/providers/google";

export const nextAuthConfig: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Information",

            credentials: {
                username: { label: "Email", type: "email", placeholder: "Enter Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) { 
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.username } })
                
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

                return passwordsMatch ? user : null;

        
            }
        },
        
        ),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy:"jwt"
    }
    
}