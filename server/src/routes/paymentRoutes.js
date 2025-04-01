import express from "express";
import { createOrder, paymentVerification } from "../controllers/paymentController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = express.Router();


router.post('/createOrder', checkAuth, createOrder)
router.post('/paymentVerification', checkAuth, paymentVerification)


export default router