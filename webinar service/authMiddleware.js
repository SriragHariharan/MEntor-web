//authentication middleware
const jwt = require('jsonwebtoken');

const authMiddleware = (req, _res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1].replaceAll('"', "");
    console.log("token: " + token);
    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
      console.log("decodedToken :::",decodedToken)
      req.user = decodedToken;
      next();
    }else{
      console.log("token not present")
    }
    
  } catch (error) {
    next({status:401, message:error.message})
  }
};

module.exports = authMiddleware;