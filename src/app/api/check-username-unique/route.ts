import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import {usernameValidation} from "@/schemas/signUpSchema";


const   UsernameUniqueSchema = z.object({
    username: usernameValidation
})

export async function GET (request: Request) {
    await dbConnect() 
    try {

        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get("username")
        }
        
        // validata with zod
       const result = UsernameUniqueSchema.safeParse(queryParam)
       console.log(result)    
    //    TODO : REMOVE
         if (!result.success) {
            
         }
        

    } catch (error) {
        console.error("error checking username unique", error)
        return Response.json({message: "error checking username unique",
            succees :false
        }, {status: 500})
        
    }


}