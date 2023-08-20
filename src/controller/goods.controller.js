const path = require("path");
const {
  fileUploadError,
  unSupportedfiletype,
  publishGoodsError,
  invalidGoodsid,
} = require("../constant/err.type");
const { createGoods, updateGoods } = require("../service/goods.service");
// const { match } = require("../router/goods.route");
class Goodscontroller {
  // 上传图片到数据库
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const filetype = /image\/.+/;
    // console.log(filetype);
    if (!file.mimetype.match(filetype)) {
      return ctx.app.emit("error", unSupportedfiletype, ctx);
    }
    if (file) {
      ctx.body = {
        code: 0,
        message: "图片上传成功",
        result: {
          goods_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }
  // 写入发布的商品到数据库
  async create(ctx, next) {
    try {
      // 调用函数发送数据给数据库
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      );
      ctx.body = {
        code: 0,
        message: "发布到数据库的数据成功",
        result: res,
      };
    } catch (error) {
      console.error("error", publishGoodsError, ctx);
    }
  }
  // 修改商品
  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改成功",
          result: "",
        };
      } else {
        return ctx.app.emit("error", invalidGoodsid, ctx);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Goodscontroller();
