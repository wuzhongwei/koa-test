module.exports = function() {
  return async (ctx, next) => {
    ctx.success = (msg, status = 200, code = 0) => {
      ctx.status = status
      ctx.body = {
        code,
        msg: msg
      };
    }
    await next()
  }
}