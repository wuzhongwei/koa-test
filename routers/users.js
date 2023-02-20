const Router = require('koa-router');
const router = new Router();
const user = require('../controllers/user')
// 注册
router.post("/api/register", user.register);
router.post("/api/token", user.createToken);
router.post("/api/verify", user.verifyToken);
module.exports = router