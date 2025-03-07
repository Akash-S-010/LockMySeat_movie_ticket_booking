import jwt from "jsonwebtoken";

// -----------check user authenticated------------
const checkAuth = (req, res, next) => {
    try {
        
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = decoded;
            next();
        })

    } catch (error) {
        console.log("Error in checkAuth middleware",error);
        res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export default checkAuth