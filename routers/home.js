const Router = require('koa-router');
const router = new Router();

const home = require('../controllers/home')
const {Auth} = require('../middlewares/auth')
// 首页
// router.get("/", home.index);

// 创建
router.post("/api/create", new Auth().m, home.postList);

// 获取用户列表
router.get("/api/userList", new Auth().m, home.getUserList);

// 删除用户
router.post("/api/remove", new Auth().m, home.removeUser);

// 修改用户
router.post("/api/update", new Auth().m, home.updateUser);

// // 小程序调用，获取微信 Open ID
// router.get("/api/wx_openid", async (ctx) => {
//   if (ctx.request.headers["x-wx-source"]) {
//     ctx.body = ctx.request.headers["x-wx-openid"];
//   }
// });

module.exports = router