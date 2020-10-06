import React, { useState } from 'react';

import { Container } from 'react-bootstrap';

export default function KnightsList(props) {
    
    
    console.log(props);
    
    function list() {
        let l = props.listData;
        console.log("listData: ",l);
        if (l.length > 0) {
            return (
                <Container>
                <h5>{props.listName}</h5>
                {l.map((knight, index)=>{
                    return( <button key={index}  type="button" onClick={()=>{props.openSheet(knight._id, props.permission)}}>{knight.name!==""?knight.name:"(unnamed knight)"}</button>)
                })}
                </Container>
            )
        } else {
            return <p>no knight data</p>
        }
    }

    return (
            
                list()
            
            )
     
}