import { User } from "@/models/User/User.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

interface EmailConfig {
  email: string;
  emailType: string;
  id: string;
}

export async function SendEmail({ email, emailType, id }: EmailConfig) {
  try {

       const newhashedToken=await bcrypt.hash(String(id),10)
      //So what is happening here 
      // I take id from params then from that i find user and update the field of verifytoken: mynewgeneratedtoken
      // I take id from params then from that i find user and update the field of passwordrecovery: passwordrecoverytoken
      // and also send email to user for the that token

    if(emailType==="VERIFY"){
      const dbincomingUser=await User.findByIdAndUpdate(id,{
        VerifyToken:newhashedToken
      })
      dbincomingUser.save()
    }
    else if(emailType==="RESET"){
      const dbincomingUser=await User.findByIdAndUpdate(id,{
        ForgetPasswordToken:newhashedToken
      })
      dbincomingUser.save()
    }
    
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user:process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    const mailoptions = await transport.sendMail({
      from: "murtazasaleem2004@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your account" : "Forget Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${newhashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${newhashedToken}
            </p>`,
    });
    return mailoptions.response;
  } catch (error) {
    console.log("Failed to send mail", error);
    throw new Error(error);
  }
}
