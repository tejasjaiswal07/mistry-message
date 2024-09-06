import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(username: string, otp: string): Promise<ApiResponse> {
    try{
        
        await resend.emails.send({
            from: 'tejasjaiswal25@gmail.com',
            to: email,
            subject: 'MISTRY MESSAGE | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
        });
        
        return {
            success: true,
            message: "Verification email sent successfully",
        };
    }
    catch(emailError){
        console.log("ERROR SENDING VERIFICATION EMAIL", emailError);
        return{
            success: false,
            message: "Error sending verification email",
        };
    };
}

