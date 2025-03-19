import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/token.js";
import crypto from "crypto";
import cloudinaryUpload from "../utils/cloudinaryUploader.js";



// ------------User Signup------------
export const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // -----hash password--------
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ------generate otp--------
        const otp = Math.floor(100000 + Math.random() * 900000);

        // ------otp expire time ( 3 min )------
        const otpExpires = Date.now() + 3 * 60 * 1000;

        const newUser = new User({ name, email, password: hashedPassword, otp, otpExpires, isVerified: false });
        await newUser.save();

        //--------- Send OTP via email------------
        await sendEmail(email, "Lock My Seat", `Your OTP for registration: ${otp}`);

        res.json({ message: "OTP sent to your email. Please verify to complete registration." });

    } catch (error) {
        console.error("Error in signup", error);
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

        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // OTP verified, finalize registration
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "Registration successful." });

    } catch (error) {
        console.error("Error in verifying OTP", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" }); F
    }
};




// -----------Resent OTP------------
export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified." });
        }

        // ---------Generate new OTP------------
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = Date.now() + 3 * 60 * 1000; // Set an expiration time of 3 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // -----------Send OTP via email-----------
        await sendEmail(email, "Lock My Seat", `Your new OTP for registration: ${otp}`);

        res.json({ message: "New OTP sent to your email." });

    } catch (error) {
        console.error("Error in resending OTP", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
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

        // Check account is deactivated
        if (user.isActive === false) {
            return res.status(403).json({ message: "Sorry, your account has been deactivated by admin." });
        }

        if (user.isVerified === false) {
            return res.status(400).json({ message: "Please verify your email before logging in." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate Token---------
        const token = generateToken(user._id);

        res.cookie("token", token)

        res.status(200).json({ message: "Login successful", data: { _id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });

    } catch (error) {
        console.error("Error in login", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





// -----------user logout------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout", error);
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

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // ---Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // --hash the token and save to database
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // expires in 10 min

        await user.save();

        // ---create reset password url
        const resetUrl = `http://localhost:5000/reset-password/${resetToken}&email=${email}`;

        // ---send email with url
        await sendEmail(email, "Password Reset Request", `Click here to reset your password: ${resetUrl}`);

        res.status(200).json({ message: "Password reset link sent to your email." });

    } catch (error) {
        console.error("Error in forgotPassword", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -----------Reset Password------------
export const resetPassword = async (req, res) => {
    const { email, token, newPassword } = req.body;

    try {

        if (!email || !token || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // ---check if token is valid
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        if (user.resetPasswordToken !== hashedToken || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // ---hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedNewPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error("Error in resetPassword", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -----------Update Profile------------
export const updateProfile = async (req, res) => {
    const { name, profilePic } = req.body;
    const userId = req.user.userId;

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (name) {
            const nameExists = await User.findOne({ name });
            if (nameExists && nameExists._id.toString() !== userId) {
                return res.status(400).json({ message: "Username already taken" });
            }
            user.name = name;
        }

        if (req.file) {
            user.profilePic = await cloudinaryUpload(req.file.path);
        }

        await user.save();

        res.status(200).json({ message: "Profile updated successfully", data: { _id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });

    } catch (error) {
        console.error("Error in updateProfile", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------check user------------
export const checkUser = async (req, res) => {

    try {

        res.json({ message: "user authorized" });

    } catch (error) {
        console.error("Error in checkUser controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all users------------
export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({ role: "user" });

        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }

        const totalUser = users.length;
        res.status(200).json({ message: "Users found", data: totalUser });

    } catch (error) {
        console.error("Error in getAllUsers controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -----------User account deactivation and activation------------
export const isActiveToggle = async (req, res) => {
    const { userId } = req.params

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.isActive = !user.isActive;
        console.log(user.isActive);
        await user.save();

        res.status(200).json({ message: `User ${user.isActive ? "activated" : "deactivated"} successfully` });

    } catch (error) {
        console.log("Error in isActiveToggle", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};