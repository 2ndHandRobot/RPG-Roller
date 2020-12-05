
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {Row,Col} from 'react-bootstrap';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";


export default function ViewEdit(props) {
    console.log("LOADING ViewEditPersonality. Props: ", JSON.stringify(props));

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
        
        

        function isReligious(trait){
            let religiousTraitList = {
                'Arian Christian': ['Chaste', 'Honest', 'Just', 'Merciful', 'Temperate'],
                'British Christian': ['Chaste', 'Energetic', 'Generous', 'Modest', 'Temperate'],
                'Roman Christian': ['Chaste', 'Forgiving', 'Merciful', 'Modest', 'Temperate'],
                'Christian': ['Chaste', 'Forgiving', 'Merciful', 'Modest', 'Temperate'],
                Heathen: ['Vengeful', 'Honest', 'Proud', 'Arbitrary', 'Worldly'],
                Jewish: ['Chaste', 'Energetic', 'Just', 'Prudent', 'Temperate'],
                'British Pagan': ['Lustful', 'Energetic', 'Generous', 'Honest', 'Proud'],
                'Pagan': ['Lustful', 'Energetic', 'Generous', 'Honest', 'Proud'],
                'Germanic Pagan': ['Generous', 'Proud', 'Worldly', 'Reckless', 'Indulgent'],
            }

            console.log("Religious traits:",religiousTraitList[props.religion],". Looking for:",trait)
            const relTraits = religiousTraitList[props.religion]
            console.log("Religious traits:",relTraits)
            let isRel = false;
            if (relTraits !== undefined){
                isRel = relTraits.includes(_.capitalize(trait))
            }
            
            return isRel
        }

        function isChivalrous(trait){
            const chivalrousTraitList = ['Energetic','Generous','Just','Merciful','Modest','Valorous']
            console.log("Chivalrous traits:",chivalrousTraitList,". Looking for:",_.capitalize(trait))
            
            const isChiv = chivalrousTraitList.includes(_.capitalize(trait))
            if (isChiv) {console.log(trait,"is chivalrous")}
            
            return isChiv
        }
       
        function PersonalityPair(props) {
            console.log("buildPersonalityPair:",props.val1,"/",props.val2)
            let v1Style = {}
            let v2Style = {}
            
            if (props.val1 > 15) {
                v1Style = {fontWeight:'bold'}
            } else if (props.val2 > 15) {
                v2Style = {fontWeight:'bold'}
            }
            
            return (
                <p className="traitVals">
                    <span style={v1Style}>
                        {props.val1}
                    </span>
                    /
                    <span style={v2Style}>
                        {props.val2}
                    </span>
                </p>
            )   
        }

        let personalityPair = personalityObj(props.entry);
        
        return (
            <Row  className="pt-pair">
                {/* <Col lg={1} className="line-container">
                    <input 
                        type="checkbox" 
                        id={props.entry._id+"_tick1"} 
                        name="tick1" 
                        className="trait1_tick" 
                        onClick={handleBoxTick} 
                        defaultChecked={personalityPair.tick1}
                    />
                </Col> */}
                <Col xs={4} lg={4} className="line-container trait">
                    <input 
                        type="checkbox" 
                        id={props.entry._id+"_tick1"} 
                        name="tick1" 
                        className="trait1_tick" 
                        onClick={handleBoxTick} 
                        defaultChecked={personalityPair.tick1}
                    />
                    <p className={
                        (isReligious(personalityPair.trait1)?"religious-trait ":"")
                        +(isChivalrous(personalityPair.trait1)?"chivalrous-trait ":"")
                        +"trait trait1"
                    }>
                        {_.startCase(personalityPair.trait1)}
                    </p>
                </Col>
                <Col xs={1} lg={1} className="line-container text-right">
                    <div className="traitVals">
                        <FontAwesomeIcon icon={faPlusSquare} onClick={()=>changeValue("+")}/>
                    </div>
                </Col>
                <Col xs={2} lg={2} className="line-container">
                    <PersonalityPair val1={personalityPair.val1} val2={personalityPair.val2} />
                </Col>
                <Col xs={1} lg={1} className="line-container text-left">
                    <div className="traitVals">
                        <FontAwesomeIcon icon={faPlusSquare} className="traitVals" onClick={()=>changeValue("-")}/>
                    </div>
                </Col>
                <Col xs={4} lg={4} className="line-container trait trait2">
                    <p className={
                        (isReligious(personalityPair.trait2)?"religious-trait ":"")
                        +(isChivalrous(personalityPair.trait2)?"chivalrous-trait ":"")
                        +"trait trait2"
                    }>{_.startCase(personalityPair.trait2)}</p>
                    <input 
                        type="checkbox" 
                        id={props.entry._id+"_tick2"} 
                        name="tick2" 
                        className="trait2_tick" 
                        onClick={handleBoxTick} 
                        defaultChecked={personalityPair.tick2}
                    />
                </Col>
                {/* <Col lg={1} className="line-container">
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
