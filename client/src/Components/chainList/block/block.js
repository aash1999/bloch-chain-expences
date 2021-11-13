import "./block.css"

import React, { useState ,useEffect} from 'react';

function Block(props){


    var newline = String.fromCharCode(13, 10);
    return(
        <div className = "block-container">
            <div>
                <div className="block-header">
                    <div className= "block-previous-hash">previous block : {props.blockData.previous_hash}</div>
                    <div className= "index">{props.blockData.index}</div>

                </div>
                <div className="block-body">
                    <div className = "block-body-left">
                        <div className= "time">{props.blockData.timestamp.slice(0,25)}</div>
                        <div className= "nonce">Nonce : {props.blockData.nonce}</div>
                    </div>
                    <div className = "block-body-right">
                        <div className= "data-body">{props.blockData.data}</div>
                    </div>

                </div>
                
            </div>
        </div>
    )

}

export default Block;