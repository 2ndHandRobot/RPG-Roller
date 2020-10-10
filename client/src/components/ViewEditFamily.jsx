import React, { useState } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import ViewEdit from './ViewEdit';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faHeart, faMars, faVenus, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import _ from 'lodash';

// DESCRIPTION
// This ViewEdit Group component displays details about individuals
// Displayed information includes single ViewEdits for Name and age, and a ViewEdit list for things they are "famous for" 
// It also includes gender toggle (male = true / female = false) and a living/dead toggle (deceased = true / alive = false)


// PROPS 
// The component receives as props a string indicating the person's family group, and a FamilyMember object with their details
// Family Group: props.familyGroup
// ID: props.person.id (string)
// Name: props.person.name (string)
// Age: props.person.age (number)
// Gender: props.person.male (boolean)
// Alive/Dead: props.person.deceased (boolean)
// Famous For: props.person.reputation (array of strings)
//
// Also transferred in props are the ViewEdit functions:
// functions: props.[+function name]


// const FamilyMemberSchema = new mongoose.Schema({
//     index: Number,
//     who: LabelStringPairSchema,
//     male: Boolean,
//     age: Number,
//     glory: Number,
//     deceased: Boolean,
//     reputation: [String]
// })

    function ViewEditFamily (props) {   
        // console.log("LOADING ViewEditFamily. Props:",props)

        const [showReputation, setShowReputation] = useState(false)
        
        const index = props.value.index
        // console.log("index:",index);
        const personId = props.value._id
        // console.log("personId:",personId);
        const who = props.value.who;
        // console.log("who:",who);
        const male = props.value.male;
        // console.log("male:",male);
        const age = props.value.age || 0;
        // console.log("age:",age);
        const glory = props.value.glory || 0;
        // console.log("glory:",glory);
        const deceased = props.value.deceased;
        // console.log("deceased:",deceased);
        const reputation = props.value.reputation || [];
        // console.log("reputation:",reputation);

        function toggleData(toggle, newVal) {
            const data = {
                group: "family",
                field: toggle,
                value: newVal,
                fieldId: personId
            };
            
            console.log("Toggle data:",data)
            props.saveEdit(data)
        }

        return (
            <div>
                <Row  className="lv-pair">
                    <Col xs={6} lg={6}>
                        <ViewEdit 
                            key={"who_label_"+personId} 
                            id={"who_label_"+personId} 
                            name={personId}
                            group="family"
                            field="who.label"
                            value={who.label}
                            addWindowClickListener={props.addWindowClickListener}
                            removeWindowClickListeners={props.removeWindowClickListeners}
                            editInProgress={props.editInProgress}
                            setEditInProgress={props.setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                        
                    </Col>
                    <Col xs={6} lg={6}>
                        <ViewEdit 
                            key={"who_value_"+personId} 
                            id={"who_value_"+personId} 
                            name={personId}
                            group="family"
                            field="who.value"
                            value={who.value}
                            placeHolderText="add name"
                            addWindowClickListener={props.addWindowClickListener}
                            removeWindowClickListeners={props.removeWindowClickListeners}
                            editInProgress={props.editInProgress}
                            setEditInProgress={props.setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </Col>            
                </Row>
                <Row className="family-row" >
                    <Col xs={1} lg={1} className="family-col" >
                        { male
                            ? <FontAwesomeIcon icon={faMars} name="gender" onClick={()=>toggleData("male",false)}/>
                            : <FontAwesomeIcon icon={faVenus} name="gender" onClick={()=>toggleData("male",true)}/>
                        }
                    </Col>
                    <Col xs={1} lg={1} className="family-col" >
                        { deceased
                            ? <FontAwesomeIcon icon={faSkullCrossbones} name="dead" onClick={()=>toggleData("deceased",false)}/>
                            : <FontAwesomeIcon icon={faHeart} name="dead" onClick={()=>toggleData("deceased",true)}/>
                        }
                    </Col>
                    <Col xs={4} lg={4}className="family-col" >
                        <div className="family-stat" >
                            <p>Age:</p>
                            <ViewEdit 
                                key={"age_"+personId} 
                                id={"age_"+personId} 
                                name={personId}
                                group={"family"}
                                field="age"
                                value={age}
                                placeHolderText="___"
                                addWindowClickListener={props.addWindowClickListener}
                                removeWindowClickListeners={props.removeWindowClickListeners}
                                editInProgress={props.editInProgress}
                                setEditInProgress={props.setEditInProgress}
                                saveEdit={props.saveEdit}
                            />
                        </div>
                    </Col>
                    <Col xs={5} lg={5}className="family-col" >
                        <div className="family-stat" >
                        <p>Glory:</p>
                            <ViewEdit 
                                key={"glory_"+personId} 
                                id={"glory_"+personId} 
                                name={''}
                                group={"family"}
                                field="glory"
                                value={glory}
                                placeHolderText="_____"
                                addWindowClickListener={props.addWindowClickListener}
                                removeWindowClickListeners={props.removeWindowClickListeners}
                                editInProgress={props.editInProgress}
                                setEditInProgress={props.setEditInProgress}
                                saveEdit={props.saveEdit}
                            />
                        </div>
                    </Col>
                    <Col xs={1} lg={1} className="family-col" >
                        <FontAwesomeIcon 
                            icon={faStar} 
                            name="deceased" 
                            aria-expanded={props.showStatus}
                            aria-controls={"rep_block"+personId}
                            onClick={()=>setShowReputation(!showReputation)}
                        />
                        {showReputation 
                        ?   <FontAwesomeIcon 
                            icon={faChevronUp} 
                            name="deceased" 
                            aria-expanded={props.showStatus}
                            aria-controls={"rep_block"+personId}
                            onClick={()=>setShowReputation(!showReputation)}
                        />
                        : <FontAwesomeIcon 
                            icon={faChevronDown} 
                            name="deceased" 
                            aria-expanded={props.showStatus}
                            aria-controls={"rep_block"+personId}
                            onClick={()=>setShowReputation(!showReputation)}
                        />}
                    </Col>
                </Row>
                <Collapse in={showReputation}>
                    <div id={"rep_block"+personId} >
                        {(reputation.length>0)&&(<p>Reputation:</p>)}
                        {reputation.map((famousTrait, index)=>{
                            return (
                                <ViewEdit 
                                    key={"reputation_"+index+"_"+personId} 
                                    id={"reputation_"+index+"_"+personId} 
                                    name={index}
                                    group={"family.reputation"}
                                    nestedId={personId}
                                    field="single"
                                    value={famousTrait}
                                    addWindowClickListener={props.addWindowClickListener}
                                    removeWindowClickListeners={props.removeWindowClickListeners}
                                    editInProgress={props.editInProgress}
                                    setEditInProgress={props.setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            )
                        })}
                        <ViewEdit 
                            key={"reputation_new_"+personId} 
                            id={"reputation_new_"+personId} 
                            name={''}
                            group={"family.reputation"}
                            nestedId={personId}
                            field="single"
                            value={''}
                            placeHolderText="add reputation"
                            addWindowClickListener={props.addWindowClickListener}
                            removeWindowClickListeners={props.removeWindowClickListeners}
                            editInProgress={props.editInProgress}
                            setEditInProgress={props.setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </div>
                </Collapse>
            </div>
        )
    }


export default ViewEditFamily;