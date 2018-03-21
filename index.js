const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("block mined : ", this.hash);
  }
}

class Blockchain {
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
}

let venusCoin = new Blockchain();

venusCoin.creatTransaction(new Transaction("address1", "address2", 100));
venusCoin.creatTransaction(new Transaction("address2", "address1", 50));
venusCoin.creatTransaction(new Transaction("address1", "address2", 100));
venusCoin.creatTransaction(new Transaction("address2", "address1", 20));

console.log("\n Strating the miner...");
venusCoin.minePendingTransactions("james-address");

console.log(
  "\n ballence of james is:",
  venusCoin.getBallenceAddress("james-address")
);

console.log(
  "\n ballence of address2 is:",
  venusCoin.getBallenceAddress("address2")
);

console.log("\n Strating the miner...");
venusCoin.minePendingTransactions("james-address");

console.log(
  "\n ballence of james is:",
  venusCoin.getBallenceAddress("james-address")
);
