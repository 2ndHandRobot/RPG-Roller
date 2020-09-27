
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {Row,Col} from 'react-bootstrap';

export default function ViewEdit(props) {
    // console.log("LOADING ViewEdit. Props: ", JSON.stringify(props));

    const [lab, setLab] = useState(props.entry.label);
    const [val, setVal] = useState(props.entry.value);
    const [editLabel, setEditLabel] = useState(false);
    const [editValue, setEditValue] = useState(false);

    function setDefaults() {
        setLab(props.entry.label);
        if (!props.entry.value) {
            // console.log("No 'entry.value'. Setting default")
            if (props.valType === "text") {
                setVal(" ");
            } else if (props.valType === "number") {
                setVal(0);
            }
        } else {
            setVal(props.entry.value);
        }
    }
    
    useEffect(()=> {
        // console.log("Loading ViewEdit... Setting Defaults")
        setDefaults()
    },[]);

    function handleChange(event){
        switch (event.target.name){
            case "valueField":
                setVal(event.target.value);
                break;
            case "labelField":
                setLab(event.target.value);
                break;
            // default:
        }
    }

    function handleKeyPress(event){
        console.log("keypress in div:",event.target.parentNode.id);
        const nodeId = event.target.parentNode.id;
        let clear = false;

            
        function clearNode(){
            console.log("Clearing node: ",nodeId)
            const old_element = document.getElementById(nodeId);
            const new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
        }

        
        switch (event.target.name){
            case "valueField":
                if ([27, 9].includes(event.charCode)) {
                    console.log("Not saving change: ", props.group," : ", props.entry._id," : ", val)
                    event.preventDefault();
                    setDefaults();
                    console.log("Resetting edit states to [-/F]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditValue(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } else if ([13].includes(event.charCode)) {
                    console.log("Saving change: ", props.group," : ", props.entry._id," : ", val)
                    event.preventDefault();
                    props.saveEntry(props.group, props.entry._id, null, val);
                    setDefaults()
                    console.log("Resetting edit states to [-/F]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditValue(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } 
                break;
            case "labelField":
                if ([27].includes(event.charCode)) {
                    console.log("Not saving change: ", props.group," : ", props.entry._id," : ", val)
                    event.preventDefault();
                    setDefaults();
                    console.log("Resetting edit states to [F/-]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditLabel(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } else if ([13].includes(event.charCode)) {
                    console.log("Saving change: ", props.group," : ", props.entry._id," : ", _.startCase(lab))
                    event.preventDefault();
                    props.saveEntry(props.group, props.entry._id, lab);
                    setDefaults();
                    console.log("Resetting edit states to [F/-]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditLabel(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } else if ([9].includes(event.charCode)) {
                    console.log("Saving change: ", props.group," : ", props.entry._id," : ", _.startCase(lab))
                    event.preventDefault();
                    props.saveEntry(props.group, props.entry._id, lab);
                    setDefaults();
                    console.log("Resetting edit states to [F/T]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditLabel(false);
                    setEditValue(true);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                }
                break;
            default:
        }
    }


    function handleParaClick(elId){
        console.log("PARA CLICKED: ",elId)
    
        const element = document.getElementById(elId);
        console.log("ELEMENT ",elId,": ", element)
        const elType = elId.substring(0, 3);
        if (elType === "lab"){
            console.log("Label clicked. props.canEditLabel:",props.canEditLabel)
            if (props.canEditLabel) { 
                console.log("Setting label edit mode & clickOutside listener.");
                setEditLabel(true);
                handleClickOutside(element);
            } else {
                console.log("Section is not editable.");
            }
        } else if (elType === "val"){
            console.log("Value clicked. props.canEditValue:",props.canEditValue)
            if (props.canEditValue) {
                console.log("Setting value edit mode & clickOutside listener.");
                setEditValue(true);
                handleClickOutside(element);
            } else {
                console.log("Section is not editable.");
            }
        } 
    }

    
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


    function handleClickOutside(element) {
        console.log("LISTENER ELEMENT: ", element)
        const outsideClickListener = event => {
            console.log("OUTSIDE CLICK triggered. event.target: ",event.target)
            if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
                console.log("Click outside element: ",element);
                console.log("element.name: ",element.getAttribute("name"));
                const elType = element.getAttribute("name").substring(0,3);
                if (elType === "lab"){
                    setLab(props.entry.label);
                    setEditLabel(false);
                } else if (elType === "val"){
                    setDefaults();
                    setEditValue(false);
                }
                removeClickListener()
            }
        }
    
        const removeClickListener = () => {
            window.removeEventListener('click', outsideClickListener)
        }
        window.addEventListener('click', outsideClickListener)
    }

 
        return (
            <Row  className="lv-pair">
                <Col>
                    <div  id={"lab_"+props.entry._id} name="labField" className="label-field" onClick={!editValue&&((ev)=>{ev.stopPropagation();handleParaClick("val_"+props.entry._id)})}>
                    {/* <div  id={"lab_"+props.entry._id} name="labField" className="label-field"> */}
                        {editLabel
                        ? <input  name="labelField" className="label-input" onChange={handleChange} onKeyPress={handleKeyPress} value={_.startCase(lab)} />
                        : <p className="label-display" onClick={(ev)=>{ev.stopPropagation();handleParaClick("lab_"+props.entry._id)}}>{_.startCase(lab)}</p>}
                    </div>
                    <div key={"val_"+props.entry._id} id={"val_"+props.entry._id} name="valField" className="value-field"  onClick={!editValue&&((ev)=>{ev.stopPropagation();handleParaClick("val_"+props.entry._id)})}>
                    {/* <div key={"val_"+props.entry._id} id={"val_"+props.entry._id} name="valField" className="value-field"> */}
                        {editValue 
                        ? <input type={props.valType} name="valueField" className="value-input" onChange={handleChange} onKeyPress={handleKeyPress} value={val} />
                        : <p className="value-display" onClick={(ev)=>{ev.stopPropagation();handleParaClick("val_"+props.entry._id)}}>{val}</p>}
                    </div>
                </Col>            
            </Row>
            )
}