import {z} from "zod"

export const signInSchems  = z.object({
    content: z.string()
    .min(10, {message: "content should be atleast of 10 characters"})
    .max(300, {message: "content must not be longer than 300 words"})





})