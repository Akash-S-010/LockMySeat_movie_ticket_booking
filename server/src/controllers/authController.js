import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";



// ------------User Signup------------
export const userSignup = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // -----hash password--------
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ------generate otp--------
        const otp = Math.floor(100000 + Math.random() * 900000);

        // ------otp expire time ( 2 min )------
        const otpExpires = Date.now() + 2 * 60 * 1000;

        const newUser = new User({ name, email, password: hashedPassword, role, otp, otpExpires });
        await newUser.save();

        //--------- Send OTP via email------------
        await sendEmail(email, "Lock My Seat", `Your OTP for registration: ${otp}`);

        res.json({ message: "OTP sent to your email. Please verify to complete registration." });

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }

}