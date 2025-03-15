import express from "express";
import { checkUser, getAllUsers, login, logout, resendOTP, signup, verifyOTP } from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkOwnerAdmin from "../middlewares/checkOwnerAdmin.js";
const router = express.Router();

router.post('/signup', signup)
router.post('/verify-otp',verifyOTP)
router.post('/resend-otp',resendOTP)
router.post('/login',login)
// router.post('/forgot-password', forgotPassword)
// router.post('/reset-password', resetPassword)
// router.put('/update-profile', checkAuth, updateProfile)
router.post('/logout',logout)
router.get('/check-user', checkAuth, checkUser);
router.get('/all-users', checkOwnerAdmin, getAllUsers)



export default router