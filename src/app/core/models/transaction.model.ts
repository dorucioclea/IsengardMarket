export interface Transaction {
    data: string;
    fee: string;
    gasLimit: number;
    gasPrice: number;
    gasUsed: number;
    miniBlockHash: string;
    nonce: number;
    receiver: string;
    receiverShard: number;
    round: number;
    sender: string;
    senderShard: number;
    signature: string;
    status: string;
    timestamp: number
    txHash: string;
    value: string;
}

export class ExtendedTransaction implements Transaction{
    message : string | undefined;
    data: string;
    fee: string;
    gasLimit: number;
    gasPrice: number;
    gasUsed: number;
    miniBlockHash: string;
    nonce: number;
    receiver: string;
    receiverShard: number;
    round: number;
    sender: string;
    senderShard: number;
    signature: string;
    status: string;
    timestamp: number
    txHash: string;
    value: string;
    constructor(transaction: Transaction){
        this.data = transaction.data;
        this.fee = transaction.fee;
        this.gasLimit = transaction.gasLimit;
        this.gasPrice = transaction.gasPrice;
        this.gasUsed = transaction.gasUsed;
        this.miniBlockHash = transaction.miniBlockHash;
        this.nonce = transaction.nonce;
        this.receiver = transaction.receiver;
        this.receiverShard = transaction.receiverShard;
        this.round = transaction.round;
        this.sender = transaction.sender;
        this.senderShard = transaction.senderShard;
        this.signature = transaction.signature;
        this.status = transaction.status;
        this.timestamp = transaction.timestamp;
        this.txHash= transaction.txHash;
        this.value= transaction.value;
    }
}