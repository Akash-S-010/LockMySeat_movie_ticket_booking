import express from "express";
import { checkUser, contact, forgotPassword, getAllUsers, isActiveToggle, login, logout, resendOTP, resetPassword, signup, updateProfile, verifyOTP } from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkOwnerAdmin from "../middlewares/checkOwnerAdmin.js";
import { upload } from "../middlewares/multer.js";
import checkAdmin from "../middlewares/checkAdmin.js";
const router = express.Router();

router.post('/signup', signup)
router.post('/verify-otp', verifyOTP)
router.post('/resend-otp', resendOTP)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.put('/update-profile', checkAuth, upload.single('profilePic'), updateProfile)
router.post('/logout', logout)
router.get('/check-user', checkAuth, checkUser);
router.get('/all-users', checkOwnerAdmin, getAllUsers)
router.put('/update-status/:userId', checkAdmin, isActiveToggle)
router.post('/contact', contact)



export default router