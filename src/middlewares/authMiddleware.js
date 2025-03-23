const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log('PORT:', process.env.PORT);
console.log('JSON_WEB_TOKEN_SECRET:', process.env.JSON_WEB_TOKEN_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res
            .status(401)
            .json({ message: "not token, authorizacion Denied" });
        }

        try {
            const decode = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
            req.user = decode;
            console.log("the decoder usr is my", req.user);
            next();
        } catch (err) {
            return res.status(400).json({ message: "Invalid token" });
        }
    }else{
        return 
        res.status(401).json({ message: "No token, authorization denied" });
    }
}
module.exports = verifyToken;

/*
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
    console.log("Middleware reached");
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided");
        return res.status(401).json({ message: "Access Denied, no token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
        req.user = decoded;
        console.log("Token verified:", decoded);
        next();
    } catch (err) {
        console.log("Invalid token:", err.message);
        return res.status(401).json({ message: "Invalid token", error: err.message });
    }
};

module.exports = verifyToken;

*/