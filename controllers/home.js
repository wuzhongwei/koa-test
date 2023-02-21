const fs = require("fs");
const path = require("path");
const homePage = fs.readFileSync(path.join(__dirname, "../public/index.html"), "utf-8");
const {sequelize} = require('../db')
const { DataTypes } = require("sequelize");
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
    const result = await UserInfo.findAll();
    new Result(result,'ok').success(ctx)
  }
}

module.exports = new HomeCtl();