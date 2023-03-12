const Router = require('koa-router');
const router = new Router();

const home = require('../controllers/home')
const {Auth} = require('../middlewares/auth')
// 首页
// router.get("/", home.index);

// 创建
router.post("/api/create", home.postList);

// 获取用户列表
router.get("/api/userList", new Auth().m, home.getUserList);

// 删除用户
router.post("/api/remove", new Auth().m, home.removeUser);

// 修改用户
router.post("/api/update", new Auth().m, home.updateUser);

// 获取用户列表不带权限校验
router.get("/api/userListNoAuth", home.getUserItem);

// 获取微信手机号
router.get("/api/wx_phone", home.wxPhone);


module.exports = router