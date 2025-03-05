import express from "express";
import { userSignup } from "../controllers/authController.js";
const router = express.Router();


router.post('/signup', userSignup)
router.post('/verify-otp')
router.post('/login')
router.post('/logout')

export default router