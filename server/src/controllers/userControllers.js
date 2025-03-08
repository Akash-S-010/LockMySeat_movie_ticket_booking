import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";



// -------------check user------------
export const checkUser = async (req, res) => {
    const user = req.user;

    try {
        
        const findUser = await User.findOne({ _id: user._id, role: user.role });

        if(!findUser){
            res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User found", data: findUser });

    } catch (error) {
        console.log("Error in checkUser controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




// -------------get all users------------
export const getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find({ role: "user" });

        if(!users){
            res.status(404).json({ message: "No users found" });
        }

        const totalUser = users.length;
        res.status(200).json({ message: "Users found", data: totalUser });

    } catch (error) {
        console.log("Error in getAllUsers controller",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};