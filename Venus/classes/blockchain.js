const Block = require("./block.js");
const Transaction = require("./transaction.js");

module.exports = class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("01/01/2018", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);
    console.log("Block successfully mined!");
    this.chain.push(block);
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  creatTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBallenceAddress(address) {
    let ballence = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAdress === address) {
          ballence -= trans.amount;
        }
        if (trans.toAddress === address) {
          ballence += trans.amount;
        }
      }
    }
    return ballence;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
};
