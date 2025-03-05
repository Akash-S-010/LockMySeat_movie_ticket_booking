import express from "express";
import { login, signup, verifyOTP } from "../controllers/authController.js";
const router = express.Router();


router.post('/signup', signup)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
router.post('/logout')


export default router