import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/token.js";
import crypto from "crypto";
import cloudinaryUpload from "../utils/cloudinaryUploader.js";

const NODE_ENV = process.env.NODE_ENV





// ------------admin Signup------------
export const signup = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: "admin already exists" });
        }

        // -----hash password--------
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ------generate otp--------
        const otp = Math.floor(100000 + Math.random() * 900000);

        // ------otp expire time ( 2 min )------
        const otpExpires = Date.now() + 2 * 60 * 1000;

        const newAdmin = new Admin({ name, email, password: hashedPassword, otp, otpExpires, isVerified: false, role });
        await newAdmin.save();

        //--------- Send OTP via email------------
        await sendEmail(email, "otp", { otp });

        res.json({ message: "OTP sent to your email. Please verify to complete registration." });

    } catch (error) {
        console.error("Error in signup",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



// ------------otp verification------------
export const verifyOTP = async (req, res) => {
    
    try {
        
        const { email, otp } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "admin not found" });
        }

        if(admin.otp !== otp || Date.now() > admin.otpExpires){
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // OTP verified, finalize registration
        admin.isVerified = true;
        admin.otp = null;
        admin.otpExpires = null;
        await admin.save();

        res.json({ message: "Registration successful." });

    } catch (error) {
        console.error("Error in verifying OTP",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });F
    }
};




// -----------Resent OTP------------
export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "admin not found" });
        }

        if (admin.isVerified) {
            return res.status(400).json({ message: "admin is already verified." });
        }

        // ---------Generate new OTP------------
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = Date.now() + 2 * 60 * 1000; // Set expiration time

        admin.otp = otp;
        admin.otpExpires = otpExpires;
        await admin.save();

        // -----------Send OTP via email-----------
        await sendEmail(email, "Lock My Seat", `Your new OTP for registration: ${otp}`);

        res.json({ message: "New OTP sent to your email." });

    } catch (error) {
        console.error("Error in resending OTP", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





// -----------admin login------------
export const login = async (req, res) => {

    try {
        
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "admin not found" });
        }

        if (admin.isVerified === false) {
            return res.status(400).json({ message: "Please verify your email before logging in." });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        } 

        // Generate Token---------
        const token = generateToken(admin._id, admin.role);

        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });

        res.status(200).json({ message: "Login successful",data: {_id: admin._id, name: admin.name, email: admin.email, role: admin.role, profilePic: admin.profilePic} });

    } catch (error) {
     console.error("Error in login",error);
     res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });   
    }
};




// -----------Forgot Password------------
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "admin not found" });
        }

        // ---Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // --hash the token and save to database
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        admin.resetPasswordToken = hashedToken;
        admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // expires in 10 min

        await admin.save();

        // ---create reset password url
        const resetUrl = `https://lock-my-seat.vercel.app/reset-password/${resetToken}&email=${email}`;

        // ---send email with url
        await sendEmail(email, "reset", { resetUrl });

        res.status(200).json({ message: "Password reset link sent to your email." });

    } catch (error) {
        console.error("Error in forgotPassword admin",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -----------Reset Password------------
export const resetPassword = async (req, res) => {
    const {email, token, newPassword} = req.body;

    try {
        
        if (!email || !token || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: "User not found" });
        }

        // ---check if token is valid
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        if (admin.resetPasswordToken !== hashedToken || admin.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // ---hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        admin.password = hashedNewPassword;
        admin.resetPasswordToken = null;
        admin.resetPasswordExpires = null;

        await admin.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error("Error in resetPassword",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -----------Update Profile------------
export const updateProfile = async (req, res) => {
    const { name, profilePic } = req.body;
    const userId = req.user.userId;

    try {

        const admin = await Admin.findById(userId);

        if (!admin) {
            return res.status(400).json({ message: "User not found" });
        }

        if(name){
            const nameExists = await Admin.findOne({ name });
            if (nameExists && nameExists._id.toString() !== userId) {
                return res.status(400).json({ message: "Username already taken" });
            }
            admin.name = name;
        }

        if (req.file) {
            admin.profilePic = await cloudinaryUpload(req.file.path);
        }

        await admin.save();

        res.status(200).json({ message: "Profile updated successfully", data: { _id: admin._id, name: admin.name, email: admin.email, profilePic: admin.profilePic, role: admin.role} });

    } catch (error) {
        console.error("Error in updateProfile",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





// -----------admin logout------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("token",{
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });;
        
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};