import React, { useState } from 'react';
import _ from 'lodash';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ViewEdit from './ViewEdit';
import ViewEditPersonality from './ViewEditPersonality';

export default function KnightSheet(props) {
    console.log("LOADING KnightSheet")
    console.log("Knight data: ",props.activeKnight.knightData);

    const [editInProgress, setEditInProgress] = useState(false);
    const [_listeners, set_Listeners] = useState([]);

    console.log("_listeners array:",_listeners)
    
    EventTarget.prototype.addEventListenerBase = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addClickListener = function (listener) {
        console.log("Pushing to _listeners array:", listener)
        const listenObject = { target: this, listener: listener };
        set_Listeners(prev=>{ return ([...prev, listenObject]) })
        
        console.log("Checking _listeners array:",_listeners.length," found.")
        this.addEventListenerBase("click", listener);
    };
    EventTarget.prototype.removeClickListeners = function () {
        console.log("Removing 'click' listeners. (",_listeners.length,"found)")
        
        for (var index = 0; index !== _listeners.length; index++) {
            var item = _listeners[index];
            console.log("Listener:",item);
            var target = item.target;
            var type = "click";
            var listener = item.listener;
            
            this.removeEventListener(type, listener);
        }
        
        set_Listeners([]);
      };

      function addWindowClickListener(listener){
          window.addClickListener(listener);
      }

      function removeWindowClickListeners(){
        window.removeClickListeners();
    }
    
    
    function getStat(statName){
        const stat = props.activeKnight.knightData.statistics.filter(stat=>stat.label=== statName)[0]
        const statScore = stat.value
        // console.log(statName," : ",statScore,` (${JSON.stringify(stat)})`)
        return statScore
    }

    function derivedStats() {
        const STR = getStat("STR");
        const SIZ = getStat("SIZ");
        const DEX = getStat("DEX");
        const CON = getStat("SIZ");

        const damage = Math.round((STR + SIZ) / 6) + "d6"
        const healRate = Math.round((STR + CON) / 6)
        const moveRate = Math.round((STR + DEX) / 10)
        const totalHitPoints = STR + CON
        const unconscious = Math.round((STR+CON) / 4)

        return ([
            {label:"damage", value: damage},
            {label:"healRate", value: healRate},
            {label:"moveRate", value: moveRate},
            {label:"totalHitPoints", value: totalHitPoints},
            {label:"unconscious", value: unconscious}
        ])
    }
    console.log("DERIVED STATS:",derivedStats)

    function handleBoxTick(event, fieldId){
        console.log("Handling Tick Event on",fieldId)
        console.log("checked:",event.target.checked)
        
        const payload = {
            group: event.target.name,
            field: "isTicked",
            value: event.target.checked,
            fieldId: fieldId
        }
        props.saveEdit(payload);
        
    }

    return (
        <div className="Charsheet" key={props.activeKnight.knightData._id}>
        {/* <h1>{"Active Knight _id:",props.activeKnight.knightId}</h1> */}
        <div>
            <Row>
                <Col className="charsheet-column">
                <h6>Personal Information</h6>
                    <div className="charsheet-box">
                        {props.activeKnight.knightData.personalInfo.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col md={6}>
                                            <ViewEdit
                                                key={item._id+"_lab"} 
                                                id={item._id+"_lab"}
                                                name={item._id}
                                                group="personalInfo"
                                                field="label"
                                                value={_.startCase(item.label)}
                                                addWindowClickListener={addWindowClickListener}
                                                removeWindowClickListeners={removeWindowClickListeners}
                                                editInProgress={editInProgress}
                                                setEditInProgress={setEditInProgress}
                                                saveEdit={props.saveEdit}
                                            />
                                            </Col>
                                            <Col md={6}>
                                            <ViewEdit
                                                key={item._id+"_val"} 
                                                id={item._id+"_val"}
                                                name={item._id}
                                                group="personalInfo"
                                                field="value"
                                                value={item.value}
                                                addWindowClickListener={addWindowClickListener}
                                                removeWindowClickListeners={removeWindowClickListeners}
                                                editInProgress={editInProgress}
                                                setEditInProgress={setEditInProgress}
                                                saveEdit={props.saveEdit}
                                            />
                                    </Col>            
                                </Row>
                            )
                        })}
                        <Row  className="lv-pair">
                            <Col>
                                <ViewEdit
                                    key={"personalInfo_new_lab"} 
                                    id={"personalInfo_new_lab"}
                                    name={''}
                                    group="personalInfo"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add an entry"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                        </Row>
                    </div>
                        <h6>Distinctive Features</h6>
                    <div key="distinctiveFeatures" className="charsheet-box">
                        {props.activeKnight.knightData.distinctiveFeatures.map((item, index)=>{
                            return (
                                    <div>
                                        <ViewEdit
                                            key={"dF_"+index} 
                                            id={"dF_"+index} 
                                            name={index}
                                            group="distinctiveFeatures"
                                            field="single"
                                            value={item}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        
                                    </div>
                                    )
                        })}
                        <ViewEdit
                            key={"dF_new"} 
                            id={"dF_new"} 
                            name={''}
                            group="distinctiveFeatures"
                            field="single"
                            value={''}
                            placeHolderText="Click to add a distinctive feature"
                            addWindowClickListener={addWindowClickListener}
                            removeWindowClickListeners={removeWindowClickListeners}
                            editInProgress={editInProgress}
                            setEditInProgress={setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </div>
                    <h6>Equipment</h6>
                    <div key="equipment" className="charsheet-box">
                        {props.activeKnight.knightData.equipment.map((item, index)=>{
                            return (
                                    <div>
                                        <ViewEdit
                                            key={"equip_"+index} 
                                            id={"equip_"+index} 
                                            name={index}
                                            group="equipment"
                                            field="single"
                                            value={item}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        
                                    </div>
                                    )
                        })}
                        <ViewEdit
                            key={"equip_new"} 
                            id={"equip_new"} 
                            name={''}
                            group="equipment"
                            field="single"
                            value={''}
                            placeHolderText="Click to add equipment"
                            addWindowClickListener={addWindowClickListener}
                            removeWindowClickListeners={removeWindowClickListeners}
                            editInProgress={editInProgress}
                            setEditInProgress={setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </div>
                </Col>
 
                <Col className="charsheet-column">
                <h6>Statistics</h6>
                    <div key="statistics" className="charsheet-box">
                        {props.activeKnight.knightData.statistics.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                            <Col md={6}>
                                            <ViewEdit
                                                key={item._id+"_lab"} 
                                                id={item._id+"_lab"}
                                                name={item._id}
                                                group="statistics"
                                                field="label"
                                                lockEdit={true}
                                                value={_.startCase(item.label)}
                                                editInProgress={editInProgress}
                                            />
                                            </Col>
                                            <Col md={6}>
                                            <ViewEdit
                                                key={item._id+"_val"} 
                                                id={item._id+"_val"}
                                                name={item._id}
                                                group="statistics"
                                                field="value"
                                                value={_.startCase(item.value)}
                                                placeHolderText="Click to add personal info"
                                                addWindowClickListener={addWindowClickListener}
                                                removeWindowClickListeners={removeWindowClickListeners}
                                                editInProgress={editInProgress}
                                                setEditInProgress={setEditInProgress}
                                                saveEdit={props.saveEdit}
                                            />
                                        
                                    </Col>
                                </Row>
                            )
                        })}
                        {derivedStats().map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                <Col md={6}>
                                        <ViewEdit
                                            key={"derivedStats_lab"+index} 
                                            id={"derivedStats_lab"+index}
                                            name={"derivedStats"}
                                            group="statistics"
                                            field="label"
                                            lockEdit={true}
                                            value={_.startCase(item.label)}
                                            editInProgress={editInProgress}
                                        />
                                        </Col>
                                            <Col md={6}>
                                        <ViewEdit
                                            key={"derivedStats_val"+index} 
                                            id={"derivedStats_val"+index}
                                            name={"derivedStats"}
                                            group="statistics"
                                            field="value"
                                            lockEdit={true}
                                            value={item.value}
                                            editInProgress={editInProgress}
                                        />
                                     </Col>
                                </Row>
                            )
                        })}
                    </div>
                    <h6>Personality Traits</h6>
                    <div className="charsheet-box">
                        {props.activeKnight.knightData.personalityTraits.map((item, index)=>{
                            return (
                                <ViewEditPersonality 
                                    key={item._id} 
                                    entry={item} 
                                    valType="number"
                                    group="personalityTraits"
                                    canEditLabel={false}
                                    canEditValue={true}
                                    saveEntry={props.saveEntry}
                                />
                            )
                        })}
                    </div>
                    <h6>Passions</h6>
                    <div className="charsheet-box">
                        {props.activeKnight.knightData.passions.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col md={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="passions" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col md={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"+index}
                                            name={item._id}
                                            group="passions"
                                            field="label"
                                            value={_.startCase(item.label)}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                    </Col>
                                    <Col  md={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"+index}
                                            name={item._id}
                                            group="passions"
                                            field="value"
                                            value={item.value}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row  className="lv-pair">
                            <Col>
                                <ViewEdit
                                    key={"passions_new_lab"} 
                                    id={"passions_new_lab"}
                                    name={''}
                                    group="passions"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a passion"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                        </Row>
                        
                    </div>
                    
                </Col>

                <Col className="charsheet-column">
                <h6>Combat Skills</h6>
                    <div key="combatSkills" className="charsheet-box">
                        {props.activeKnight.knightData.combatSkills.general.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col md={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="combatSkills.general" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col md={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="combatSkills.general"
                                            field="label"
                                            value={_.startCase(item.label)}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        </Col>
                                    <Col md={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            name={item._id}
                                            group="combatSkills.general"
                                            field="value"
                                            value={item.value}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />    
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row  className="lv-pair">
                            <Col>
                                <ViewEdit
                                    key={"combatSkills.general_new_lab"} 
                                    id={"combatSkills.general_new_lab"}
                                    name={''}
                                    group="combatSkills.general"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a combat skill"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                        </Row>
                        <hr></hr>
                        {props.activeKnight.knightData.combatSkills.weapons.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                <Col md={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="combatSkills.weapons" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col md={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="combatSkills.weapons"
                                            field="label"
                                            value={_.startCase(item.label)}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        </Col>
                                    <Col md={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            name={item._id}
                                            group="combatSkills.weapons"
                                            field="value"
                                            value={item.value}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />    
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row  className="lv-pair">
                            <Col>
                                <ViewEdit
                                    key={"combatSkills.weapons_new_lab"} 
                                    id={"combatSkills.weapons_new_lab"}
                                    name={''}
                                    group="combatSkills.weapons"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a weapon skill"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                        </Row>
                    </div>
                    <h6>Skills</h6>
                    <div key="skills" className="charsheet-box">
                        
                            {props.activeKnight.knightData.skills.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                <Col md={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="skills" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col md={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="skills"
                                            field="label"
                                            value={_.startCase(item.label)}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        </Col>
                                    <Col md={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            name={item._id}
                                            group="skills"
                                            field="value"
                                            value={item.value}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />    
                                    </Col>
                                </Row>
                            )
                        })}
                        <Row  className="lv-pair">
                            <Col>
                                <ViewEdit
                                    key={"skills_new_lab"} 
                                    id={"skills_new_lab"}
                                    name={''}
                                    group="skills"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a skill"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
        </div>
    )
}