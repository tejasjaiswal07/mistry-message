import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";


export async function POST(request: Request){
     await dbConnect();

     const session = await getServerSession(authOptions)
     const user: User  = session?.user as User

     if(!session || !session.user){
        return Response.json({
            success : false,
            message: "Not Authnticated"
        },{
            status: 401})
        }


        const userID = user._id;
        const {acceptMessages} = await request.json()



        try {
           const updatedUser = await UserModel.findByIdAndUpdate(userID, {isAcceptingMessage: acceptMessages}, {new: true})
            if(!updatedUser){
                return Response.json({
                    success : false,
                    message: "failed to updates users status to accept messages"
                },{status: 500 })
            }
            return Response.json({
                success : true,
                message: "User status updated to accept messages",
                updatedUser
            },{status: 200 }) 
        } catch (error) {

            console.log("failed to updates users status to accept messages")
            return Response.json({
                success : false,
                message: "failed to updates users status to accept messages"
            },{status: 500 })
            
        }

}

export async function GET(request: Request){
    await dbConnect();
    const session = await getServerSession(authOptions)
    const user: User  = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success : false,
            message: "Not Authnticated"
        },{
            status: 401})
        }


        const userID = user._id;
        try {
            const foundUser = await UserModel.findById(userID)
            if(!foundUser){
                return Response.json({
                    success : false,
                    message: "User not found"
                },{status: 404})
            }
            return Response.json({
                success : true,
                message: "User found",
                isAcceptingMessages: foundUser.isAcceptingMessage
            },{status: 200}) 
        } catch (error) {
            console.log("failed to find user")
            return Response.json({
                success : false,
                message: "failed to find user"
            },{status: 500})
            
        }
}
