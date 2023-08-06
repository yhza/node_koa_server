const {
  createUser,
  getuserinfo,
  upadateByid,
} = require("../service/user.service");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { getUerInfo } = require("../service/user.service");

class Usercontroller {
  async register(ctx, next) {
    // 1.获取数据
    // console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;
    // 2.操作数据库
    const res = await createUser(user_name, password);
    //  console.log(res);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      id: res.id,
      user_name: res.user_name,
    };
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // 登录成功添加token
    // 1.获取用户信息
    try {
      // 这种写法，可以从返回结果中剔除pawwword，并把剩下属性放到res对象中
      const { password, ...res } = await getUerInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
      return;
    } catch (err) {
      console.error("用户登录失败", err);
    }

    // ctx.body = `欢迎尊贵的${user_name},登录成功!`;
  }
  async changePassword(ctx, next) {
    // 1.获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    // console.log(id, password);
    // 2.操作数据库
    if (await upadateByid({ id, password })) {
      // 3.返回结果
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    } else {
      // 3.返回结果
      ctx.body = {
        code: "10007",
        message: "修改密码失败",
        result: "",
      };
    }
  }
}

module.exports = new Usercontroller();
