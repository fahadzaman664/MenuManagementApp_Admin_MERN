import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization|| req.headers.Authorization;


    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "No token, authorization denied" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // attach decoded payload to request
            console.log("Decoded user:", req.user);
            return next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
    } else {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }
};

export default verifyToken;
