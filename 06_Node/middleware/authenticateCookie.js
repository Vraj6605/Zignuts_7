const { validateUser } = require("../config/authentication");

function authenticateCookie(tokenName){
  return (req,res,next) => {
    let token = req.cookies[tokenName];
    // console.log(token);
    
    if(!token) return next();

    try {
      const payload = validateUser(token);
      req.user = payload;
    } catch (error) {}
    return next()
  }
}

module.exports = {
  authenticateCookie
}