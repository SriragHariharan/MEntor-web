//authentication middleware
const jwt = require('jsonwebtoken');

const adminAuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.cookie?.split("=")[1];
        let resp = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
        console.log("token success :",resp);
        next();
    } catch (error) {
        console.log("token error: " + error.message );
        next({status:401, message:error.message})
    }
};

module.exports = adminAuthMiddleware;