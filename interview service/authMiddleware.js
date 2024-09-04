//authentication middleware
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1].replaceAll('"', "");
    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
      //console.log("decodedToken :::",decodedToken)
      req.user = decodedToken;
      next();
    }
  } catch (error) {
    next({status:401, message:error.message})
  }
};

module.exports = authMiddleware;