import "./chainlist.css"
import Block from "./block/block.js"

import React, { useState ,useEffect} from 'react';

function ChainList(){

    var [chain,setChain] = useState([]);
    var [chainList,setChainList] = useState([]);
    var [listUpdated , setListUpdated] = useState(false);

    function fetchChain(){

            const requestOptions1 = {
                method: 'GET',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                block : new URLSearchParams({
                    'start_index': 0,
                    'end_index' : 100
                }) 
            };
             fetch('http://127.0.0.1:5000/getchain', requestOptions1)
                .then(response => response.json(),err => console.log('TCL : err',err))
                .then((data)=>{ 
                    setChain(data.chain);
                    console.log(data);
                });

    }

    useEffect( () => {

            fetchChain();
            setListUpdated(true);
      },[]);

    
    

    return(
        
        <div className = "chainList-container" >

            {
                chain.map((block,index)=>(
                    <Block blockData = {block}/>
                ))
            }

        </div>
    )


}
export default ChainList