const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 创建模型(简称创建表)
const User = seq.define(
  "yh_user",
  {
    // id会自己生成不用写也没事
    user_name: {
      type: DataTypes.STRING,
      // 是否运行为空
      allowNull: false,
      // 是否是唯一的
      unique: true,
      // 注释
      comment: "用户名，唯一",
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: "密码",
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      // 默认值
      defaultValue: 0,
      comment: "是否为管理员，0：不是,1：是",
    },
  }
  //是否创建更新和创建的时间戳（默认不写是允许）
  //   {
  //     timestamps: false,
  //   }
);
// 强制创建表
// User.sync({ force: true });

module.exports = User;
