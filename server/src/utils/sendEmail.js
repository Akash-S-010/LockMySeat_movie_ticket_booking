import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (email, type, data) => {
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

        let subject, text, html;

        switch (type) {
            case "otp":
                subject = "OTP Verification - LockMySeat";
                text = `Your OTP is: ${data.otp}`;
                html = `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #fd5479; font-weight: bold;">LockMySeat</h2>
                        <p>Hello,</p>
                        <p>Your One-Time Password (OTP) for registration is:</p>
                        <h2 style="color: #ffffff; font-weight: bold; letter-spacing: 5px; background-color: #242b33; display: inline-block; padding: 10px 20px; border-radius: 4px;">
                            ${data.otp}
                        </h2>
                        <p>This OTP is valid for <strong>3 minutes</strong>.</p>
                        <p>If you did not request this, please ignore this email.</p>
                        <hr>
                        <p>Best Regards, <br> <strong>LockMySeat Team</strong></p>
                    </div>
                `;
                break;

            case "reset":
                subject = "Password Reset Request - LockMySeat";
                text = `Click here to reset your password: ${data.resetUrl}`;
                html = `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #fd5479; font-weight: bold;">LockMySeat</h2>
                        <p>Hello,</p>
                        <p>You requested a password reset. Click the link below to reset your password:</p>
                        <a href="${data.resetUrl}" style="color: #fd5479; font-weight: bold; text-decoration: none;">Reset Password</a>
                        <p>This link is valid for <strong>10 minutes</strong>.</p>
                        <p>If you did not request this, please ignore this email.</p>
                        <hr>
                        <p>Best Regards, <br> <strong>LockMySeat Team</strong></p>
                    </div>
                `;
                break;

            case "booking":
                const { movieName, theaterName, location, showTime, showDate, selectedSeats, totalPrice } = data;
                subject = "Your Booking Confirmation - LockMySeat";
                text = `Your booking is confirmed! Movie: ${movieName}, Theater: ${theaterName}, Location: ${location}, Show Time: ${showTime}, Date: ${showDate}, Seats: ${selectedSeats.join(", ")}, Total Price: ₹${totalPrice}`;
                html = `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #fd5479; font-weight: bold; text-align: center;">LockMySeat</h2>
                        <h3 style="color: #242b33; text-align: center;">Booking Confirmation</h3>
                        <p>Hello,</p>
                        <p>Your booking has been successfully confirmed! Here are the details:</p>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr><td style="padding: 8px; font-weight: bold;">Movie:</td><td>${movieName}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Theater:</td><td>${theaterName}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Location:</td><td>${location}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Show Time:</td><td>${showTime}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Date:</td><td>${showDate}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Seats:</td><td>${selectedSeats.join(", ")}</td></tr>
                            <tr><td style="padding: 8px; font-weight: bold;">Total Price:</td><td>₹${totalPrice}</td></tr>
                        </table>
                        <p>Enjoy your movie!</p>
                        <hr>
                        <p>Best Regards, <br> <strong>LockMySeat Team</strong></p>
                    </div>
                `;
                break;

            default:
                throw new Error("Invalid email type");
        }

        await transporter.sendMail({
            from: `"LockMySeat Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            text,
            html,
        });

        console.log(`${type} email sent successfully!`);
    } catch (error) {
        console.error(`Error sending ${type} email:`, error);
        throw error;
    }
};

export default sendEmail;