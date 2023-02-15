const { DataTypes } = require("sequelize");
const bcryptjs = require('bcryptjs')
const {sequelize} = require('../db')
const {LoginTypeArr} = require('../utils/enum')
// 定义数据模型
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  account: DataTypes.STRING,
  password: {
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
class UserCtl {
  async register(ctx) {
    const { request } = ctx;
    
    ctx.verifyParams({
      nickname: {type: 'string', min: 6, max: 32},
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
    
    const nickname = await User.findOne({
      where: {
        nickname: request.body.nickname
      }
    })
    // if (nickname) {
    //   throw new Error('名称已存在')
    // } else {
      
    // }
    await User.create(request.body);
    ctx.success()
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

    ctx.body = '222';
  }

}

module.exports = new UserCtl();