import User from "../models/userModel.js";



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




export const getAllMovies = async (req, res) => {
    
}

