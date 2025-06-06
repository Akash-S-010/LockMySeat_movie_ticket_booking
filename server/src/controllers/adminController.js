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

        if (!['admin', 'theaterOwner'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }        

        let admin = await Admin.findOne({ email });

        if (admin) {
            if (!admin.isVerified) {
                // If user exists but is not verified, update their details
                admin.name = name; // Ensure updated name
                admin.password = await bcrypt.hash(password, 10); // Update password
                admin.otp = Math.floor(100000 + Math.random() * 900000);
                admin.otpExpires = Date.now() + 3 * 60 * 1000;

                await admin.save();
                await sendEmail(email, "otp", admin.otp);

                return res.json({ message: "New OTP sent to your email." });
            }
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Create a new user only if no existing record is found
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = Date.now() + 4 * 60 * 1000;

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            otp,
            role,
            otpExpires,
            isVerified: false
        });
        await newAdmin.save();

        await sendEmail(email, "otp", { otp });

        res.json({ message: "OTP sent to your email. Please verify to complete registration." });

    } catch (error) {
        console.error("Error in signup", error);
        res.status(500).json({ message: "Internal server error" });
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
        const otpExpires = Date.now() + 4 * 60 * 1000; // Set expiration time

        admin.otp = otp;
        admin.otpExpires = otpExpires;
        await admin.save();

        // -----------Send OTP via email-----------
        await sendEmail(email, "otp", {otp});

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

        // Generate Token----------
        const token = generateToken(admin._id, admin.role);

        res.cookie("token", token, {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
            return res.status(400).json({ message: "User not found" });
        }

        let role;

        if (admin.role === "admin") {
            role = "admin";
        } else if (admin.role === "theaterOwner") {
            role = "owner";
        }
        

        // --- Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // --- Hash the token before saving
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        admin.resetPasswordToken = hashedToken;
        admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 min

        await admin.save();

        // --- Create reset password URL
        const resetUrl = `https://lock-my-seat.vercel.app/${role}/reset-password/${resetToken}`;

        // --- Send email with reset link
        await sendEmail(email, "reset", { resetUrl });

        res.status(200).json({ message: "Password reset link sent to your email." });

    } catch (error) {
        console.error("Error in forgotPassword", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// -----------Reset Password------------
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ message: "Token required" });
        }

        if (!newPassword) {
            return res.status(400).json({ message: "New password required" });
        }

        // --- Hash the received token
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // --- Find the user with the token & check if it's expired
        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!admin) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // --- Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);

        // --- Remove reset token from DB
        admin.resetPasswordToken = null;
        admin.resetPasswordExpires = null;

        await admin.save();

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


export const checkTheaterOwner = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.user.role !== "theaterOwner") {
            return res.status(403).json({ message: "Forbidden" });
        }

        const owner = await Admin.findById(userId);

        if (!owner) {
            return res.status(400).json({ message: "Theater owner not found" });
        }

        res.status(200).json({
            message: "Owner authorized",
            data: { _id: owner._id, name: owner.name, email: owner.email, profilePic: owner.profilePic, role: owner.role, status: owner.isActive, isVerified: owner.isVerified, createdAt: owner.createdAt }
        });

    } catch (error) {
        console.error("Error in checkTheaterOwner controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




export const getAdmin = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        const admin = await Admin.findById(userId);

        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        res.status(200).json({
            message: "admin authorized",
            data: { _id: admin._id, name: admin.name, email: admin.email, profilePic: admin.profilePic, role: admin.role, status: admin.isActive, isVerified: admin.isVerified, createdAt: admin.createdAt }
        });

    } catch (error) {
        console.error("Error in getAdmin controller", error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

