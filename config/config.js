require('dotenv').config()
console.log('prosess.evn', process.env.TOKEN_SECRET_KEY, process.env.APPID, process.env.APP_SECRET)
module.exports = {
  security: {
    secretKey: process.env.TOKEN_SECRET_KEY,
    expiresIn: 60 * 60 * 24 // 过期时间
  },
  wxToken: 'dxadsHTML23213',
  appId: process.env.APPID,
  appsecret: process.env.APP_SECRET
}