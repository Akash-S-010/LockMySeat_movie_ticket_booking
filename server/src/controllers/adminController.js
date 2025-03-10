import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/token.js";



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
        console.log("Error in verifying OTP",error);
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
        console.log("Error in resending OTP", error);
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

        res.cookie("token", token)

        res.status(200).json({ message: "Login successful",data: {_id: admin._id, name: admin.name, email: admin.email, role: admin.role} });

    } catch (error) {
     console.log("Error in login",error);
     res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });   
    }
};





// -----------admin logout------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};