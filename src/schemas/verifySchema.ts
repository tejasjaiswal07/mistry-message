import {z} from "zod"

export const signInSchems = z.object({

code: z.string().length(6, "verification code must be 6 digits")    

})