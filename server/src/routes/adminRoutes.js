import express from "express";
import { checkTheaterOwner, forgotPassword, getAdmin, login, resendOTP, resetPassword, signup, updateProfile, verifyOTP } from "../controllers/adminController.js";
import checkOwnerAdmin from "../middlewares/checkOwnerAdmin.js";
import checkOwner from "../middlewares/checkOwner.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();


router.post('/signup', signup)
router.post('/verify-otp', verifyOTP)
router.post('/login', login)
router.post('/resend-otp', resendOTP)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.put('/update-profile', checkOwnerAdmin, upload.single('profilePic'), updateProfile)
router.get('/check-owner', checkOwner, checkTheaterOwner);
router.get('/check-admin', checkAdmin, getAdmin);


export default router