const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const {security} = require('../config/config')
const Result = require('../utils/result')
class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
  }
  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      var decode;
      if (!userToken || !userToken.name) {
        // ctx.throw(403, 'token失效');
        return new Result('','token失效', {status: 403}).fail(ctx)
      }

      try {
        decode = jwt.verify(userToken.name, security.secretKey)
      } catch (error) {
        return new Result('','token过期或者不合法', {status: 200}).fail(ctx)
        // ctx.throw(200, 'token过期或者不合法')
      }

      if (decode.scope < this.level) {
        return new Result('','权限不足', {status: 200}).fail(ctx)
        // ctx.throw(200, '权限不足')
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next();
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, security.secretKey);
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}