import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ViewEdit from './ViewEdit';
import ViewEditFamily from './ViewEditFamily';
import ViewEditPersonality from './ViewEditPersonality';

export default function KnightSheet(props) {
    console.log("LOADING KnightSheet")
    console.log("Knight data: ",props.activeKnight.knightData);

    const sPersonalInfo = sortByIndex(props.activeKnight.knightData.personalInfo);
    const sStatistics = sortByIndex(props.activeKnight.knightData.statistics);
    const sPersonality = sortByIndex(props.activeKnight.knightData.personalityTraits);
    const sPassions = sortByIndex(props.activeKnight.knightData.passions);
    const sCombatSkillsGeneral = sortByIndex(props.activeKnight.knightData.combatSkills.general);
    const sCombatSkillsWeapons = sortByIndex(props.activeKnight.knightData.combatSkills.weapons);
    const sSkills = sortByIndex(props.activeKnight.knightData.skills);
    const sFamily = sortByIndex(props.activeKnight.knightData.family) || [];





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
        const CON = getStat("CON");

        const damage = Math.round((STR + SIZ) / 6) + "d6"
        const healRate = Math.round((STR + CON) / 6)
        const moveRate = Math.round((STR + DEX) / 10)
        const totalHitPoints = STR + CON
        const unconscious = Math.round((STR+CON) / 4)

        return ([
            {label:"Damage", value: damage},
            {label:"Heal Rate", value: healRate},
            {label:"Move Rate", value: moveRate},
            {label:"Total Hit Points", value: totalHitPoints},
            {label:"Unconscious", value: unconscious}
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

    function sortByIndex(array) {
        function sortPair(a,b){
            if ( a.index < b.index ) {
                return -1
            } else if ( a.index > b.index ) {
                return 1
            };
            return 0;
        }
        if (Array.isArray(array)) {
            return array.sort(sortPair)
        } else {
            return array
        }
    }

    // function saveNewFam(props) {
    //     let payload = props;

    //     props.saveEdit(payload)
    // }

    return (
        <div className="Charsheet" key={props.activeKnight.knightData._id}>
        {/* <h1>{"Active Knight _id:",props.activeKnight.knightId}</h1> */}
        <Container fluid>
            <Row>
                <Col className="charsheet-column" xs={12} lg={4}>
                <h6>Personal Information</h6>
                    <div className="charsheet-box">
                        {sPersonalInfo.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={6} lg={6}>
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="personalInfo"
                                            field="label"
                                            lockEdit={true}
                                            value={item.label}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6}>
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
                                    <Col xs={12}>
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
                                        
                                    </Col>
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
                                    <Col xs={12}>
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
                                        
                                    </Col>
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

                    <h6>Family</h6>
                    <div key="family" className="charsheet-box family-block">
                        {sFamily.map((item, index)=>{
                            return (
                                    <Col xs={12}>
                                        <ViewEditFamily
                                            key={"family_"+index} 
                                            id={"family_"+index} 
                                            name={index}
                                            group="family"
                                            value={item}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        <hr />
                                    </Col>
                                    )
                        })}
                        <ViewEdit
                            key={"family_new"} 
                            id={"family_new"} 
                            name={''}
                            group="family"
                            field="family"
                            value={''}
                            placeHolderText="click to add family member (father, mother...)"
                            addWindowClickListener={addWindowClickListener}
                            removeWindowClickListeners={removeWindowClickListeners}
                            editInProgress={editInProgress}
                            setEditInProgress={setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </div>
                </Col>

 
                <Col className="charsheet-column"  xs={12} lg={4}>
                <h6>Statistics</h6>
                    <div key="statistics" className="charsheet-box">
                        {sStatistics.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={6} lg={6}>
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="statistics"
                                            field="label"
                                            lockEdit={true}
                                            value={item.label}
                                            editInProgress={editInProgress}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6}>
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            name={item._id}
                                            group="statistics"
                                            field="value"
                                            value={item.value}
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
                                    <Col xs={6} lg={6}>
                                        <ViewEdit
                                            key={"derivedStats_lab"+index} 
                                            id={"derivedStats_lab"+index}
                                            name={"derivedStats"}
                                            group="statistics"
                                            field="label"
                                            lockEdit={true}
                                            value={item.label}
                                            editInProgress={editInProgress}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6}>
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
                        {sPersonality.map((item, index)=>{
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
                        <h6>Directed Traits</h6>
                        {props.activeKnight.knightData.directedTraits.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="directedTraits" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"+index}
                                            name={item._id}
                                            group="directedTraits"
                                            field="label"
                                            value={item.label}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                    </Col>
                                    <Col xs={2} lg={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"+index}
                                            name={item._id}
                                            group="directedTraits"
                                            field="value"
                                            value={"+"+item.value}
                                            placeHolderText="+0"
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
                                    key={"directedTraits_new_lab"} 
                                    id={"directedTraits_new_lab"}
                                    name={''}
                                    group="directedTraits"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a directed trait"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                        </Row>
                    </div>
                    <h6>Passions</h6>
                    <div className="charsheet-box">
                        {sPassions.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="passions" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"+index}
                                            name={item._id}
                                            group="passions"
                                            field="label"
                                            value={item.label}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                    </Col>
                                    <Col  xs={2} lg={2} className="value_col">
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

                <Col className="charsheet-column" xs={12} lg={4}>
                <h6>Combat Skills</h6>
                    <div key="combatSkills" className="charsheet-box">
                        {sCombatSkillsGeneral.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="combatSkills.general" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="combatSkills.general"
                                            field="label"
                                            value={item.label}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        </Col>
                                    <Col xs={2} d={2} className="value_col">
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
                        {sCombatSkillsWeapons.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="combatSkills.weapons" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="combatSkills.weapons"
                                            field="label"
                                            value={item.label}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        </Col>
                                    <Col xs={2} lg={2} className="value_col">
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
                        
                            {sSkills.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            name="skills" 
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            name={item._id}
                                            group="skills"
                                            field="label"
                                            value={item.label}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                        </Col>
                                    <Col xs={2} lg={2} className="value_col">
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
        </Container>
        </div>
    )
}