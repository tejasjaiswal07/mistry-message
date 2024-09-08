import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";



export async function POST(request: Request) {
    await dbConnect();
    const data = await request.json();
    try {
        const {username, email,  passsword } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne(
            {
                username,
                isVerified: true
            }
        )
        
        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists",
                    status: 400
                
                }
            )
        }

        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                        success: false,
                        message: "User already exists",
                        email, 
                        status: 400
                    }
                )
            }
            else{
                const hashedPassword = await bcrypt.hash(passsword, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();

            }
            
            // todo back here            
        }
        else {
            
            const hashedPassword = await bcrypt.hash(passsword, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
        
           const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAccepting: true,
                messages: []
            })
            await newUser.save();
        }

        // send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if(!emailResponse.success){
            return Response.json(
                {
                    success: false,
                    message: "Error sending verification email",
                    
                }, {status: 500}
            )
        }
        return Response.json(
            {
                success: true,
                message: "User registered successfully",
            }
        )
      

    } catch (error) {
        console.error("Error registering the user", error)
        return Response.json(
            {
            success: false,
            message: "Error registering the user",
           },
           {
               status: 500
           }
      );
        
   }


}