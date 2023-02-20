const fs = require("fs");
const path = require("path");
const homePage = fs.readFileSync(path.join(__dirname, "../public/index.html"), "utf-8");
const {sequelize} = require('../db')
const { DataTypes } = require("sequelize");
const Result = require('../utils/result')


const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

class HomeCtl {
  index(ctx) {
    ctx.body = homePage;
  }
  async postCount(ctx) {


    const { request } = ctx;
    const { action } = request.body;


    if (action === "inc") {
      await Counter.create();
    } else if (action === "clear") {
      await Counter.destroy({
        truncate: true,
      });
    }
  
    ctx.body = {
      code: 0,
      data: await Counter.count(),
      uid: ctx.auth.uid
    };
  }
  async getCount(ctx) {
    const result = await Counter.count();
    new Result({token: 'wwww'},'登录成功').success(ctx)
    // ctx.body = {
    //   code: 0,
    //   data: result,
    // };
  }
}

module.exports = new HomeCtl();