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
    const [data, setData] = useState("");

    var nonce;
    var diffucuilty = 4;

     function fetchLoadData(){
        if(submited == false){
            setIsMining(true);
            const requestOptions1 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            };
            fetch('http://127.0.0.1:5000/getPreviousBlock', requestOptions1)
                .then(response => response.json(),err => console.log('TCL : err',err))
                .then((data)=>{ 
                    setPreviousHash(data.hash);
                    setBlockIndex(data.blockIndex);
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body:  new URLSearchParams({
            'data': data,
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

    if(isMining == false){
       return(<div className = "form-container" >
                                <form   id="new-block-mine"  onSubmit = {MineBlock}>
                                <div className = "card-header"></div>
                                <div className = "form-heading">New Block</div>
                                <div className = "form-card" >
                                    {/* <div className = "block-index">Index : {blockIndex}</div> */}
                                    {/* <div className = "previous-hash">Previous Block<span><p className = "hash">{previousHash}</p></span></div> */}
                                    <label className="data">Data</label><br></br>
                                    <textarea 
                                            className="text-box"
                                            name="message" 
                                            rows="10" 
                                            cols="30"
                                            autoCorrect="off"
                                            spellCheck= "false"
                                            maxLength ="100"
                                            value = {data}
                                            onChange = {(e)=>setData(e.target.value)}
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