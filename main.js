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
        this.hash = ''; //contains hash of block, will need a way to calculate
    }

    calculateHash() {

    }
}
