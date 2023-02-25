const fs = require("fs");
const path = require("path");
const homePage = fs.readFileSync(path.join(__dirname, "../public/index.html"), "utf-8");
const {sequelize} = require('../db')
const { DataTypes, Op } = require("sequelize");
const Result = require('../utils/result')

const UserInfo = sequelize.define("UserInfo", {
  name: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    unique: true
  },
  glasses: DataTypes.STRING,
  eyeglass: DataTypes.STRING,
  sunglasses: DataTypes.STRING,
  oldGlasses: DataTypes.STRING,
  degrees: DataTypes.STRING,
  integral: {
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
      name: {type: 'string', required: true},
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
}

module.exports = new HomeCtl();