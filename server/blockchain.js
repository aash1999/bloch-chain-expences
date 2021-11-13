const { timeStamp } = require('console');
const { createHash } = require('crypto');


class Blockchain{
    constructor(){
        this.chain=new Array();
        var date =new Date();
        date = date.toString();
        var genesisBlock = {
            index : 1,
            timestamp:date,
            nonce:0,
            previous_hash:'0',
            data:"Genesis Block , Created By Aakash Singh",

        }
        this.block_difficulty =5;
        genesisBlock.nonce = this.proof_of_work(genesisBlock)
        this.create_block("0" , genesisBlock.nonce, 1 ,  "Genesis Block , Created By Aakash Singh", date);
        
    }

    create_block(previous_hash  , nonce , block_index  , data ,timestamp ){
        var block = {
            index : block_index,
            timestamp : timestamp,
            nonce : nonce,
            previous_hash : previous_hash,
            data : data
        }
        this.chain.push(block);

        return block;

    }

    get_previous_block(){
        return this.chain.slice(-1);
    }

    hash(block){
        var blockstr =""+ block.index + block.previous_hash +  block.data +block.timeStamp+ ""+block.nonce;
        var hash_operation = createHash('sha256').update(blockstr).digest('hex');
        return hash_operation;
    }

    proof_of_work(block){
        var nonce = 1
        var check_proof = false

        while(check_proof == false){
            block.nonce= nonce;
            var hash_operation = this.hash(block);

            if(hash_operation.slice(0,this.block_difficulty) == '0'.repeat(this.block_difficulty)){
                check_proof = true;
            }else{
                nonce+=1;
            }

        }

        return nonce;

    }

    is_valid_chain(){
        var index = 1;

        while(index< this.chain.length){

            if(this.hash(this.chain[index-1]) != this.chain[index].previous_hash){
                return false;
            }

            index+=1;

        }
        return true;
    }

    

}
module.exports.Blockchain = Blockchain ;