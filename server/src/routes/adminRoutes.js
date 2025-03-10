import express from "express";
const router = express.Router();


router.post('/signup', signup)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
router.post('/logout',logout)
router.post('/resend-otp',resendOTP)


export default router