import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

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

        const userID = new mongoose.Types.ObjectId(user._id);


}