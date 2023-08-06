const { Sequelize } = require("Sequelize");
const {
  APP_POST,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
});

module.exports = seq;

// 下面是测试是否连接成功数据库代码

// seq.authenticate()
//   .then(() => {
//     console.log("数据库连接成功");
//   })
//   .catch((err) => {
//     console.log("数据库连接失败", err);
//   });
