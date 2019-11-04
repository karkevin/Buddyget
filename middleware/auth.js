const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied." });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // manipulate req
    req.user = decoded;

    // call `next` middleware function.
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid." });
  }
}

module.exports = auth;
