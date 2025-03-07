import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js"
dotenv.config();
const PORT = process.env.PORT || 5001;



const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes)
app.all("*", (req, res) => res.status(404).json({ message: "Route not found" }));






app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

