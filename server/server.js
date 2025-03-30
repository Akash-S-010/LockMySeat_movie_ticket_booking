import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";
import apiRoutes from "./src/routes/index.js";
import cors from "cors"

dotenv.config();
const PORT = process.env.PORT || 5000;



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello Welcome To LockMySeat");
});

app.use('/api', apiRoutes)
app.all("*", (req, res) => res.status(404).json({ message: "Route not found" }));






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

