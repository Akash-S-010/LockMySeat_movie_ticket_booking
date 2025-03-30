import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, subject, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Lock My Seat Support" <${process.env.EMAIL_USER}>`, // More trustworthy sender name
            to: email,
            subject: subject,
            text: `Your OTP is: ${otp}`, 
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #fd5479; font-weight: bold;">Lock My Seat</h2>
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) for registration is:</p>
                    <h2 style="color: #ffffff; font-weight: bold; letter-spacing: 5px; background-color: #242b33; display: inline-block; padding: 10px 20px; border-radius: 4px;">
                        ${otp}
                    </h2>
                    <p>This OTP is valid for <strong>3 minutes</strong>.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <hr>
                    <p>Best Regards, <br> <strong>Lock My Seat Team</strong></p>
                </div>
            `,
        });

        console.log("✅ Email sent successfully!");
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};


export default sendEmail