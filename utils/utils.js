const jwt = require('jsonwebtoken');
const {security} = require('../config/config')
const generateToken = function (uid, scope) {
  const token = jwt.sign({
    uid,
    scope
  },security.secretKey,{expiresIn: security.expiresIn})
  return token
}
const zeroFill = (num) => {
  return num < 10 ? '0'+ num : num
}


module.exports = {
  generateToken,
  zeroFill
}