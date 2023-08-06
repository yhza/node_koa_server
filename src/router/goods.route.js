const Router = require("koa-router");
const { upload } = require("../controller/goods.controller");
// 默认自动拼上头部 /user, ({ prefix: "/user" });
const router = new Router({ prefix: "/goods" });

router.post("/upload", upload);

module.exports = router;
