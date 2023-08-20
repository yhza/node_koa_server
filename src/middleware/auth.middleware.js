const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const {
  tokenExpiredError,
  invalidToken,
  hadNotAdmin,
} = require("../constant/err.type");
// 用来判断 用户是否登录
const auth = async (ctx, next) => {
  // 拿到传过来的token
  const { authorization } = ctx.request.header;
  // console.log(ctx.request.header);
  // 进行处理token多余的字符串，(找到“Bearer ”替换成空)
  const token = authorization.replace("Bearer ", "");
  // console.log(token);
  try {
    // user包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.error("token已过期", err);
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效的token", err);
        return ctx.app.emit("error", invalidToken, ctx);
    }
  }
  await next();
};
// 判断 用户是否是管理员
const hadAdmin = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  // console.log(ctx.state.user);
  if (!is_admin) {
    console.error("该用户没有管理员权限", ctx.state.user);
    return ctx.app.emit("error", hadNotAdmin, ctx);
  }
  await next();
};
module.exports = {
  auth,
  hadAdmin,
};
