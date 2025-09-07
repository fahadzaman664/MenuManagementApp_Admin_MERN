import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send("no token, authorization denied")
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
            console.log("the decoded user is", req.user)

        } catch (error) {
            res.status(401).send("token is invalid")
        }
    }
    else {
        return res.status(401).send("no token, authorization denied")

    }
}

export default verifyToken;