import nodemailer from "nodemailer";

interface EmailConfig {
  email: string;
  emailType: string;
  id: string;
}

export async function SendEmail({ email,emailType,id }: EmailConfig) {


  
  try {
    const transport = nodemailer.createTransport({
      host:"smtp.fowardemail.net",
      port:465,
      secure: true,
      auth:{
        user:"",
        pass:""
      },
    });

    const mailoptions=await transport.sendMail({
        from:'murtazasaleem2004@gmail.com',
        to:email,
        subject:emailType==="VERIFY"?"Verify your account":"Forget Password",
        html:"<br>Hello world</br>"
    })
    return mailoptions.response


  } catch (error:any) {
    throw new Error(error)
    console.log("Failed to send mail", error);
  }
}
