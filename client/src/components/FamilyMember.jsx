import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import ViewEdit from './ViewEdit';

import Disp from '../DisplayState';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faGem, faSkullCrossbones, faHeart, faMars, faVenus, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

// import _ from 'lodash';

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

    function FamilyMember (props) {   
        console.log("LOADING FamilyMember. Props:",props)

        
        
        // const [auxData, setAuxData] = useState(props.data);
        const personId = props.data._id
        let isMale = getStatus("male")
        let isDeceased = getStatus("deceased")
        
        const [showEquipment, setShowEquipment] = useState(Disp.getToggleState("eqpt_block_"+personId))
        const [showReputation, setShowReputation] = useState(Disp.getToggleState("rep_block_"+personId))
        
        const [armourVal, setArmourVal] = useState();
        useEffect(()=>{
            console.log("FAMILYMEMBER :: useEffect Armour Calculation");
            const armCalc = calcArmourValue();
            if (armourVal!==armCalc){
                setArmourVal(calcArmourValue)
            }
        },[]);
        useEffect(()=>{console.log("FAMILYMEMBER :: useEffect View Toggles");setViewToggles()},[props.data._id])
        
        function setViewToggles() {
            setShowEquipment(Disp.getToggleState("eqpt_block_"+personId))
            setShowReputation(Disp.getToggleState("rep_block_"+personId))
        }
        function calcArmourValue() {
            console.log("FAMILYMEMBER :: DOING: calcArmourValue: ")
            const equippedArmour = props.data.aux_armour.filter(a=>a.isTicked).map(a=>a.value)
            let sumArmour = 0;
            console.log("FAMILYMEMBER :: calcArmourValue: equippedArmour:",equippedArmour)
            if (equippedArmour.length>0){
                sumArmour = equippedArmour.reduce((a,b)=>a+b);
            }
            console.log("FAMILYMEMBER :: calcArmourValue: new armour value is:",sumArmour)
            return sumArmour;
        }

        function handleBoxTick(event, fieldId){
            console.log("FAMILYMEMBER :: DOING: handleBoxTick on",fieldId)
            console.log("FAMILYMEMBER :: handleBoxTick: checked:",event.target.checked)
            
            if (event.target.name === "armour") {
                console.log("FAMILYMEMBER :: handleBoxTick: ticked an armour box. Updating total")
                
                for (var a of props.data.aux_armour) {
                    console.log("FAMILYMEMBER :: handleBoxTick: (loop) armour item:",a)
                    if (a._id === event.target.id) {
                        console.log("FAMILYMEMBER :: handleBoxTick: (loop) armour matched:",a)
                        a.isTicked=!a.isTicked;
                    }
                }
                
                setArmourVal(calcArmourValue())
            }
    
            const payload = {
                group: event.target.name,
                field: "isTicked",
                value: event.target.checked,
                fieldId: fieldId
            }
            saveFamilyMemberEdit(payload);
            
            
        }
        function getStatus(findStatus) {
            console.log("FAMILYMEMBER :: DOING: getStatus")
            if (props.data.status) {
                for (var stts of props.data.status) {
                    if (stts.label===findStatus) {
                        // console.log("Status value (",findStatus,") :",stts.value)
                        return (stts.value)
                    }
                }
            } else {
                return false
            }
        }
        
        function getStatusId(findStatus) {
            console.log("FAMILYMEMBER :: DOING: getStatusId")
            if (props.data.status) {
                for (var stts of props.data.status) {
                    if (stts.label===findStatus) {
                        // console.log("Status _id (",findStatus,") :",stts._id)
                        return (stts._id)
                    }
                }
            }
        }
        

        async function saveFamilyMemberEdit(thisprops){
            console.log("FAMILYMEMBER :: DOING: saveFamilyMember. props:",thisprops)
            const payload = {
                auxId: personId,
                auxType: "familyMembers",
                group: thisprops.group,
                field: thisprops.field,
                value: thisprops.value,
                fieldId: thisprops.fieldId
            }
            const newData = await props.saveAuxiliary(payload)
            // console.log("Data returned from save:",newData)
            // setAuxData(newData);
        }
        
        function toggleData(field, newVal) {
            console.log("FAMILYMEMBER :: DOING: toggleData. field/newVal:",field,"/", newVal)
            const data = {
                auxId: personId,
                auxType: "familyMembers",
                group: "status",
                field: "value",
                value: newVal,
                fieldId: getStatusId(field)
            };
            
            console.log("Toggle data:",data)
            saveFamilyMemberEdit(data)
        }
        
        function handleToggleClick(eventTarget) {
            console.log("FAMILYMEMBER :: DOING: saveFamilyMember. eventTarget:",eventTarget)
            const toggleId = eventTarget
            const toggleState = Disp.getToggleState(toggleId)
            
            console.log("FAMILYMEMBER :: handleToggleClick: saving toggle state for", toggleId,". CHanging from",toggleState)
            console.log("FAMILYMEMBER :: handleToggleClick: Event target:",eventTarget)
            if (toggleState) {
                Disp.clearToggleState(toggleId)
            } else {
                Disp.setToggleState(toggleId)
            }
            
            console.log("FAMILYMEMBER :: handleToggleClick: Saved toggle state now", Disp.getToggleState(toggleId))
            
        }

        return (
            <Row>
                <Col xs={12} lg={6}> {/* Aux Sheet left column */}
                    <div name="who_block" className="ghost-div">
                        {props.data.who.map((whoItem,whoIndex)=>{
                            return(
                                <Row key={whoItem._id+"_row_"+whoIndex} className="lv-pair">
                                    <Col xs={6} lg={6} className="char-col-left">
                                        <ViewEdit 
                                            key={whoItem._id+"_lab"} 
                                            id={whoItem._id+"_lab"} 
                                            name={"who_lab"}
                                            group="who"
                                            field="label"
                                            fieldId={whoItem._id}
                                            value={whoItem.label}
                                            placeHolderText="add relation type"
                                            addWindowClickListener={props.addWindowClickListener}
                                            removeWindowClickListeners={props.removeWindowClickListeners}
                                            editInProgress={props.editInProgress}
                                            setEditInProgress={props.setEditInProgress}
                                            saveEdit={saveFamilyMemberEdit}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6} className="char-col-right">
                                        <ViewEdit 
                                            key={whoItem._id+"_val"} 
                                            id={whoItem._id+"_val"} 
                                            name={"who_val"}
                                            group="who"
                                            field="value"
                                            fieldId={whoItem._id}
                                            value={whoItem.value}
                                            placeHolderText="add name"
                                            addWindowClickListener={props.addWindowClickListener}
                                            removeWindowClickListeners={props.removeWindowClickListeners}
                                            editInProgress={props.editInProgress}
                                            setEditInProgress={props.setEditInProgress}
                                            saveEdit={saveFamilyMemberEdit}
                                        />
                                    </Col>            
                                </Row>
                            )
                        })}
                    </div>
                        
                    <div name="status_block" className="ghost-div">
                        <Row>
                            <Col xs={3}></Col>
                            <Col xs={3} className="family-col" >
                                { (isMale===true)
                                    ? <FontAwesomeIcon icon={faMars} name="gender" data-toggle="tooltip" title="male" onClick={()=>toggleData("male",false)}/>
                                    : <FontAwesomeIcon icon={faVenus} name="gender" data-toggle="tooltip" title="female" onClick={()=>toggleData("male",true)}/>
                                }
                            </Col>
                            <Col xs={3} className="family-col" >
                                { (isDeceased===true)
                                    ? <FontAwesomeIcon icon={faSkullCrossbones} name="dead" data-toggle="tooltip" title="deceased" onClick={()=>toggleData("deceased",false)}/>
                                    : <FontAwesomeIcon icon={faHeart} name="dead" data-toggle="tooltip" title="alive" onClick={()=>toggleData("deceased",true)}/>
                                }
                            </Col>
                            <Col xs={3}></Col>
                        </Row>
                    </div>
            
                    <div name="about_block" className="ghost-div">
                        {props.data.about.map((aboutItem,aboutIndex)=>{
                            return(
                                <Row key={aboutItem._id+"_row_"+aboutIndex}  className="lv-pair">
                                    <Col xs={6} lg={6} className="char-col-left">
                                        <ViewEdit 
                                            key={aboutItem._id+"_lab"} 
                                            id={aboutItem._id+"_lab"} 
                                            name={"about_lab"}
                                            group="about"
                                            field="label"
                                            fieldId={aboutItem._id}
                                            value={aboutItem.label}
                                            placeHolderText="add info"
                                            addWindowClickListener={props.addWindowClickListener}
                                            removeWindowClickListeners={props.removeWindowClickListeners}
                                            editInProgress={props.editInProgress}
                                            setEditInProgress={props.setEditInProgress}
                                            saveEdit={saveFamilyMemberEdit}
                                        />
                                        
                                    </Col>
                                    <Col xs={6} lg={6} className="char-col-right">
                                        <ViewEdit 
                                            key={aboutItem._id+"_val"} 
                                            id={aboutItem._id+"_val"} 
                                            name={"about_val"}
                                            group="about"
                                            field="value"
                                            fieldId={aboutItem._id}
                                            value={aboutItem.value}
                                            addWindowClickListener={props.addWindowClickListener}
                                            removeWindowClickListeners={props.removeWindowClickListeners}
                                            editInProgress={props.editInProgress}
                                            setEditInProgress={props.setEditInProgress}
                                            saveEdit={saveFamilyMemberEdit}
                                        />
                                    </Col>            
                                </Row>
                            )
                        })}
                    </div>
                    
                    <div name="reputation_block" className="ghost-div">
                        <div 
                            className="aligned-div" 
                            name={"rep_block_"+personId} onClick={()=>{
                                handleToggleClick("rep_block_"+personId);
                                setShowReputation(!showReputation);}
                            }
                        >
                            <Col xs={1} lg={1} className="family-col ghost-div icon-pair" >
                                <FontAwesomeIcon 
                                    icon={faStar} 
                                    size="xs"
                                    // name={"rep_block"+personId}
                                    aria-expanded={props.showStatus}
                                    aria-controls={"rep_block"+personId}
                                    // onClick={()=>setShowReputation(!showReputation)}
                                    
                                />
                                {showReputation 
                                ?   <FontAwesomeIcon 
                                    icon={faChevronUp} 
                                    size="xs"
                                    // name={"rep_block"+personId}
                                    aria-expanded={props.showStatus}
                                    aria-controls={"rep_block"+personId}
                                    // onClick={()=>setShowReputation(!showReputation)}
                                    // onClick={(ev)=>{handleToggleClick(ev);setShowReputation(!showReputation);}}
                                />
                                : <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    size="xs"
                                    // name={"rep_block"+personId}
                                    aria-expanded={props.showStatus}
                                    aria-controls={"rep_block"+personId}
                                    // onClick={()=>setShowReputation(!showReputation)}
                                    // onClick={(ev)=>{handleToggleClick(ev);setShowReputation(!showReputation);}}
                                />}
                            </Col>
                            <h6>Reputation</h6>
                        </div>
                        <div>
                            <Collapse in={showReputation} timeout={10} >
                                <div id={"rep_block"+personId} >
                                    {props.data.aux_reputation.map((repItem,repIndex)=>{
                                        return(
                                            <div key={"rep"+repIndex+"_item_row"} className="lv-pair">
                                                <Col xs={12} lg={12}>
                                                    <ViewEdit 
                                                        key={personId+"_"+repIndex+"_item"} 
                                                        id={personId+"_"+repIndex+"_item"} 
                                                        name={"rep_item"}
                                                        group="aux_reputation"
                                                        field="single"
                                                        fieldId={repIndex}
                                                        value={repItem}
                                                        placeHolderText="add reputation"
                                                        addWindowClickListener={props.addWindowClickListener}
                                                        removeWindowClickListeners={props.removeWindowClickListeners}
                                                        editInProgress={props.editInProgress}
                                                        setEditInProgress={props.setEditInProgress}
                                                        saveEdit={saveFamilyMemberEdit}
                                                    />
                                                </Col>    
                                            </div>
                                        )
                                    })}
                                    <ViewEdit
                                        key={"rep_new"+personId} 
                                        id={"rep_new"+personId} 
                                        fieldId={''}
                                        group="aux_reputation"
                                        field="single"
                                        value={''}
                                        placeHolderText="Click to add reputation"
                                        addWindowClickListener={props.addWindowClickListener}
                                        removeWindowClickListeners={props.removeWindowClickListeners}
                                        editInProgress={props.editInProgress}
                                        setEditInProgress={props.setEditInProgress}
                                        saveEdit={saveFamilyMemberEdit}
                                    />
                                </div>
                            </Collapse>
                        </div>
                    </div>
            
                </Col>
                <Col xs={12} lg={6}> {/* Aux Sheet right column */}
                
                    <div name="armour_block">
                        <div className="charsheet-box">
                            <h5 className="armour-total">Current Armour: {armourVal || 0}</h5>
                            <hr className="double-hr" />
                            <Row className="lv-headers">
                                <Col xs={2} className="tick_col">
                                    <p>equip</p>
                                </Col>
                                <Col xs={8} className="lab_col">
                                    <p>armour type</p>
                                </Col>
                                <Col xs={2} className="val_col">
                                    <FontAwesomeIcon icon={faShieldAlt} />
                                </Col>
                            </Row>
                            {props.data.aux_armour.map((item, index)=>{
                                return (
                                    <Row key={item._id+"_item_row"}  className="lv-pair">
                                        <Col xs={1} lg={1} className="tick_col">
                                            <input 
                                                type="checkbox" 
                                                id={item._id} 
                                                name="aux_armour" 
                                                className="entry_tick" 
                                                onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                                defaultChecked={item.isTicked}
                                            />
                                        </Col>
                                        <Col xs={9} lg={9} className="label_col">
                                            <ViewEdit
                                                key={item._id+"_lab"} 
                                                id={item._id+"_lab"}
                                                fieldId={item._id}
                                                group="aux_armour"
                                                field="label"
                                                value={item.label || ''}
                                                addWindowClickListener={props.addWindowClickListener}
                                                removeWindowClickListeners={props.removeWindowClickListeners}
                                                editInProgress={props.editInProgress}
                                                setEditInProgress={props.setEditInProgress}
                                                saveEdit={saveFamilyMemberEdit}
                                                deleteEntry={props.deleteEntry}
                                            />
                                            </Col>
                                        <Col xs={2} lg={2} className="value_col">
                                            <ViewEdit
                                                key={item._id+"_val"} 
                                                id={item._id+"_val"}
                                                fieldId={item._id}
                                                group="aux_armour"
                                                field="value"
                                                value={item.value || 0}
                                                placeHolderText="0"
                                                addWindowClickListener={props.addWindowClickListener}
                                                removeWindowClickListeners={props.removeWindowClickListeners}
                                                editInProgress={props.editInProgress}
                                                setEditInProgress={props.setEditInProgress}
                                                saveEdit={saveFamilyMemberEdit}
                                                deleteEntry={props.deleteEntry}
                                            />    
                                        </Col>
                                        
                                    </Row>
                                )
                            })}
                            <Row  className="lv-pair">
                                <Col>
                                    <ViewEdit
                                        key={"aux_armour_new_lab"} 
                                        id={"aux_armour_new_lab"}
                                        fieldId={''}
                                        group="aux_armour"
                                        field="new"
                                        value={''}
                                        placeHolderText="Click to add armour"
                                        addWindowClickListener={props.addWindowClickListener}
                                        removeWindowClickListeners={props.removeWindowClickListeners}
                                        editInProgress={props.editInProgress}
                                        setEditInProgress={props.setEditInProgress}
                                        saveEdit={saveFamilyMemberEdit}
                                        deleteEntry={props.deleteEntry}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                
                    <div name="eqpt_block" className="ghost-div">
                        <div className="aligned-div"  name={"eqpt_block_"+personId} onClick={()=>{handleToggleClick("eqpt_block_"+personId);setShowEquipment(!showEquipment);}}>
                            <Col xs={1} lg={1} className="family-col ghost-div icon-pair" >
                                <FontAwesomeIcon 
                                    icon={faGem} 
                                    size="xs"
                                    // name={"eqpt_block_"+personId}
                                    aria-expanded={props.showStatus}
                                    aria-controls={"eqpt_block"+personId}
                                    // onClick={(ev)=>{handleToggleClick(ev);setShowEquipment(!showEquipment);}}
                                />
                                {showEquipment 
                                ?   <FontAwesomeIcon 
                                    icon={faChevronUp} 
                                    size="xs"
                                    // name={"eqpt_block_"+personId}
                                    aria-expanded={props.showStatus}
                                    aria-controls={"eqpt_block"+personId}
                                    // onClick={(ev)=>{handleToggleClick(ev);setShowEquipment(!showEquipment);}}
                                />
                                : <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    size="xs"
                                    // name={"eqpt_block_"+personId}
                                    aria-expanded={props.showStatus}
                                    aria-controls={"eqpt_block"+personId}
                                    // onClick={()=>{handleToggleClick("eqpt_block_"+personId);setShowEquipment(!showEquipment);}}
                                />}
                            </Col>
                            <Col>
                                <h6>Valuables</h6>
                            </Col>
                        </div>
                        <div>
                            <Collapse in={showEquipment} timeout={10}>
                                <div id={"eqpt_block_"+personId} >
                                    {props.data.aux_equipment.map((eqptItem,eqptIndex)=>{
                                        return(
                                            <Row key={"eqpt"+eqptIndex+"_item_row"}  className="lv-pair">
                                                <Col xs={12} lg={12}>
                                                    <ViewEdit 
                                                        key={personId+"_"+eqptIndex+"_item"} 
                                                        id={personId+"_"+eqptIndex+"_item"} 
                                                        name={"eqpt_item"}
                                                        group="aux_equipment"
                                                        field="single"
                                                        fieldId={eqptIndex}
                                                        value={eqptItem}
                                                        placeHolderText="add equipment"
                                                        addWindowClickListener={props.addWindowClickListener}
                                                        removeWindowClickListeners={props.removeWindowClickListeners}
                                                        editInProgress={props.editInProgress}
                                                        setEditInProgress={props.setEditInProgress}
                                                        saveEdit={saveFamilyMemberEdit}
                                                    />
                                                </Col>    
                                            </Row>
                                        )
                                    })}
                                    <ViewEdit
                                    key={"equip_new"+personId} 
                                    id={"equip_new"+personId} 
                                    fieldId={''}
                                    group="aux_equipment"
                                    field="single"
                                    value={''}
                                    placeHolderText="Click to add equipment"
                                    addWindowClickListener={props.addWindowClickListener}
                                    removeWindowClickListeners={props.removeWindowClickListeners}
                                    editInProgress={props.editInProgress}
                                    setEditInProgress={props.setEditInProgress}
                                    saveEdit={saveFamilyMemberEdit}
                                />
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </Col>                
            </Row>
        )
    }


export default FamilyMember;