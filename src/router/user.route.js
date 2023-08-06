const Router = require("koa-router");
// 默认自动拼上头部 /user, ({ prefix: "/user" });
const router = new Router({ prefix: "/user" });
const {
  userValidator,
  verifyUser,
  bcryptpassword,
  verifylogin,
} = require("../middleware/user.middleware");
const {
  register,
  login,
  changePassword,
} = require("../controller/user.controller");
const { auth } = require("../middleware/auth.middleware");

// 注册接口
router.post("/register", userValidator, verifyUser, bcryptpassword, register);
//登录接口
router.post("/login", userValidator, verifylogin, login);
// 修改密码
router.patch("/", auth, bcryptpassword, changePassword);

module.exports = router;
