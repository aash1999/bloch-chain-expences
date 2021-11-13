//const bodyParser = require("body-parser");
const { response } = require("express");
const express = require("express");
const cors=require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build'))); //remove when developing
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



var blockchainFile = require("./blockchain.js")
var blockchain = new blockchainFile.Blockchain();



app.post("/mineblock", (req,res)=>{

    var previous_block =  blockchain.chain.slice(-1)[0];
    var previous_hash =  blockchain.hash(previous_block)
    var data  = req.body.data;
    console.log(req.body.data)
    var date =new Date();
    date = date.toString();
    var block  = {
      index : blockchain.chain.length +1,
      timestamp : date,
      nonce : 1,
      previous_hash : previous_hash,
      data : data
    }
    block.nonce  = blockchain.proof_of_work(block);
    blockchain.create_block(block.previous_hash  , block.nonce , block.index  , block.data ,block.timestamp );
    res.send(block);


})

app.get("/getchain", (req,res)=>{

  var start_index = req.body.start_index;
  var end_index = req.body.end_index;

  var response = {
    chain : blockchain.chain.slice(start_index , end_index),
    is_valid : blockchain.is_valid_chain()
  }

  res.send(response);


})

app.get("/setDifficulty",(req,res)=>{

  blockchain.block_difficulty = req.body.block_difficulty;
  res.send(blockchain.block_difficulty);

})

app.post("/getPreviousBlock",(req,res)=>{
  console.log("/getPreviousBlock Called")
  var response = {
    hash : blockchain.hash(blockchain.chain.slice(-1)[0]),
    blockIndex : blockchain.chain.slice(-1)[0].index +1 ,

  }
  res.send(response);

})