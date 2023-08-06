const { getUerInfo } = require("../service/user.service");

const {
  userFormateError,
  userAlreadyExited,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require("../constant/err.type");

const bcrypt = require("bcryptjs");

// 是否密码或账号为空？
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("账号或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

// 用户是否存在？
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  if (await getUerInfo({ user_name })) {
    ctx.app.emit("error", userAlreadyExited, ctx);
    return;
  }
  await next();
};

// bcryptpassword 进行密码加密

const bcryptpassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;
  await next();
};

//验证登录
const verifylogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUerInfo({ user_name });
    // 1.判断用户是否存在
    // console.log(password, res.password);
    // console.log(!bcrypt.compareSync(password, res.password));
    if (!res) {
      console.error("用户不存在", { user_name });
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }
    // 2.判断密码是否正确
    // !bcrypt.compareSync，使用这个必须使用bcrypt加密过的密码
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
    await next();
  } catch (err) {
    console.error(err);
    return ctx.app.emit("error", userLoginError, ctx);
  }
};

module.exports = {
  userValidator,
  verifyUser,
  bcryptpassword,
  verifylogin,
};
