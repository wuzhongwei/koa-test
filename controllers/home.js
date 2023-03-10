const fs = require("fs");
const axios = require("axios");
const path = require("path");
const homePage = fs.readFileSync(path.join(__dirname, "../public/index.html"), "utf-8");
const {sequelize} = require('../db')
const { DataTypes, Op } = require("sequelize");
const Result = require('../utils/result')
const {appId, appsecret} = require('../config/config')
const WXManager = require('../services/wx')
const UserInfo = sequelize.define("UserInfo", {
  name: DataTypes.STRING(100), // 姓名
  phone: { // 电话
    type: DataTypes.STRING(100),
    unique: true
  },
  glasses: DataTypes.STRING(100), // 眼镜架
  eyeglass: DataTypes.STRING(100), // 眼镜片
  eyeglassPrice: DataTypes.STRING(100), // 眼镜片价格
  eyeglassSellingPrice: DataTypes.STRING(100), // 眼镜片售价
  sunglasses: DataTypes.STRING(100), // 太阳镜
  oldGlasses: DataTypes.STRING(100), // 老花镜
  openid: DataTypes.STRING(100),
  unionid: DataTypes.STRING(100),
  degrees: DataTypes.STRING(100), // 度数
  naked: DataTypes.STRING(100), // 裸眼视力
  correct: DataTypes.STRING(100), // 矫正视力 
  age: DataTypes.STRING(100), // 年龄
  address: DataTypes.STRING(100), // 地址
  purchaseDate: DataTypes.STRING(100), // 购买日期
  takingDate: DataTypes.STRING(100), // 取镜日期
  glassesModel: DataTypes.STRING(100), // 镜架型号
  glassescolor: DataTypes.STRING(100), // 镜架颜色
  glassesPrice: DataTypes.STRING(100), // 镜架价格
  glassesSellingPrice: DataTypes.STRING(100), // 镜架售价
  totalPrice: DataTypes.STRING(100), // 总价
  frontmoney: DataTypes.STRING(100), // 定金
  notyetPrice: DataTypes.STRING(100), // 尚欠
  birthday: DataTypes.STRING(100), // 生日
  occupation: DataTypes.STRING(100), // 职业
  json: DataTypes.STRING(1234),
  integral: { // 积分
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
},{
  timestamps: false
});

class HomeCtl {
  index(ctx) {
    ctx.body = homePage;
  }
  async postList(ctx) {
    const { request } = ctx;
    ctx.verifyParams({
      phone: {
        type: 'string',
        required: true
      }
    })
    const { action, phone } = request.body;

    if (action === "add") {
      let project = await UserInfo.findOne({where: {phone: phone}})
      if (project) {
        new Result('', '手机号已存在').fail(ctx)
      } else {
        try {
          await UserInfo.create(request.body);
          new Result('创建成功', 'ok').success(ctx)
        } catch (error) {
          new Result('', '手机号已存在').fail(ctx)
        }
      }
      // await UserInfo.create(request.body);
    }
  }
  async getUserList(ctx) {
    const {query} = ctx.request
    let result;
    let currentPage = +query.currentPage || 1;
    let pageSizes = +query.pageSizes || 10
    let total = 0

    if (ctx.request.query.phone) {
      result = await UserInfo.findAll({
        where: {
          [Op.or]: [
            {
              phone: ctx.request.query.phone
            },
            {
              name: ctx.request.query.phone
            }
          ]
        }
      });
    } else {
      result = await UserInfo.findAll({
        limit: pageSizes,
        offset: (currentPage- 1) * pageSizes
      })
    }
    total = await UserInfo.count()
    new Result({list: result, currentPage, pageSizes, total},'ok').success(ctx)
  }

  async getUserItem(ctx) {
    let result = {};
    let { phone } = ctx.request.query
    if (phone) {
      result = await UserInfo.findOne({
        where: {
          [Op.or]: [
            {
              phone: phone
            },
            {
              name: phone
            }
          ]
        }
      });
    }
    new Result(result,'ok').success(ctx)

  }

  async removeUser(ctx) {
    ctx.verifyParams({
      id: {type: 'number', required: true}
    })

    const result = await UserInfo.destroy({
      where: {
        id: ctx.request.body.id
      }
    })

    if (result) {
      new Result(result,'ok').success(ctx)
    } else {
      new Result('删除失败','ok').fail(ctx)
    }
  }

  async updateUser(ctx) {
    const request = ctx.request
    ctx.verifyParams({
      name: {type: 'string', required: true},
      phone: {
        type: 'string',
        required: true
      }
    })
    console.log('request.body', request.body)
    const result = await UserInfo.update(request.body, {
      where: {
        id: request.body.id
      }
    });
    if (result) {
      new Result(result, '更新成功').success(ctx)
    } else {
      new Result('', '更新失败').fail(ctx)
    }

  }

  async wxPhone(ctx) {
    let { code, loginCode } = ctx.request.query
    let wx = new WXManager()
    await wx.fetchAccessToken()
    console.log('成功：=>', code, wx.tokenObj.access_token)
   
    let result = await axios({
      url:  `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appsecret}&js_code=${loginCode}&grant_type=authorization_code`,
      method: "get"
    })

    let {data} = await axios({
      url: `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${wx.tokenObj.access_token}`,
      method: "post",
      data: {
        code: code
      }
    })
    ctx.body = {
      ...data,
      ...result.data
    }
  }
}

module.exports = new HomeCtl();