const jsonwebtoken = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY, (err) => {
      console.log(err);
      // next();
      if (err) {
        return res.status(401).json({ message: "Error token" });
      } else {
        next();
      }
    });
  } else {
    return res.json({ message: "Error token" });
  }
};

module.exports = AuthMiddleware;
