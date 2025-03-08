import express from "express";
import { checkUser, getAllMovies } from "../controllers/userControllers";
import checkAuth from "../middlewares/checkAuth.js";
import checkOwnerAdmin from "../middlewares/checkOwnerAdmin.js";
const router = express.Router();


router.get('/check-user', checkAuth, checkUser);
router.get('/all-users', checkOwnerAdmin, getAllUsers)



export default router