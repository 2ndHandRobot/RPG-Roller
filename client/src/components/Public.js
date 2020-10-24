import React from 'react';
import axios from 'axios';

// import { Container } from 'react-bootstrap';

const Public = (props) => {
    console.log("Public props: ", props)
    
    function trySave() {
        function saveAuxiliary(props){
            console.log('PROTECTED :: DOING: saveAuxiliary')
            
            const payload = {
                auxId: props.auxId,
                auxType: props.auxType,
                group: props.group,
                field: props.field,
                value: props.value,
                fieldId: props.fieldId
            }
            console.log("Payload: ",JSON.stringify(payload));
        
            axios({
                url: '/api/edit-auxiliary',
                method: 'POST',
                data: payload
             })
            .then((result) => {
                console.log("Data sent to server. Auxiliary updated:", result);
                return(result.data)
            })
            .catch((err) => {
                console.log("Internal server error.", err);
                return false;
             });
            
        }
        const myPayload = {
            auxId: '5f8d6d2535d9bce990d92c66',
            auxType: 'horses',
            group: 'who',
            field: 'label',
            value: 'Courser',
            fieldId: '5f8d6d2535d9bce990d92c67'
        }
        
        saveAuxiliary(myPayload)
    }

    return (
        <div>
            <h1>{process.env.PUBLIC_MESSAGE}</h1>
        </div>
    )
}

export default Public;