const { sign, verify } = require("jsonwebtoken");
const secretKey = "Vrakjzsdyaw";

const setUser = (user) => {
  return sign(
    {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    secretKey
  );
};

const getUser = (token) => {
  if (!token) return null;
  return verify(token, secretKey);
};

module.exports = {
  setUser,
  getUser,
};
