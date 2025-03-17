import express from "express";
import { createOrder, paymentVerification } from "../controllers/paymentController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();


router.post('/create-order', checkAuth, createOrder)
router.post('/payment-verification', checkAuth, paymentVerification)


export default router