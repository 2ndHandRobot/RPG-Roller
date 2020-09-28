
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {Row,Col} from 'react-bootstrap';

export default function ViewEdit(props) {
    console.log("LOADING ViewEdit. Props: ", JSON.stringify(props));

    const [lab, setLab] = useState(props.entry.label);
    const [val, setVal] = useState(props.entry.value);
    const [editLabel, setEditLabel] = useState(false);
    const [editValue, setEditValue] = useState(false);

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
        
        switch (event.target.name){
            case "valueField":
                if ([27, 9].includes(event.charCode)) {
                    console.log("Not saving change: ", props.group," : ", props.entry._id," : ", val)
                    event.preventDefault();                    
                    console.log("Resetting edit states to [-/F]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditValue(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } else if ([13].includes(event.charCode)) {
                    console.log("Saving change: ", props.group," : ", props.entry._id," : ", val)
                    event.preventDefault();
                    props.saveEntry(props.group, props.entry._id, null, val);
                    console.log("Resetting edit states to [-/F]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditValue(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } 
                break;
            case "labelField":
                if ([27].includes(event.charCode)) {
                    console.log("Not saving change: ", props.group," : ", props.entry._id," : ", val)
                    event.preventDefault();
                    console.log("Resetting edit states to [F/-]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditLabel(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } else if ([13].includes(event.charCode)) {
                    console.log("Saving change: ", props.group," : ", props.entry._id," : ", _.startCase(lab))
                    event.preventDefault();
                    props.saveEntry(props.group, props.entry._id, lab);
                    console.log("Resetting edit states to [F/-]. Edit states are Label: ",editLabel," and Value: ",editValue);
                    setEditLabel(false);
                    console.log("States reset. Edit states are Label: ",editLabel," and Value: ",editValue);

                } else if ([9].includes(event.charCode)) {
                    console.log("Saving change: ", props.group," : ", props.entry._id," : ", _.startCase(lab))
                    event.preventDefault();
                    props.saveEntry(props.group, props.entry._id, lab);
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

console.log("Rendering: lab=",lab,", val='"+val+"'")
        return (
            <Row  className="lv-pair">
                <Col>
                    <div  id={"lab_"+props.entry._id} name="labField" className="label-field" onClick={!editValue&&((ev)=>{ev.stopPropagation();handleParaClick("val_"+props.entry._id)})}>
                        {editLabel
                        ? <input  name="labelField" className="label-input" onChange={handleChange} onKeyPress={handleKeyPress} value={_.startCase(lab)} />
                        : <p className="label-display" onClick={(ev)=>{ev.stopPropagation();handleParaClick("lab_"+props.entry._id)}}>{_.startCase(lab)}</p>}
                    </div>
                    <div key={"val_"+props.entry._id} id={"val_"+props.entry._id} name="valField" className="value-field"  onClick={!editValue&&((ev)=>{ev.stopPropagation();handleParaClick("val_"+props.entry._id)})}>
                        {editValue 
                        ? <input type={props.valType} name="valueField" className="value-input" onChange={handleChange} onKeyPress={handleKeyPress} value={val} />
                        : <p className={(val === '') ? "value-display placeholder-text" : "value-display"} onClick={(ev)=>{ev.stopPropagation();handleParaClick("val_"+props.entry._id)}} >{(val === '') ? "click to add info" : val}</p>}
                    </div>
                </Col>            
            </Row>
            )
}