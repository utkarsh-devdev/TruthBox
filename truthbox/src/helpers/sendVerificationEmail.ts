import { resend } from "@/lib/resend";
import VerificationEmailTemplate  from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
export async function sendVerificationEmail(username: string, email: string, verifyCode: string): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code for TruthBox',
            react: VerificationEmailTemplate({username: username, otp: verifyCode})
        });
        return {success: true, message: "Verification email sent successfully"};
    }
    catch (emailError){
        console.error("Error sending verification email:", emailError);
        return {
            success: false,
            message: "Failed to send verification email. Please try again later."
        }
    }
}