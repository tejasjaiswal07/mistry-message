import {z} from "zod"


export const usernameValidation = z.string()
    .min(2 ,"username must be atleast 2 character")
    .max(20, "username should not be more than 20 charcters")
    .regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/, "username should not contain special characters")
    


    export const signUpSchemas = z.object({
        username: usernameValidation,
        email: z.string().email({message: "invalid message"}),
        password: z.string().min(6,{message: "passoword must be atleast of 6 letters"}),


        


    })