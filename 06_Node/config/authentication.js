const JWT = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const secret = process.env.JWTSECRET;

function createTokenforUser(user) {
  const payload = {
    _id: user._id,
    name: user.fullname,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateUser(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}
module.exports = {
  createTokenforUser,
  validateUser,
};
