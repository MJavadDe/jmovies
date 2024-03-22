import z  from "zod"

export const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username:z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8)
})