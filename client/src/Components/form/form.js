import "./form.css"
//import React from "react";
import React, { useState ,useEffect} from 'react';
import ProgressBar from 'react-animated-progress-bar';

function Form(){
    //var blockIndex = 1;
    var timeStamp;
    var [previousHash , setPreviousHash]= useState("bjhdb2321FWDF342SD1ssdf");
    var [blockIndex , setBlockIndex]= useState("");
    var [submited , setSubmitted] = useState(false);
    var [isMining , setIsMining ] = useState(false);
    const [disc, setDisc] = useState("");
    const [amt, setAmt] = useState("");
    const [paidChecked , setPaidChecked] = useState(true);
    const [receivedChecked , setReceivedChecked] = useState(false);
    const [totalPaid,setTotalPaid] = useState(0);
    const [totalReceived,setTotalReceived] = useState(0);
    const [totalExpences,setTotalExpences] = useState(0);



    var nonce;
    var diffucuilty = 4;

     function fetchLoadData(){
        if(submited == false){
            setIsMining(true);
            const requestOptions1 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            };
            fetch('http://127.0.0.1:5000/getSummary', requestOptions1)
                .then(response => response.json(),err => console.log('TCL : err',err))
                .then((data)=>{ 
                    setPreviousHash(data.hash);
                    setBlockIndex(data.blockIndex);
                    setTotalPaid(data.paid);
                    setTotalReceived(data.received);
                    setTotalExpences(data.total);
                    setSubmitted(true);
                    setIsMining(false);
                //alert(data);
                });
        }

    }

    useEffect( () => {
        fetchLoadData();
           
      },[]);
    
    
    function MineBlock(){
        var paid_data;
        if(paidChecked == true){
            paid_data = "true"
        }else{
            paid_data= "false"
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body:  new URLSearchParams({
            'data': disc,
            'paid' : paid_data,
            'amount' : amt,
        }) 
        };
        fetch('http://127.0.0.1:5000/mineblock', requestOptions)
            .then(response => response.json())
            .then(async (data)=>{ 
            console.log(data)
            setSubmitted(true);
            await fetchLoadData();
            });
    

    }
    var [nonceCount ,setNonceCount]= useState(1);

    if(isMining == false){// after development turn it to false
       return(<div className = "form-container" >
                                <form   id="new-block-mine"  onSubmit = {MineBlock}>
                                <div className = "card-header">
                                    <div className= "payment-box payment-paid">
                                        <div>Spent</div>
                                        <div>{totalPaid}</div>

                                    </div>
                                    <div className= "payment-box payment-received">
                                    <div>Settled Up</div>
                                    <div>{totalReceived}</div>
                                    </div>
                                    <div className= "payment-box total-exp">
                                    <div>Out Standing</div>
                                    <div>{totalExpences}</div>
                                    </div>
                                </div>
                                <div className = "form-heading">New Payment</div>
                                <div className = "form-card" >
                                    {/* <div className = "block-index">Index : {blockIndex}</div> */}
                                    {/* <div className = "previous-hash">Previous Block<span><p className = "hash">{previousHash}</p></span></div> */}
                                    <div className ="amount">Amount :</div><textarea 
                                            className="text-box amount-textbox"
                                            name="amount" 
                                            rows="1" 
                                            cols="8"
                                            maxlength="8"
                                            autoCorrect="off"
                                            spellCheck= "false"
                                            maxLength ="100"
                                            value = {amt}
                                            onChange = {(e)=>setAmt(e.target.value)}
                                    ></textarea><br></br>

                                    <div className="paid-container">
                                        <input 
                                            // className= "payment-checkbox"
                                            checked={paidChecked} 
                                            onChange = {()=>{
                                                setPaidChecked(!paidChecked);
                                                setReceivedChecked(!receivedChecked);
                                            }}
                                            type="checkbox" 
                                            id="paid" 
                                            name="paid" 
                                            value="paid"/>
                                        <span className= "payment-checkbox"></span>
                                        <label for="paid">Spent</label><br></br>
                                        
                                        <input 
                                            className= "payment-checkbox"
                                            checked={receivedChecked}
                                            onChange ={()=>{
                                                setPaidChecked(!paidChecked);
                                                setReceivedChecked(!receivedChecked);
                                            }}
                                            type="checkbox" 
                                            id="received" 
                                            name="received" 
                                            value="received"/>
                                        <label for="received">Settled</label><br></br>
                                        

                                    </div>

                                    

                                    <label className="data">Description</label><br></br>
                                    <textarea 
                                            className="text-box"
                                            name="message" 
                                            rows="2" 
                                            cols="30"
                                            autoCorrect="off"
                                            spellCheck= "false"
                                            maxlength ="60"
                                            value = {disc}
                                            onChange = {(e)=>setDisc(e.target.value)}
                                    ></textarea>
                                    <div className= "text-bottom"></div>
                                    <br></br>

                                </div>
                                {/* <div className="back-img"></div> */}


                                <button  className="mine-button" type="submit" >Mine</button>
                            </form>
                            
                            
                            {/* <div className="back-img"></div> */}

                </div>)
            


    }else{
        // setNonceCount(nonceCount+1);
        return(
            
            <div className = "form-container" >
                <div className =  "loading-pos">
                    <div className = "loading-flex">
                        <h1 className = "mining-heading">Mining . . . </h1>
                        <ProgressBar
                            className = "progress-bar"
                            width="20vw"
                            height="10px"
                            rect
                            // fontColor="#04C1B7"
                            fontColor="black"
                            percentage="99"
                            rectPadding="1px"
                            rectBorderRadius="20px"
                            trackPathColor="transparent"
                            // bgColor="#04C1B7"
                            bgColor="black"
                            trackBorderColor="grey"
                        />

                    </div>

                </div>

            </div>
            )
    }
    
}
export default Form