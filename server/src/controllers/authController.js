import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/token.js";



// ------------User Signup------------
export const signup = async (req, res) => {

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

        const newUser = new User({ name, email, password: hashedPassword, role, otp, otpExpires, isVerified: false });
        await newUser.save();

        //--------- Send OTP via email------------
        await sendEmail(email, "Lock My Seat", `Your OTP for registration: ${otp}`);

        res.json({ message: "OTP sent to your email. Please verify to complete registration." });

    } catch (error) {
        console.log("Error in signup",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



// ------------otp verification------------
export const verifyOTP = async (req, res) => {
    
    try {
        
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if(user.otp !== otp || Date.now() > user.otpExpires){
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // OTP verified, finalize registration
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "Registration successful." });

    } catch (error) {
        console.log("Error in verifying OTP",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });F
    }
};


// -----------user login------------
export const login = async (req, res) => {

    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified === false) {
            return res.status(400).json({ message: "Please verify your email before logging in." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        } 

        // Generate Token---------
        const token = generateToken(user._id, user.role);

        res.cookie("token", token)

        res.status(200).json({ message: "Login successful",user: { _id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        
    }
}
