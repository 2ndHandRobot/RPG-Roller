import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import Disp from '../DisplayState';

import ViewEdit from './ViewEdit';


export default function Animal(props) {
    console.log("ANIMAL:: loading component. Props:",props)
    // const [animalId,setAnimalId] = useState(props.data._id)
    // console.log("animalId:", animalId)
    // const [editMode,setEditMode] = useState(false);
    const [animalData, setAnimalData] = useState(props.data);

    console.log("animalData:", animalData)
    // console.log("animalData.who:", animalData.who)
    // console.log("animalData.stats:", animalData.stats)
    function auxValueChange(props){
        console.log("ANIMAL:: DOING: auxValueChange")
        console.log("props:",props)
        let payload = props;
    }

    useEffect(()=>{
        if (props.data!==animalData){
            setAnimalData(props.data)
        }
    });
    // useEffect(()=>{
        
    //     if (props.editInProgress!==editMode){
    //         setEditMode(props.editInProgress)
    //     }
    // });

console.log("Loading Animal sheet with props.editInProgress:",props.editInProgress)
    
    function saveAnimalEdit(thisprops){
        const payload = {
            auxId: animalData._id,
            auxType: "animals",
            group: thisprops.group,
            field: thisprops.field,
            value: thisprops.value,
            fieldId: thisprops.fieldId
        }
        props.saveAuxiliary(payload)
    }
    function handleBoxTick(event, fieldId){
        console.log("Handling Tick Event on",fieldId)
        console.log("checked:",event.target.checked)
        
        // if (event.target.group === "armour") {
        //     console.log("ticked an armour box. Updating total")
            
        //     for (var a of sArmour) {
        //         console.log("sArmour item:",a)
        //         if (a._id === event.target.id) {
        //             console.log("sArmour matched:",a)
        //             a.isTicked=!a.isTicked;
        //         }
        //     }
            
        //     setArmourVal(calcArmourValue())
        // }

        const payload = {
            group: event.target.group,
            field: "isTicked",
            value: event.target.checked,
            fieldId: fieldId
        }
        props.saveAnimalEdit(payload);
        
        
    }
    return (
        <div>
            {animalData.who.map((whoItem, whoIndex)=>{
                console.log("whoItem:",whoItem)
                return (
            <Row className="lv-pair">
            <Col xs={6} lg={6} className="char-col-left">
                <ViewEdit
                    key={whoItem._id+"_lab"} 
                    id={whoItem._id+"_lab"}
                    fieldId={whoItem._id}
                    group="who"
                    field="label"
                    value={whoItem.label || ''}
                    placeHolderText="add animal type"
                    addWindowClickListener={props.addWindowClickListener}
                    removeWindowClickListeners={props.removeWindowClickListeners}
                    editInProgress={props.editInProgress}
                    setEditInProgress={props.setEditInProgress}
                    saveEdit={saveAnimalEdit}
                />
            </Col>
            <Col xs={6} lg={6} className="char-col-right">
                <ViewEdit
                    key={whoItem._id+"_val"} 
                    id={whoItem._id+"_val"}
                    fieldId={whoItem._id}
                    group="who"
                    field="value"
                    value={whoItem.value || ''}
                    placeHolderText="add name"
                    addWindowClickListener={props.addWindowClickListener}
                    removeWindowClickListeners={props.removeWindowClickListeners}
                    editInProgress={props.editInProgress}
                    setEditInProgress={props.setEditInProgress}
                    saveEdit={saveAnimalEdit}
                />
            </Col>            
        </Row>
        )
            })}
            <hr />
            <Row>
            <Col xs={12} lg={6}>
            {animalData.about.map((desc, descIndex)=>{
                console.log("desc:",desc)
                return (
                    <div key={"desc_div_"+descIndex}>
                    <Row className="lv-pair">
                        <Col xs={6} lg={6} className="char-col-left">
                            <ViewEdit
                                key={desc._id+"about"+descIndex+"_lab"} 
                                id={desc._id+"about"+descIndex+"_lab"}
                                fieldId={desc._id}
                                group="about"
                                field="label"
                                // lockEdit={true}
                                value={desc.label || ''}
                                placeHolderText='click to add info'
                                addWindowClickListener={props.addWindowClickListener}
                                removeWindowClickListeners={props.removeWindowClickListeners}
                                editInProgress={props.editInProgress}
                                setEditInProgress={props.setEditInProgress}
                                saveEdit={saveAnimalEdit}
                            />
                        </Col>
                        <Col xs={6} lg={6} className="char-col-right">
                            <ViewEdit
                                key={desc._id+"about"+descIndex+"_val"} 
                                id={desc._id+"about"+descIndex+"_val"}
                                fieldId={desc._id}
                                group="about"
                                field="value"
                                value={desc.value || ''}
                                placeHolderText='click to add info'
                                addWindowClickListener={props.addWindowClickListener}
                                removeWindowClickListeners={props.removeWindowClickListeners}
                                editInProgress={props.editInProgress}
                                setEditInProgress={props.setEditInProgress}
                                saveEdit={saveAnimalEdit}
                            />
                        </Col>            
                    </Row>
                    </div>
                )
            })}
            </Col>
            <hr />
            
            <Col xs={12} lg={6}>
                    {animalData.stats.map((stat, statIndex)=>{
                        {/* console.log("stat:",stat) */}
                        return (
                            <div key={"stat_div_"+statIndex}>
                            <Row className="lv-pair">
                                <Col xs={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={stat._id+"_tick"} 
                                            group="stats" 
                                            field="checkBox"
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, stat._id)}} 
                                            defaultChecked={stat.isTicked}
                                        />
                                    </Col>
                                <Col xs={(_.lowerCase(stat.label)==="damage")?8:9} className="label_col">
                                    <ViewEdit
                                        key={stat._id+"stats"+statIndex+"_lab"} 
                                        id={stat._id+"stats"+statIndex+"_lab"}
                                        fieldId={stat._id}
                                        group="stats"
                                        field="label"
                                        // lockEdit={true}
                                        value={stat.label || ''}
                                        placeHolderText='click to add new statistic'
                                        addWindowClickListener={props.addWindowClickListener}
                                        removeWindowClickListeners={props.removeWindowClickListeners}
                                        editInProgress={props.editInProgress}
                                        setEditInProgress={props.setEditInProgress}
                                        saveEdit={saveAnimalEdit}
                                    />
                                </Col>
                                <Col xs={2} className="value_col">
                                    <ViewEdit
                                        key={stat._id+"stats"+statIndex+"_val"} 
                                        id={stat._id+"stats"+statIndex+"_val"}
                                        fieldId={stat._id}
                                        group="stats"
                                        field="value"
                                        value={stat.value || 0}
                                        placeHolderText={"0"}
                                        addWindowClickListener={props.addWindowClickListener}
                                        removeWindowClickListeners={props.removeWindowClickListeners}
                                        editInProgress={props.editInProgress}
                                        setEditInProgress={props.setEditInProgress}
                                        saveEdit={saveAnimalEdit}
                                    />
                                </Col>
                                {
                                    (_.lowerCase(stat.label)==="damage")
                                    &&<Col xs={1} className="suffix_col container">
                                        <p>d6</p>
                                    </Col>            
                                }
                            </Row>
                        </div>
                        )
                    })}
                </Col>
                </Row>
        </div>
    )        
    

    }   