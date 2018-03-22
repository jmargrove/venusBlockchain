const Blockchain = require("../Venus/classes/blockchain.js");
const Transaction = require("../Venus/classes/transaction.js");
let venusCoin = new Blockchain();

exports.block = async ctx => {
  console.log("what us comming in ", ctx.amount);

  await venusCoin.creatTransaction(
    new Transaction(ctx.fromAddress, ctx.toAddress, Number(ctx.amount))
  );
  venusCoin.minePendingTransactions("james-address");

  console.log("sum", venusCoin.getBallenceAddress("address2"));
};
