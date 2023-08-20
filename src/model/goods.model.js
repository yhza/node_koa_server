// 导入可以调用数据库的插件
const { DataTypes } = require("sequelize");
// 数据库连接
const seq = require("../db/seq");
// 创建模型(简称创建表)
const Goods = seq.define("yh_goods", {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "商品名称",
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: "商品价格",
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品库存",
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "商品图片url地址",
  },
});
// 强制创建表
// Goods.sync({ force: true });

module.exports = Goods;
