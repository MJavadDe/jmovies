import z  from "zod"

export const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username:z.string().min(3),
    email: z.string().email({message:" is not valid"}),
    password: z.string().min(8,{message:" should be at least 8 characters"})
})