const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get Token from the request headers
  const token = req.header("x-auth-token");
  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }
  //verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.employee = decoded.employee;
    return next();
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ msg: "Token is not valid, authorization denied" });
  }
};
