const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log('PORT:', process.env.PORT);
console.log('JSON_WEB_TOKEN_SECRET:', process.env.JSON_WEB_TOKEN_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('Server is running')
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
        return res.status(401).json({ message: "No token, authorization denied" });
    }
}
module.exports = verifyToken;