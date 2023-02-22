const fs = require("fs");
const path = require("path");
const homePage = fs.readFileSync(path.join(__dirname, "../public/index.html"), "utf-8");
const {sequelize} = require('../db')
const { DataTypes, Op } = require("sequelize");
const Result = require('../utils/result')

const UserInfo = sequelize.define("UserInfo", {
  name: DataTypes.STRING,
  phone: {
    type: DataTypes.INTEGER,
    unique: true
  },
  glasses: DataTypes.STRING,
  eyeglass: DataTypes.STRING,
  sunglasses: DataTypes.STRING,
  oldGlasses: DataTypes.STRING,
  integral: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

class HomeCtl {
  index(ctx) {
    ctx.body = homePage;
  }
  async postList(ctx) {
    const { request } = ctx;
    ctx.verifyParams({
      name: {type: 'string', required: true},
      phone: {
        type: 'number',
        required: true
      }
    })
    const { action, phone } = request.body;

    if (action === "add") {
      let project = await UserInfo.findOne({where: {phone: phone}})
      if (project) {
        new Result('', '手机号已存在').fail(ctx)
      } else {
        await UserInfo.create(request.body);
        new Result('创建成功', 'ok').success(ctx)
      }
      // await UserInfo.create(request.body);
    }
    // else if (action === "clear") {
    //   await UserInfo.destroy({
    //     truncate: true,
    //   });
    // }
  
    // ctx.body = {
    //   code: 0,
    //   data: await UserInfo.count(),
    //   uid: ctx.auth.uid
    // };
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
}

module.exports = new HomeCtl();