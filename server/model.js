const Blockchain = require("../Venus/classes/blockchain.js");
const Transaction = require("../Venus/classes/transaction.js");
const venusCoin = new Blockchain();
const SHA256 = require("crypto-js/sha256");

exports.createWallet = () => {
  const newWalletAddress = JSON.stringify(
    "#####00:" + SHA256(Date.now() + JSON.stringify(Math.random())).toString()
  );
  venusCoin.createTransaction(new Transaction(null, newWalletAddress, 0));
  return newWalletAddress;
};

exports.transaction = operation => {
  const fromAddressAmount = venusCoin.getBallenceAddress(operation.fromAddress);
  if (operation.fromAddress || operation.toAddress)
    if (operation.amount < fromAddressAmount) {
      venusCoin.createTransaction(
        new Transaction(
          operation.fromAddress,
          operation.toAddress,
          operation.amount
        )
      );
    }
};

exports.getUserBallence = walletAddress => {
  const amount = venusCoin.getBallenceAddress(walletAddress);
  return amount;
};

exports.mineBlock = walletAddress => {
  return venusCoin.minePendingTransactions(walletAddress);
};
