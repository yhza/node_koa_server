const { where } = require("sequelize");
const User = require("../model/user.model");

class UserService {
  // 插入数据
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    // console.log(res);
    return res.dataValues;
  }
  // 查询数据
  async getUerInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    // 不为空的话添加进where
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });
    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
  // 修改数据
  async upadateByid({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};
    // 不为空的话添加进newUser
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });
    const res = await User.update(newUser, { where: whereOpt });
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();
