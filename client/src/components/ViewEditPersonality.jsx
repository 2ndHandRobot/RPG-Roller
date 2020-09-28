
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {Row,Col} from 'react-bootstrap';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";


export default function ViewEdit(props) {
    // console.log("LOADING ViewEditPersonality. Props: ", JSON.stringify(props));

    // const [lab, setLab] = useState(props.entry.label);
    const [val, setVal] = useState(props.entry.value);
    // const [editLabel, setEditLabel] = useState(false);
    const [editValue, setEditValue] = useState(false);

    // function setDefaults() {
    //     setLab(props.entry.label);
    //     if (!props.entry.value) {
    //         // console.log("No 'entry.value'. Setting default")
    //         if (props.valType === "text") {
    //             setVal(" ");
    //         } else if (props.valType === "number") {
    //             setVal(0);
    //         }
    //     } else {
    //         setVal(props.entry.value);
    //     }
    // }

    // useEffect(()=> {
    //     // console.log("Loading ViewEdit... Setting Defaults")
    //     setDefaults()
    // },[]);

    // function handleChange(event){
    //     switch (event.target.name){
    //         case "valueField":
    //             setVal(event.target.value);
    //             break;
    //         case "labelField":
    //             setLab(event.target.value);
    //             break;
    //         // default:
    //     }
    // }

    // function handleKeyPress(event){
    //     console.log("keypress in div:",event.target.parentNode.id);
    //     const nodeId = event.target.parentNode.id;
    //     let clear = false;


    //     function clearNode(){
    //         console.log("Clearing node: ",nodeId)
    //         const old_element = document.getElementById(nodeId);
    //         const new_element = old_element.cloneNode(true);
    //         old_element.parentNode.replaceChild(new_element, old_element);
    //     }


    //     switch (event.target.name){
    //         case "valueField":
    //             if ([27, 9].includes(event.charCode)) {
    //                 console.log("Not saving change: ", props.group," : ", props.entry._id," : ", val)
    //                 event.preventDefault();
    //                 setDefaults();
    //                 console.log("Resetting edit states to [-/F]. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 setEditValue(false);
    //                 console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 clear = true;
    //             } else if ([13].includes(event.charCode)) {
    //                 console.log("Saving change: ", props.group," : ", props.entry._id," : ", val)
    //                 event.preventDefault();
    //                 props.saveEntry(props.group, props.entry._id, null, val);
    //                 setDefaults()
    //                 console.log("Resetting edit states to [-/F]. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 setEditValue(false, ()=>{alert(editValue)});
    //                 console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 clear = true;
    //             }
    //             break;
    //         case "labelField":
    //             if ([27].includes(event.charCode)) {
    //                 console.log("Not saving change: ", props.group," : ", props.entry._id," : ", val)
    //                 event.preventDefault();
    //                 setDefaults();
    //                 console.log("Resetting edit states to [F/-]. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 setEditLabel(false);
    //                 console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 clear = true;
    //             } else if ([13].includes(event.charCode)) {
    //                 console.log("Saving change: ", props.group," : ", props.entry._id," : ", _.startCase(lab))
    //                 event.preventDefault();
    //                 props.saveEntry(props.group, props.entry._id, lab);
    //                 setDefaults();
    //                 console.log("Resetting edit states to [F/-]. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 setEditLabel(false);
    //                 console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 clear = true;
    //             } else if ([9].includes(event.charCode)) {
    //                 console.log("Saving change: ", props.group," : ", props.entry._id," : ", _.startCase(lab))
    //                 event.preventDefault();
    //                 props.saveEntry(props.group, props.entry._id, lab);
    //                 setDefaults();
    //                 console.log("Resetting edit states to [F/T]. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 setEditLabel(false);
    //                 setEditValue(true);
    //                 console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);
    //                 clear = true;
    //             }
    //             break;
    //         default:
    //     }
    // }


    // function handleParaClick(elId){
    //     console.log("PARA CLICKED: ",elId)

    //     const element = document.getElementById(elId);
    //     console.log("ELEMENT ",elId,": ", element)
    //     const elType = elId.substring(0, 3);
    //     if (elType === "lab"){
    //         console.log("Label clicked. props.canEditLabel:",props.canEditLabel)
    //         if (props.canEditLabel) {
    //             console.log("Setting label edit mode & clickOutside listener.");
    //             setEditLabel(true);
    //             handleClickOutside(element);
    //         } else {
    //             console.log("Section is not editable.");
    //         }
    //     } else if (elType === "val"){
    //         console.log("Value clicked. props.canEditValue:",props.canEditValue)
    //         if (props.canEditValue) {
    //             console.log("Setting value edit mode & clickOutside listener.");
    //             setEditValue(true);
    //             handleClickOutside(element);
    //         } else {
    //             console.log("Section is not editable.");
    //         }
    //     }
    // }


    // function handleClick(elId){
    //     const element = document.getElementById(elId);
    //     console.log("ELEMENT ",elId,": ", element)
    //     const elType = elId.substring(0, 3);
    //     if (elType === "lab"){
    //         setEditLabel(true);
    //     } else if (elType === "val"){
    //         setEditValue(true);
    //     }
    //     // handleClickOutside(element)
    // }


    // function handleClickOutside(element) {
    //     console.log("LISTENER ELEMENT: ", element)
    //     const outsideClickListener = event => {
    //         console.log("OUTSIDE CLICK triggered. event.target: ",event.target)
    //         if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
    //             console.log("Click outside element: ",element);
    //             console.log("element.name: ",element.getAttribute("name"));
    //             const elType = element.getAttribute("name").substring(0,3);
    //             if (elType === "lab"){
    //                 setLab(props.entry.label);
    //                 setEditLabel(false);
    //             } else if (elType === "val"){
    //                 setDefaults();
    //                 setEditValue(false);
    //             }
    //             removeClickListener()
    //         }
    //     }

    //     const removeClickListener = () => {
    //         window.removeEventListener('click', outsideClickListener)
    //     }
    //     window.addEventListener('click', outsideClickListener)
    // }

        function personalityObj (traitsObj) {

            const trait1 = traitsObj.traits.trait1;
            const trait2 = traitsObj.traits.trait2;
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
            props.saveEntry(props.group, props.entry._id, null, newVal);
        }

        let personalityPair = personalityObj(props.entry);
        console.log("personalityPair defined: ",personalityPair)

        // return (
        //     <Row  className="lv-pair">
        //         <Col>
        //             {/* <div  id={"lab_"+props.entry._id} name="labField" className="label-field" onClick={(ev)=>{ev.stopPropagation();handleDivClick("lab_"+props.entry._id)}}> */}
        //             <div  id={"lab_"+props.entry._id} name="labField" className="label-field">
        //                 {editLabel
        //                 ? <input  name="labelField" className="label-input" onChange={handleChange} onKeyPress={handleKeyPress} value={_.startCase(lab)} />
        //                 : <p  onClick={(ev)=>{ev.stopPropagation();handleParaClick("lab_"+props.entry._id)}}>{_.startCase(lab)}</p>}
        //             </div>
        //             {/* <div key={"val_"+props.entry._id} id={"val_"+props.entry._id} name="valField" className="value-field"  onClick={(ev)=>{ev.stopPropagation();handleDivClick("val_"+props.entry._id)}}> */}
        //             <div key={"val_"+props.entry._id} id={"val_"+props.entry._id} name="valField" className="value-field">
        //                 {editValue
        //                 ? <input type={props.valType} name="valueField" className="value-input" onChange={handleChange} onKeyPress={handleKeyPress} value={val} />
        //                 : <p onClick={(ev)=>{ev.stopPropagation();handleParaClick("val_"+props.entry._id)}}>{val}</p>}
        //             </div>
        //         </Col>
        //     </Row>
        //     )
        return (
            <Row  className="pt-pair">
                <Col md={4} className="line-container">
                    <p className="trait1">{_.startCase(personalityPair.trait1)}</p>
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
                <Col md={4} className="line-container">
                    <p className="trait2">{_.startCase(personalityPair.trait2)}</p>
                </Col>
            </Row>
        )
}
