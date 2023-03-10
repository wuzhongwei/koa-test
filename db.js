const { Sequelize } = require("sequelize");
require("dotenv").config();
// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "", MYSQL_TABLE } = process.env;
const [host, port] = MYSQL_ADDRESS.split(":");
console.log(MYSQL_USERNAME, MYSQL_PASSWORD, host, port, MYSQL_TABLE)
const sequelize = new Sequelize(MYSQL_TABLE, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  timezone: '+08:00'
});

// 数据库初始化方法
async function init() {
  await sequelize.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  sequelize
};
