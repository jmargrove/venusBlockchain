const model = require("./model.js");

exports.postOne = ctx => {
  const result = model.block(ctx.request.body[0]);
  ctx.body = result;
  ctx.status = 404;
};
