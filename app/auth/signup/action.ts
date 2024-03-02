'use server'
import { schema } from "../schema";
import prisma from "@/prisma/client";
export async function submitForm(prevState:any,formData: FormData) {

    const inputValues = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    const isValid = schema.safeParse(inputValues)

    if (!isValid.success) {
        return {
            message:isValid.error.flatten().fieldErrors
        }
    }
    
    const duplicateUser = await prisma.user.findUnique({ where: { email: `${inputValues.email}` } })

    if (duplicateUser) {
        return {
            message:"User Already Exists"
        }
    }

    const createdUserRes = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
        method: "POST",
        body:JSON.stringify(inputValues)
    })
    const createdUser = await createdUserRes.json()

    if (!createdUser) {
        return {
            message:"Something went wrong"
        }
    }

    return createdUser
}