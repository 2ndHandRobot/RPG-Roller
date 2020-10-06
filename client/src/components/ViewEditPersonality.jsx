
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {Row,Col} from 'react-bootstrap';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";


export default function ViewEdit(props) {
    // console.log("LOADING ViewEditPersonality. Props: ", JSON.stringify(props));

        function personalityObj (traitsObj) {

            const trait1 = traitsObj.trait1.label;
            const trait2 = traitsObj.trait2.label;
            const tick1 = traitsObj.trait1.isTicked;
            const tick2 = traitsObj.trait2.isTicked;
            let val1, val2;
            if (traitsObj.value > 20) {
                val1 = traitsObj.value;
                val2 = 0;
            } else if (traitsObj.value < 0) {
                val1 = 0;
                val2 = 20 - traitsObj.value;
            } else {
                val1 = traitsObj.value;
                val2 = 20 - val1;
            }

            const result = {
                trait1:trait1,
                trait2:trait2,
                tick1: tick1,
                tick2: tick2,
                val1:val1,
                val2:val2
            }
            // console.log("personalityPair: ",result)
            return (result)
        }

        function changeValue(direction){
            console.log("DOING THIS: changeValue (",direction,")")
            let newVal = props.entry.value
            if (direction==="+") {
                
                newVal++;
            } else if (direction==="-") {
                
                newVal--;
                
            }
            console.log("Setting value to ",newVal);
            let newObj = props.entry;
            newObj.value = newVal
            props.saveEntry(props.group, props.entry._id, newObj, "trait");
        }

        function handleBoxTick(event){
            console.log("Handling Tick Event.")
            console.log("checked:",event.target.checked)
            
            if (event.target.name === 'tick1') {
                personalityPair.tick1=event.target.checked;
                console.log("personalityPair.tick1:",personalityPair.tick1)
                let newObj = props.entry;
                newObj.trait1.isTicked = personalityPair.tick1
                props.saveEntry(props.group, props.entry._id, newObj, "trait");
            } else if (event.target.name === 'tick2') {
                personalityPair.tick2=event.target.checked;
                console.log("personalityPair.tick2:",personalityPair.tick2);
                let newObj = props.entry;
                newObj.trait2.isTicked = personalityPair.tick2
                props.saveEntry(props.group, props.entry._id, newObj, "trait");
            }
            
        }

        let personalityPair = personalityObj(props.entry);
        
        return (
            <Row  className="pt-pair">
                {/* <Col md={1} className="line-container">
                    <input 
                        type="checkbox" 
                        id={props.entry._id+"_tick1"} 
                        name="tick1" 
                        className="trait1_tick" 
                        onClick={handleBoxTick} 
                        defaultChecked={personalityPair.tick1}
                    />
                </Col> */}
                <Col md={4} className="line-container trait">
                    <input 
                        type="checkbox" 
                        id={props.entry._id+"_tick1"} 
                        name="tick1" 
                        className="trait1_tick" 
                        onClick={handleBoxTick} 
                        defaultChecked={personalityPair.tick1}
                    />
                    <p className="trait trait1">{_.startCase(personalityPair.trait1)}</p>
                </Col>
                <Col md={1} className="line-container">
                    <div className="traitVals">
                        <FontAwesomeIcon icon={faPlusSquare} onClick={()=>changeValue("+")}/>
                    </div>
                </Col>
                <Col md={2} className="line-container">
                    <p className="traitVals">{personalityPair.val1+"/"+personalityPair.val2}</p>
                </Col>
                <Col md={1} className="line-container">
                    <div className="traitVals">
                        <FontAwesomeIcon icon={faPlusSquare} className="traitVals" onClick={()=>changeValue("-")}/>
                    </div>
                </Col>
                <Col md={4} className="line-container trait trait2">
                    <p className="trait trait2">{_.startCase(personalityPair.trait2)}</p>
                    <input 
                        type="checkbox" 
                        id={props.entry._id+"_tick2"} 
                        name="tick2" 
                        className="trait2_tick" 
                        onClick={handleBoxTick} 
                        defaultChecked={personalityPair.tick2}
                    />
                </Col>
                {/* <Col md={1} className="line-container">
                <input 
                        type="checkbox" 
                        id={props.entry._id+"_tick2"} 
                        name="tick2" 
                        className="trait2_tick" 
                        onClick={handleBoxTick} 
                        defaultChecked={personalityPair.tick2}
                    />
                </Col> */}
            </Row>
        )
}
