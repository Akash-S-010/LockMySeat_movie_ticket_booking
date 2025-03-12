import express from "express";
import { addShow } from "../controllers/showController.js";
import checkOwner from "../middlewares/checkOwner.js";
const  router = express.Router();

router.post('/add-show', checkOwner, addShow)



export default router