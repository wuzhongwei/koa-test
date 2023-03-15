require('dotenv').config()

module.exports = {
  security: {
    secretKey: process.env.TOKEN_SECRET_KEY,
    expiresIn: 60 * 60 * 24 // 过期时间
  },
  wxToken: 'dxadsHTML23213',
  appId: process.env.APPID, // 小程序
  appsecret: process.env.APP_SECRET, // 小程序
  gzhAppid: process.env.GZH_APPID, // 公众号appid
  gzhSecret: process.env.GZH_SECRET_KEY // 公众号key
}
