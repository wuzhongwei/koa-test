const { DataTypes } = require("sequelize");
const bcryptjs = require('bcryptjs')
const {sequelize} = require('../db')
const {LoginTypeArr, LoginType} = require('../utils/enum')
const {generateToken} = require('../utils/utils')
const {Auth} = require('../middlewares/auth')
const Result = require('../utils/result')
// 定义数据模型
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  account: DataTypes.STRING, // 账号
  password: { // 密码
    type: DataTypes.STRING,
    set(val) {
      const salt = bcryptjs.genSaltSync(10); // 盐
      const psw = bcryptjs.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  email: DataTypes.STRING,
  openid: {
    type: DataTypes.STRING(64),
    unique: true
  }
});
User.verifyEmailPassword = async function (account, plainPassword, ctx) {
  const user = await User.findOne({
    where: {
      account
    }
  })
  if (!user) {  
    ctx.throw(200, '账号错误');
  }
  const corr = bcryptjs.compareSync(plainPassword, user.password)
  if (!corr) {
    ctx.throw(200, '密码错误');
  }
  return user
}

class UserCtl {
  async register(ctx) {
    const { request } = ctx;
    
    ctx.verifyParams({
      nickname: {type: 'string', required: false},
      account: {
        type: 'string',
        min: 4, max: 32,
        required: true
      },
      email: {
        type: 'email',
        required: false
      },
      password: {
        type: 'password', required: true
      }
    })
    
    const account = await User.findOne({
      where: {
        account: request.body.account
      }
    })
    if (account) {
      ctx.success('用户已存在', 200)
    } else {
      await User.create(request.body);
      ctx.success()
    }
  }

  async createToken(ctx) {
    const { request } = ctx;
    let isPassword = !!request.body.password // 是否必传
    ctx.verifyParams({
      account: {
        type: 'string',
        min: 4, max: 32,
        required: true
      },
      password: {
        type: 'password',
        required: isPassword,
        min: 4, max: 32,
      },
      type: {
        type: 'enum',
        values: LoginTypeArr,
        required: true
      },
    })

    let token = '';
    switch(request.body.type) {
      case LoginType.USER_EMAIL:
        token = await emailLogin(request.body.account, request.body.password, ctx)
        break;
      case LoginType.USER_MINI_PROGRAM:
        break;
      default:
        
        ctx.success('类型出错', 400, 202)
        break;
    }
    new Result({token},'登录成功').success(ctx)
    // ctx.success({

    // })
    // console.log(ctx.success)
    // ctx.body = {
    //   token
    // }
  }

  verifyToken(ctx) { // 验证token
    ctx.verifyParams({
      token: {
        type: 'string',
        min: 1,
        required: true
      }
    })
    const result = Auth.verifyToken(ctx.request.body.token)
    if (result) {
      new Result(result, 'ok').success(ctx)
    } else {
      new Result(result, '无效令牌', {status: 401}).fail(ctx)
    }    

  }

}
async function emailLogin(account, secret, ctx) {
  const user = await User.verifyEmailPassword(account, secret, ctx)
  return generateToken(user.id, Auth.USER) // 8是普通用户登录
}
module.exports = new UserCtl();