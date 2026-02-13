var jwt = require("jsonwebtoken");

const expiredDate = 60 * 60 * 24 * 5; //5 days

module.exports = function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: expiredDate,
  });
};
