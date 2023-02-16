const { DataTypes } = require("sequelize");
const bcryptjs = require('bcryptjs')
const {sequelize} = require('../db')
const {LoginTypeArr, LoginType} = require('../utils/enum')
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
  console.log('www', user, ctx.success)
  if (!user) {  
    ctx.throw(200, '账号错误');
  }
  const corr = bcryptjs.compareSync(plainPassword, user.password)
  console.log('corr', corr)
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
    console.log(request.body, request.body.type)
    switch(request.body.type) {
      case LoginType.USER_EMAIL:
        await emailLogin(request.body.account, request.body.password, ctx)
        break;
      case LoginType.USER_MINI_PROGRAM:
        break;
      default:
        
        ctx.success('类型出错', 400, 202)
        break;
    }
  }

}
async function emailLogin(account, secret, ctx) {
  const user = await User.verifyEmailPassword(account, secret, ctx)
  console.log('登录成功')
}
module.exports = new UserCtl();