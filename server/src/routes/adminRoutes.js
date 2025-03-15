import express from "express";
import { forgotPassword, login, logout, resendOTP, resetPassword, signup, updateProfile, verifyOTP } from "../controllers/adminController.js";
import checkOwnerAdmin from "../middlewares/checkOwnerAdmin.js";
const router = express.Router();


router.post('/signup', signup)
router.post('/verify-otp', verifyOTP)
router.post('/login', login)
router.post('/logout', logout)
router.post('/resend-otp', resendOTP)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.put('/update-profile', checkOwnerAdmin, updateProfile)


export default router