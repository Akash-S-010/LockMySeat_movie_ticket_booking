import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, subject, text) => {
    try {
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text,
          });

    } catch (error) {
        console.log("Error sending email",error);
    }
}

export default sendEmail