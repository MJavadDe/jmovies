

import z from "zod"

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const schema = z.object({
    email: z.string().email(),
    password:z.string().min(8).max(20)
})


export const loginAction = async (prevState: string, formData: FormData) => {
    const data = {
        email: formData.get('username'),
        password:`${formData.get("password")}`
    }
    const isFormValid = schema.safeParse(data)

    console.log(data.email);
    

    

    if (!isFormValid.success) {
        console.log(isFormValid.error.flatten());
        const messages = Object.values(isFormValid.error.flatten().fieldErrors)
        return {
            message: messages,
        }
    }

    const loginReq = await signIn("credentials", { username: data.email, password: data.password,redirect:false})

    console.log(loginReq)
    if (!loginReq?.ok) {
        const errorMessage = "wrong Information (password or username)"
        return {
            message:errorMessage
        }
    }


    return {
        message: "Successfuly LOGED IN",
        redirect:redirect("/home")
    }
    

    // const user = await prisma.user.findUnique({ where: { email: `${data.email}` } })
    
    // if (!user) {
    //     return {
    //         message:"No user was found with this username"
    //     }
    // }

    // const isPasswordCorrect = bcrypt.compare(data.password, user.password!)


    // return isPasswordCorrect 
    

};
