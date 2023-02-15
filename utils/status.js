module.exports = function() {
  return async (ctx, next) => {
    ctx.success = (code) => {
      ctx.status = code || 201
      ctx.body = {
        code: 0
      };
    }
    await next()
  }
}