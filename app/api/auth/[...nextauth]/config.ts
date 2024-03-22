import { NextAuthOptions } from "next-auth";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import GoogleProvider from "next-auth/providers/google";

export const nextAuthConfig: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/auth"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { label: "Email", type: "email", placeholder: "Enter email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    // Check if both username and password are provided
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                    }
            
                    // Find the user by email (username)
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.username },
                    });
            
                    if (!user) {
                        // User not found
                        return null;
                    }
            
                    // Compare hashed passwords
                    const matchingPasswords = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
            
                    if (matchingPasswords) {
                        // Authentication successful
                        return user;
                    } else {
                        // Incorrect password
                        return null;
                    }
                } catch (error) {
                    // Handle any errors (e.g., database connection issues)
                    console.error('Error during authentication:', error);
                    return null;
                }
            }
            
        },
        
        ),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy:"jwt",
    }
    
}