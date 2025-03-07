import jwt from "jsonwebtoken";


const checkOwner = (req, res, next) =>{
    try {
        
        const {token} = req.cookies

        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                return res.status(401).json({message:"Unauthorized"})
            }

            if(decoded.role !== "theaterOwner"){
                return res.status(403).json({message:"Access denied"})
            }

            req.user = decoded;
            next();
        })

    } catch (error) {
        console.log("Error in checkOwner middleware",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export default checkOwner