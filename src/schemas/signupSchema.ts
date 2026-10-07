import {z} from "zod";

export const signupSchema = z.object({
    username : z.string(),
    email : z.string(),
    address : z.string(),
    password:z.string(),
    category: z.string(),
    role:z.string()

})