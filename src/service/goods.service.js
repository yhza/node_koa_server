const Goods = require("../model/goods.model");
class GoodsService {
  // 导入数据到数据库
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new GoodsService();
