const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    const error = new Error("User Not Found");
    error.code = 401;
    throw error;
  }
  console.log()
  req.userId = decodedToken.userId;
  console.log(req.userId)
  req.isAuth = true;
  next();
};
