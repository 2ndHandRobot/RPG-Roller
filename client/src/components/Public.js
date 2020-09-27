import React from 'react';
import Access from './Access';

// import { Container } from 'react-bootstrap';

const Public = (props) => {
    console.log("Public props: ", props)
    
    return (
        <div>
            <h1>{process.env.PUBLIC_MESSAGE}</h1>
            
        </div>
    )
}

export default Public;