import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/token.js";
import crypto from "crypto";
import cloudinaryUpload from "../utils/cloudinaryUploader.js";
import nodemailer from "nodemailer";

const NODE_ENV = process.env.NODE_ENV


// ------------User Signup------------
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            if (!user.isVerified) {
                // If user exists but is not verified, update their details
                user.name = name; // Ensure updated name
                user.password = await bcrypt.hash(password, 10); // Update password
                user.otp = Math.floor(100000 + Math.random() * 900000);
                user.otpExpires = Date.now() + 3 * 60 * 1000;

                await user.save();
                await sendEmail(email, "otp", {otp:user.otp});

                return res.json({ message: "New OTP sent to your email." });
            }
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user only if no existing record is found
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = Date.now() + 4 * 60 * 1000;

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
            isVerified: false
        });
        await newUser.save();

        await sendEmail(email, "otp", { otp });

        res.json({ message: "OTP sent to your email. Please verify to complete registration." });

    } catch (error) {
        console.error("Error in signup", error.message);
        res.status(500).json({ message: "Internal server error" });
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
        const otpExpires = Date.now() + 4 * 60 * 1000; // Set an expiration time of 4 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // -----------Send OTP via email-----------
        await sendEmail(email, "otp", {otp});

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

        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful", data: { _id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });

    } catch (error) {
        console.error("Error in login", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





// -----------user logout------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });

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

        // --- Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // --- Hash the token before saving
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 min

        await user.save();

        // --- Create reset password URL
        const resetUrl = `https://lock-my-seat.vercel.app/reset-password/${resetToken}`;

        // --- Send email with reset link
        await sendEmail(email, "reset", { resetUrl });

        res.status(200).json({ message: "Password reset link sent to your email." });

    } catch (error) {
        console.error("Error in forgotPassword", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// ------------ Reset Password (Update Password) ------------
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        // --- Hash the received token
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // --- Find the user with the token & check if it's expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // --- Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // --- Remove reset token from DB
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error("Error in resetPassword", error);
        res.status(500).json({ message: "Internal server error" });
    }
};





// -----------Update Profile------------
export const updateProfile = async (req, res) => {
    const { name, profilePic } = req.body;
    const userId = req.user.userId;
    const role = req.user.role;

    try {
        // for role based access
        const Model = role === 'admin' || role === 'theaterOwner' ? Admin : User;
        const user = await Model.findById(userId);

        if (!user) {
            return res.status(400).json({ message: `${role} not found` });
        }

        if (name) {
            const nameExists = await Model.findOne({ name });
            if (nameExists && nameExists._id.toString() !== userId) {
                return res.status(400).json({ message: "Username already taken" });
            }
            user.name = name;
        }

        if (req.file) {
            user.profilePic = await cloudinaryUpload(req.file.path);
        }

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            }
        });

    } catch (error) {
        console.error("Error in updateProfile", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};





// -------------check user------------
export const checkUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "user authorized",
            data: { _id: user._id, name: user.name, email: user.email, profilePic: user.profilePic, role: user.role, status: user.isActive, isVerified: user.isVerified, createdAt: user.createdAt }
        });

    } catch (error) {
        console.error("Error in checkUser controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all users------------
export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({isVerified: true});

        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }

        const totalUser = users.length;
        res.status(200).json({ message: "Users found", data: totalUser, users });

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
        await user.save();

        res.status(200).json({ message: `User ${user.isActive ? "activated" : "deactivated"} successfully` });

    } catch (error) {
        console.log("Error in isActiveToggle", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -----------User contact form------------
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const contact = async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "lockmyseats@gmail.com",
        subject: `New Contact Message from ${name}`,
        text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending email." });
        console.log("Error in contact", error);
    }
};
