import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from 'bcryptjs'

const schema = z.object({
    email: z.string().email(),
    password:z.string().min(8).max(20),
})
export async function POST(request:NextRequest) {
    const body = await request.json()

    const isValid = schema.safeParse(body)

    if (!isValid.success) {
        return NextResponse.json(isValid.error.errors,{status:400})
    }

    const duplicateUser = await prisma.user.findUnique({ where: { email: body.email } })

    if (duplicateUser) {
        return NextResponse.json({message: "User already exists"}, {status:400})
    }

    const password = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
        data: {
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password,
        },
    })

    return NextResponse.json(user,{status:201})

}