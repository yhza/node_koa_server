const Router = require("koa-router");
const { upload, create, update } = require("../controller/goods.controller");
const { auth, hadAdmin } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");
// 默认自动拼上头部 /user, ({ prefix: "/user" });
const router = new Router({ prefix: "/goods" });

// 上传图片接口（文件，视频都行）
router.post("/upload", auth, hadAdmin, upload);

//发布商品接口
router.post("/", auth, hadAdmin, validator, create);

// 修改商品接口
router.put("/:id", auth, hadAdmin, validator, update);

module.exports = router;
