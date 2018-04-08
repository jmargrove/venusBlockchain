const model = require("./model.js");

exports.createWallet = ctx => {
  const walletAddress = model.createWallet();
  ctx.body = walletAddress;
  ctx.status = 404;
};

exports.transaction = ctx => {
  console.log(ctx.request.body);
  model.transaction(ctx.request.body[0]);
  ctx.status = 404;
};

exports.getUserBallence = ctx => {
  result = model.getUserBallence(ctx.request.body[0]);
  ctx.body = result;
  ctx.status = 404;
};
//
exports.mineBlock = ctx => {
  console.log("there is this and that ");
  result = model.mineBlock(ctx.request.body[0]);
  ctx.body = result;
  ctx.status = 404;
};
