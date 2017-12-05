const SHA256 = require('crypto-js/sha256');

class Block {
    //index informs us where block sits on chain 
    //timestamp informs us when block was created
    //data informs us of any data we want to store such as transactions details, sender/receiver
    //previousHash tells us hash of previous block, ensures integrity of blockchain
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(); //contains hash of block, will need a way to calculate
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    //constructor is responsible for initializing chain
    constructor() {
        //initialize chain, to contain genesis block
        this.chain = [this.createGenesisBlock()];
    }
    //first block
    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }
    //get the most recent block
    getLatestBlock() { 
        return this.chain[this.chain.length - 1];
    }
    //add a new block
    addBlock(newBlock) {
        //set previous hash to new block, get latest block
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash(); // update hash
        this.chain.push(newBlock); // push new block to chain 
    }
    //verify integrity of blockchain
    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) { //i should be set to 1, genesis block set to 0
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - i];

            if(currentBlock.hash !== currentBlock.calculateHash()){ //check if currentBlock is not equal to current block
                return false;
            }

            if(currentBlock.previous !== previousBlock.hash) { //check if currentBlock points to current previous block
                return false;
            }
        }

        return true;
    }
}

//test chain
let commonCoin = new Blockchain();
commonCoin.addBlock(new Block(1, "03/12/2017", { amount: 4 }));
commonCoin.addBlock(new Block(2, "05/12/2017", { amount: 10 }));
// console.log(JSON.stringify(commonCoin, null, 4))

//check to determine integrity of blockchain
console.log('Is blockchain valid? ' + commonCoin.isChainValid());



