import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap';
import ViewEdit from './ViewEdit';
import ViewEditTextArea from './ViewEditTextArea';
import AuxList from './AuxList';
import Reserves from './Reserves';


import ViewEditPersonality from './ViewEditPersonality';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function CharacterSheet(props) {
    console.log("LOADING CharacterSheet. Props:",props)
    // console.log("Knight data: ",props.activeKnight);
    // console.log("Auxiliaries data: ",JSON.stringify(props.auxiliaries));

    const [characterSheetData,setCharacterSheetData] = useState(props.activeKnight)
    useEffect(() => { 
        console.log('CHARACTERSHEET :: useEffect: activeKnght data has changed:',props.activeKnight); 
        setCharacterSheetData(props.activeKnight) }, 
        [props.activeKnight]
        );

    let sPersonalInfo = [];
    // if (getNested(props,'activeKnight','personalInfo')){
    if (getNested(characterSheetData,'personalInfo')){
        console.log("Updating sPersonalInfo.")
        sPersonalInfo = sortByIndex(characterSheetData.personalInfo)
        console.log("sPersonalInfo:",sPersonalInfo)
        // sPersonalInfo = sortByIndex(props.activeKnight.personalInfo)
    };

    let sStatistics = [];
    // if (getNested(props,'activeKnight','statistics')){
    if (getNested(characterSheetData,'statistics')){
        sStatistics = sortByIndex(characterSheetData.statistics)
        // sStatistics = sortByIndex(props.activeKnight.statistics)
    };
    
    let sPersonality = [];
    // if (getNested(props,'activeKnight','personalityTraits')){
    if (getNested(characterSheetData,'personalityTraits')){
        sPersonality = sortByIndex(characterSheetData.personalityTraits)
        // sPersonality = sortByIndex(props.activeKnight.personalityTraits)
    };
    let sPassions = [];
    // if (getNested(props,'activeKnight','passions')){
    if (getNested(characterSheetData,'passions')){
        sPassions = sortByIndex(characterSheetData.passions)
        // sPassions = sortByIndex(props.activeKnight.passions)
    };
    let sCombatSkillsGeneral = [];
    // if (getNested(props,'activeKnight','combatSkills','general')){
    if (getNested(characterSheetData,'combatSkills','general')){
        sCombatSkillsGeneral = sortByIndex(characterSheetData.combatSkills.general)
        // sCombatSkillsGeneral = sortByIndex(props.activeKnight.combatSkills.general)
    };
    let sCombatSkillsWeapons = [];
    // if (getNested(props,'activeKnight','combatSkills','weapons')){
    if (getNested(characterSheetData,'combatSkills','weapons')){
        sCombatSkillsWeapons = sortByIndex(characterSheetData.combatSkills.weapons)
        // sCombatSkillsWeapons = sortByIndex(props.activeKnight.combatSkills.weapons)
    };
    let sSkills = [];
    // if (getNested(props,'activeKnight','skills')){
    if (getNested(characterSheetData,'skills')){
    sSkills = sortByIndex(characterSheetData.skills)
    // sSkills = sortByIndex(props.activeKnight.skills)
    };
    let sArmour = [];
    // if (getNested(props,'activeKnight','armour')){
    if (getNested(characterSheetData,'armour')){
        sArmour = sortByIndex(characterSheetData.armour)
        // sArmour = sortByIndex(props.activeKnight.armour)
    };
    let sHistory = [];
    // if (getNested(props,'activeKnight','history')){
    if (getNested(characterSheetData,'history')){
        sHistory = sortByIndex(characterSheetData.history)
        // sHistory = sortByIndex(props.activeKnight.history)
    };
    
    let arDistinctiveFeatures = [];
    // if (getNested(props,'activeKnight','distinctiveFeatures')){
    if (getNested(characterSheetData,'distinctiveFeatures')){
        arDistinctiveFeatures = characterSheetData.distinctiveFeatures
        // arDistinctiveFeatures = props.activeKnight.distinctiveFeatures
    };

    let arDescription = [];
    // if (getNested(props,'activeKnight','description')){
    if (getNested(characterSheetData,'description')){
        arDescription = characterSheetData.description
        // arDescription = props.activeKnight.description
    };
    let arDirectedTraits = [];
    // if (getNested(props,'activeKnight','directedTraits')){
    if (getNested(characterSheetData,'directedTraits')){
        arDirectedTraits = characterSheetData.directedTraits
        // arDirectedTraits = props.activeKnight.directedTraits
    };
    let arEquipment = [];
    // if (getNested(props,'activeKnight','equipment')){
    if (getNested(characterSheetData,'equipment')){
        arEquipment = characterSheetData.equipment
        // arEquipment = props.activeKnight.equipment
    };
    
    let characterId = '';
    if (getNested(props,'activeKnight','_id')){
        characterId = props.activeKnight._id
    };
    
    let characterName = 'Unknown Knight'
    console.log("Personal info [0] value (in getNested):",getNested(props,'activeKnight','personalInfo',[0],'value'))
    
    if (getNested(props,'activeKnight','personalInfo',[0],'label')==="Name"){
        console.log("Personal info [0] label is 'Name'. Value:",getNested(props,'activeKnight','personalInfo',[0],'value'))
        characterName = props.activeKnight.personalInfo[0].value
        console.log('characterId:',characterName) 
    };
    
    let characterGlory = '0';
    if (getNested(props,'activeKnight','glory')){
        characterGlory = props.activeKnight.glory
    };


    let reserveSP = 0
    let reserveSP_id = "new"
    if (getNested(props,'activeKnight','reserves','skillPoints')){
        reserveSP = props.activeKnight.reserves.skillPoints
        Reserves.setReserve("skillPoints",reserveSP)
    };

    const [reserveSkillPoints, setReserveSkillPoints] = useState(reserveSP)
    const [armourVal, setArmourVal] = useState(0);
    useEffect(()=>{console.log("Initial Armour Calculation");setArmourVal(calcArmourValue())},[]);
   

    // Define display state variables
    // const [showStables, setShowStables] = useState(false);
    // const [showFamily, setShowFamily] = useState(false);
    // const [showFollowers, setShowFollowers] = useState(false);

    // const [showAuxiliaries, setShowAuxiliaries] = useState(null);
    // let showAuxiliaries;
    // const [auxList, setAuxList] = useState([]);
    // useEffect(()=>{changeAuxList()},[showAuxiliaries])

    // function changeAuxList(list){
    //     console.log("Changing Aux Lists:",list)
    //     if (showAuxiliaries===list) {
    //         showAuxiliaries=null
    //         setAuxList([])
    //     } else {
    //         showAuxiliaries=list
    //         setAuxList(props.auxiliaries[showAuxiliaries])
    //     }
    // }

    const [editInProgress, setEditInProgress] = useState(false);
    const [_listeners, set_Listeners] = useState([]);
    // const [isChivalrous, setChivalrous] = useState();
    // const [isReligious, setReligious] = useState();



    function getNested(obj, ...args) {
        return args.reduce((obj, level) => obj && obj[level], obj)
    }

    // console.log("_listeners array:",_listeners)
      // Usage
    function useTraceUpdate(props) {
        const prev = useRef(props);
        useEffect(() => {
            const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
            }, {});
            if (Object.keys(changedProps).length > 0) {
            console.log('CHARACTERSHEET :: Changed props:', changedProps);
            }
            prev.current = props;
        });
    }
    useTraceUpdate(props);
      
    EventTarget.prototype.addEventListenerBase = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addClickListener = function (listener) {
        // console.log("Pushing to _listeners array:", listener)
        const listenObject = { target: this, listener: listener };
        set_Listeners(prev=>{ return ([...prev, listenObject]) })
        
        // console.log("Checking _listeners array:",_listeners.length," found.")
        this.addEventListenerBase("click", listener);
        console.log("_listeners array:",_listeners)
    };
    EventTarget.prototype.removeClickListeners = function () {
        // console.log("Removing 'click' listeners. (",_listeners.length,"found)")
        
        for (var index = 0; index !== _listeners.length; index++) {
            var item = _listeners[index];
            // console.log("Listener:",item);
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

    function findItemLabelled(obj,lab){
        console.log("Looking for",lab,"in",obj)
        for (let item in obj) {
            if (obj[item].label === lab){
                console.log("Found:",obj[item])
                return obj[item]    
            }
        }
    }
    
    function getStat(statName){
        const stat = sStatistics.filter(stat=>stat.label === statName)[0]

        let statScore = 0;
        if (stat){statScore=stat.value}
        // console.log(statName," : ",statScore,` (${JSON.stringify(stat)})`)
        return statScore
    }

    function getPersonalityTraitValue(trait){
        console.log("Getting value for",trait,"trait.")
        let personalityTraitList = {
            righthand: ['Lustful','Lazy','Vengeful','Selfish','Deceitful','Arbitrary','Cruel','Proud','Worldly','Reckless','Indulgent','Suspicious','Cowardly'],
            lefthand: ['Chaste','Energetic','Forgiving','Generous','Honest','Just','Merciful','Modest','Spiritual','Prudent','Temperate','Trusting','Valorous'],
            directed: []
        }
        let traitValue = 0
        if (personalityTraitList.lefthand.includes(trait)){
            console.log("Trait is lefthand")
            for (let persoPair in sPersonality) {
                if (sPersonality[persoPair].trait1.label === trait){
                    traitValue = sPersonality[persoPair].value
                    console.log("Trait value:",traitValue)
                }
            }
        } else if (personalityTraitList.righthand.includes(trait)){
            console.log("Trait is lefthand")
            for (let persoPair in sPersonality) {
                if (sPersonality[persoPair].trait2.label === trait){
                    traitValue = 20 - sPersonality[persoPair].value
                    console.log("Trait value:",traitValue)
                }
            }
        }
        console.log("Value of",trait,"trait is",traitValue)
        return traitValue
    }

    function getReligion(){
        if (findItemLabelled(sPersonalInfo,"Religion")){
            return findItemLabelled(sPersonalInfo,"Religion").value
        } else return ''
    }

    function getReligiousBonuses() {
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

        let allReligiousBonuses = {
            'Arian Christian': {damage:'3',totalHitPoints: 2},
            'British Christian': {damage:'2',totalHitPoints: 3},
            'Roman Christian': {totalHitPoints: 6},
            'Christian': {damage:'3',totalHitPoints: 2},
            Heathen: {moveRate:2,healRate: 1},
            Jewish: {healRate: 1,totalHitPoints: 3},
            'British Pagan': {healRate: 2},
            'Pagan': {healRate: 2},
            'Germanic Pagan': {damage:'1d6'},
        }
        
        let religion = ''
        let religiousTraits = []
        let isReligious = false
        
        if (findItemLabelled(sPersonalInfo,"Religion")){
            religion = findItemLabelled(sPersonalInfo,"Religion").value
            religiousTraits = religiousTraitList[religion]
            
            if (getNested(allReligiousBonuses,religion)){
                isReligious = true
                
                for (let trait in religiousTraits){
                    if (getPersonalityTraitValue(religiousTraits[trait])<16){
                        console.log(trait,"is less than 16. isReligious = false")
                        isReligious = false
                    }
                }
            }
        }
        console.log("isReligious:",isReligious)

        let religiousBonuses = {}

        if (isReligious) {
            religiousBonuses = allReligiousBonuses[religion]
        }


        return religiousBonuses
    }

    function derivedStats() {
        console.log("KNIGHTSHEET :: DOING: derivedStats")
        const STR = getStat("STR");
        const SIZ = getStat("SIZ");
        const DEX = getStat("DEX");
        const CON = getStat("CON");
        const APP = getStat("APP");

        const religiousBonuses = getReligiousBonuses()
        console.log("religiousBonuses:",religiousBonuses)

        let damageCalculation = (Math.round((STR + SIZ) / 6))
        if (getNested(religiousBonuses,"damage")) {
            if (religiousBonuses.damage.includes("d6")){
                damageCalculation = (damageCalculation+(1*religiousBonuses.damage.slice(0,religiousBonuses.damage.indexOf("d")))) +"d6" 
            } else {
                damageCalculation = damageCalculation +"d6+"+ religiousBonuses.damage
            }
        } else {
            damageCalculation = damageCalculation +"d6"
        }

        const damage = damageCalculation
        const healRate = Math.round((STR + CON) / 10) + (religiousBonuses.healRate || 0)
        const moveRate = Math.round((STR + DEX) / 10) + (religiousBonuses.moveRate || 0)
        const totalHitPoints = SIZ + CON + (religiousBonuses.totalHitPoints || 0)
        const unconscious = Math.round((SIZ+CON) / 4) + (religiousBonuses.unconscious || 0)
        const influenceMod = Math.min((Math.ceil(APP/3)-4),10)
        const influence = (influenceMod < 0 ) ? influenceMod : "+"+influenceMod


        return ([
            {label:"Influence mod.", value: influence},
            {label:"Damage", value: damage},
            {label:"Heal Rate", value: healRate},
            {label:"Move Rate", value: moveRate},
            {label:"Total Hit Points", value: totalHitPoints},
            {label:"Unconscious", value: unconscious},
            
        ])
    }
    // console.log("DERIVED STATS:",derivedStats)

    function handleBoxTick(event, fieldId){
        console.log("Handling Tick Event on",fieldId)
        console.log("checked:",event.target.checked)
        
        let group = event.target.group
        if (event.target.name === "armour") {
            console.log("ticked an armour box. Updating total")
            group = event.target.name
            for (var a of sArmour) {
                console.log("sArmour item:",a)
                if (a._id === event.target.id) {
                    console.log("sArmour matched:",a)
                    a.isTicked=!a.isTicked;
                }
            }
            
            setArmourVal(calcArmourValue())
        }

        const payload = {
            group: group,
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
    function sortByValue(array) {
        function sortPair(a,b){
            if ( a.value < b.value ) {
                return -1
            } else if ( a.value > b.value ) {
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


    function calcArmourValue() {
        console.log("calculating current armour value")
        const equippedArmour = sArmour.filter(a=>a.isTicked).map(a=>a.value)
        let sumArmour = 0;
        console.log("equippedArmour:",equippedArmour)
        if (equippedArmour.length>0){
            sumArmour = equippedArmour.reduce((a,b)=>a+b);
        }
        if (isChivalrous()) {
            sumArmour += 3
        }
        console.log("new armour value is:",sumArmour)
        return sumArmour;
    }

    function isChivalrous(){
        const chivTraits = ["Generous", "Energetic", "Modest", "Just", "Merciful", "Valorous"]
        let chivTotal = 0
        
        for (let trait in sPersonality) {
            console.log("Trait:",sPersonality[trait])
            if (chivTraits.includes(sPersonality[trait].trait1.label)){
                console.log("Chivalrous trait found. Value:",sPersonality[trait].value)
                chivTotal += sPersonality[trait].value
                console.log("New chivalrous total:",chivTotal)

            }
        }

        console.log("Chivalry total:",chivTotal)
        if (chivTotal > 80){
            return true
        } else {
            return false
        }
    }

    const VEFuncs = {
        addWindowClickListener: addWindowClickListener,
        removeWindowClickListeners: removeWindowClickListeners,
        editInProgress: editInProgress,
        setEditInProgress: setEditInProgress,
        saveEdit: props.saveEdit,
        deleteEntry: props.deleteEntry
    }

    return (
        <div className="Charsheet" key={characterId}>
        <Container fluid>
            <Row className="page1">
                <Col className="charsheet-column" xs={12} lg={4}>
                    <h6>Personal Information</h6>
                    <div className="charsheet-box">
                        {sPersonalInfo.map((item, index)=>{
                            return (
                                <Row key={item._id+"_row"} className="lv-pair">
                                    <Col xs={6} lg={6} className="char-col-left">
                                        <ViewEdit
                                            key={item._id+"_lab_"+index} 
                                            id={item._id+"_lab"}
                                            fieldId={item._id}
                                            group="personalInfo"
                                            field="label"
                                            // lockEdit={true}
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6} className="char-col-right">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            fieldId={item._id}
                                            group="personalInfo"
                                            field="value"
                                            value={item.value || ''}
                                            placeHolderText="click this"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                            invalid={item.invalid}
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
                                    fieldId={''}
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
                        {arDistinctiveFeatures.map((item, index)=>{
                            return (
                                <Col xs={12} className="ghost-div">
                                    <ViewEdit
                                        key={"dF_"+index} 
                                        id={"dF_"+index} 
                                        fieldId={index}
                                        group="distinctiveFeatures"
                                        field="single"
                                        value={item}
                                        addWindowClickListener={addWindowClickListener}
                                        removeWindowClickListeners={removeWindowClickListeners}
                                        editInProgress={editInProgress}
                                        setEditInProgress={setEditInProgress}
                                        saveEdit={props.saveEdit}
                                        deleteEntry={props.deleteEntry}
                                    />
                                    
                                </Col>
                            )
                        })}
                        <ViewEdit
                            key={"dF_new"} 
                            id={"dF_new"} 
                            fieldId={''}
                            group="distinctiveFeatures"
                            field="single"
                            value={''}
                            placeHolderText="Click to add a distinctive feature"
                            addWindowClickListener={addWindowClickListener}
                            removeWindowClickListeners={removeWindowClickListeners}
                            editInProgress={editInProgress}
                            setEditInProgress={setEditInProgress}
                            saveEdit={props.saveEdit}
                            deleteEntry={props.deleteEntry}
                        />
                    </div>

                    <h6>Description</h6>
                    <div key="description" className="charsheet-box character-description">
                        {arDescription.map((description, index)=>{
                            return (
                                <ViewEditTextArea
                                    key={"description_"+index} 
                                    id={"description_"+index} 
                                    fieldId={index}
                                    group="description"
                                    field="desc"
                                    value={description}
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
                                />
                                )
                            })}
                        {!arDescription[0]&&<ViewEditTextArea
                                key={"description_new"} 
                                id={"description_new"} 
                                fieldId={''}
                                group="description"
                                field="desc"
                                value={''}
                                placeHolderText="click to write a character description"
                                addWindowClickListener={addWindowClickListener}
                                removeWindowClickListeners={removeWindowClickListeners}
                                editInProgress={editInProgress}
                                setEditInProgress={setEditInProgress}
                                saveEdit={props.saveEdit}
                                deleteEntry={props.deleteEntry}
                            />}
                    </div>
                    <h6>Equipment</h6>
                    <div key="equipment" className="charsheet-box">
                        {arEquipment.map((item, index)=>{
                            return (
                                    <Col xs={12} className=" ghost-div">
                                        <ViewEdit
                                            key={"equip_"+index} 
                                            id={"equip_"+index} 
                                            fieldId={index}
                                            group="equipment"
                                            field="single"
                                            value={item}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                        
                                    </Col>
                                    )
                        })}
                        <ViewEdit
                            key={"equip_new"} 
                            id={"equip_new"} 
                            fieldId={''}
                            group="equipment"
                            field="single"
                            value={''}
                            placeHolderText="Click to add equipment"
                            addWindowClickListener={addWindowClickListener}
                            removeWindowClickListeners={removeWindowClickListeners}
                            editInProgress={editInProgress}
                            setEditInProgress={setEditInProgress}
                            saveEdit={props.saveEdit}
                            deleteEntry={props.deleteEntry}
                        />
                    </div>
                        
                </Col>

 
                <Col className="charsheet-column"  xs={12} lg={4}>
                    <h3>{characterName}</h3>
                    <div className="charsheet-box">
                        <h5 className="armour-total">Current Glory: 
                            <ViewEdit
                                key={"glory_val"} 
                                id={"glory_val"}
                                fieldId="glory"
                                group="glory"
                                field="single"
                                value={characterGlory}
                                placeHolderText="0"
                                addWindowClickListener={addWindowClickListener}
                                removeWindowClickListeners={removeWindowClickListeners}
                                editInProgress={editInProgress}
                                setEditInProgress={setEditInProgress}
                                saveEdit={props.saveEdit}
                                deleteEntry={props.deleteEntry}
                            />
                        </h5>
                    </div>

                <h6>Statistics</h6>
                    <div key="statistics" className="charsheet-box">
                        {sStatistics.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={6} lg={6} className="char-col-left">
                                    
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            fieldId={item._id}
                                            group="statistics"
                                            field="label"
                                            // lockEdit={true}
                                            value={item.label || ''}
                                            editInProgress={editInProgress}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6} className="char-col-right">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            fieldId={item._id}
                                            group="statistics"
                                            field="value"
                                            value={item.value || 0}
                                            placeHolderText="Click to add personal info"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                    </Col>
                                </Row>
                            )
                        })}
                        <hr className="double-hr" />
                        {derivedStats().map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={6} lg={6} className="char-col-left">
                                        <ViewEdit
                                            key={"derivedStats_lab"+index} 
                                            id={"derivedStats_lab"+index}
                                            fieldId={"derivedStats"}
                                            group="statistics"
                                            field="label"
                                            editLock={true}
                                            value={item.label || ''}
                                            editInProgress={editInProgress}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6} className="char-col-right">
                                        <ViewEdit
                                            key={"derivedStats_val"+index} 
                                            id={"derivedStats_val"+index}
                                            fieldId={"derivedStats"}
                                            group="statistics"
                                            field="value"
                                            editLock={true}
                                            value={item.value}
                                            editInProgress={editInProgress}
                                        />
                                    </Col>
                                </Row>
                            )
                        })}
                    </div>
                    <h6>Armour</h6>
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
                        {sArmour.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id} 
                                            name="armour" 
                                            field="checkBox"
                                            className="entry_tick" 
                                            onClick={(event)=>{console.log("Box ticked:",event.target.name);handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"}
                                            fieldId={item._id}
                                            group="armour"
                                            field="label"
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                        </Col>
                                    <Col xs={2} lg={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            fieldId={item._id}
                                            group="armour"
                                            field="value"
                                            value={item.value || 0}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />    
                                    </Col>
                                    
                                </Row>
                            )
                        })}
                        <Row  className="lv-pair">
                            <Col>
                                <ViewEdit
                                    key={"armour_new_lab"} 
                                    id={"armour_new_lab"}
                                    fieldId={''}
                                    group="armour"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add armour"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
                                />
                            </Col>
                        </Row>
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
                                    religion={getReligion()}
                                />
                            )
                        })}
                        <h6>Directed Traits</h6>
                        {arDirectedTraits.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            group="directedTraits" 
                                            field="checkBox"
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"+index}
                                            fieldId={item._id}
                                            group="directedTraits"
                                            field="label"
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                    </Col>
                                    <Col xs={2} lg={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"+index}
                                            fieldId={item._id}
                                            group="directedTraits"
                                            field="value"
                                            value={"+"+item.value}
                                            placeHolderText="+0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
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
                                    fieldId={''}
                                    group="directedTraits"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a directed trait"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
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
                                            group="passions" 
                                            field="checkBox"
                                            className="entry_tick" 
                                            onClick={(event)=>{handleBoxTick(event, item._id)}} 
                                            defaultChecked={item.isTicked}
                                        />
                                    </Col>
                                    <Col xs={9} lg={9} className="label_col">
                                        <ViewEdit
                                            key={item._id+"_lab"} 
                                            id={item._id+"_lab"+index}
                                            fieldId={item._id}
                                            group="passions"
                                            field="label"
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                    </Col>
                                    <Col  xs={2} lg={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"+index}
                                            fieldId={item._id}
                                            group="passions"
                                            field="value"
                                            value={item.value || 0}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
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
                                    fieldId={''}
                                    group="passions"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a passion"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
                                />
                            </Col>
                        </Row>
                        
                    </div>
                    
                </Col>

                <Col className="charsheet-column" xs={12} lg={4}>
                    <div className="charsheet-box aligned-div">
                        <Col xs={9} className="label-col">
                        <h5 className="resSP-total label-view">Skill Points: </h5>
                        </Col>
                        <Col xs={3} className="value-col">
                        <h5 className="value-field">
                            <ViewEdit
                                key={"resSP_val"} 
                                id={"resSP_val"}
                                fieldId="skillPoints"
                                group="reserves"
                                field="single"
                                value={reserveSkillPoints}
                                placeHolderText="0"
                                addWindowClickListener={addWindowClickListener}
                                removeWindowClickListeners={removeWindowClickListeners}
                                editInProgress={editInProgress}
                                setEditInProgress={setEditInProgress}
                                saveEdit={props.saveEdit}
                                deleteEntry={props.deleteEntry}
                            />
                        </h5>
                        </Col>
                    </div>
                <h6>Combat Skills</h6>
                    <div key="combatSkills" className="charsheet-box">
                        {sCombatSkillsGeneral.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            group="combatSkills.general" 
                                            field="checkBox"
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
                                            group="combatSkills.general"
                                            field="label"
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                        </Col>
                                    <Col xs={2} d={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            fieldId={item._id}
                                            group="combatSkills.general"
                                            field="value"
                                            value={item.value || 0}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
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
                                    fieldId={''}
                                    group="combatSkills.general"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a combat skill"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
                                />
                            </Col>
                        </Row>
                        <hr className="double-hr" />
                        {sCombatSkillsWeapons.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={1} lg={1} className="tick_col">
                                        <input 
                                            type="checkbox" 
                                            id={item._id+"_tick"} 
                                            group="combatSkills.weapons"
                                            field="checkBox" 
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
                                            group="combatSkills.weapons"
                                            field="label"
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                        </Col>
                                    <Col xs={2} lg={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            fieldId={item._id}
                                            group="combatSkills.weapons"
                                            field="value"
                                            value={item.value || 0}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
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
                                    fieldId={''}
                                    group="combatSkills.weapons"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a weapon skill"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
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
                                            group="skills" 
                                            field="checkBox"
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
                                            group="skills"
                                            field="label"
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                        </Col>
                                    <Col xs={2} lg={2} className="value_col">
                                        <ViewEdit
                                            key={item._id+"_val"} 
                                            id={item._id+"_val"}
                                            fieldId={item._id}
                                            group="skills"
                                            field="value"
                                            value={item.value || 0}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
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
                                    fieldId={''}
                                    group="skills"
                                    field="new"
                                    value={''}
                                    placeHolderText="Click to add a skill"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <hr className="double-hr"/>
            <Row className="page2">
                <Col className="charsheet-column aux-block" xs={12}>
                    <div className="charsheet-box">
                        <AuxList 
                            key="aux-list"
                            auxiliaries={props.auxiliaries}
                            // funcs={VEFuncs}
                            addWindowClickListener={addWindowClickListener}
                            removeWindowClickListeners={removeWindowClickListeners}
                            editInProgress={editInProgress}
                            setEditInProgress={setEditInProgress}
                            saveEdit={props.saveEdit}
                            deleteEntry={props.deleteEntry}
                            saveAuxiliary={props.saveAuxiliary}
                            createAuxiliary={props.createAuxiliary}
                            openAux={props.openAux}
                        />
                    </div>
                </Col>
            </Row>
            <hr className="double-hr"/>
            <Row className="page3">
                <Col className="charsheet-column" xs={12} lg={4}>
                    
                </Col>
                <Col className="charsheet-column" xs={12} lg={8}>
                <h6>Character History</h6>
                    <div className="charsheet-box history">
                        <Row className="lv-headers">
                            <Col xs={2} className="year_col">
                                <p>year</p>
                            </Col>
                            <Col xs={10} lg={10} className="event_col">
                                <p>event</p>
                            </Col>
                        </Row>
                        {sHistory.map((item, index)=>{
                            return (
                                <Row  className="lv-pair">
                                    <Col xs={2} className="year_col">
                                        <ViewEdit
                                            key={item._id+"_val"+index} 
                                            id={item._id+"_val"+index}
                                            fieldId={item._id}
                                            group="history"
                                            field="value"
                                            value={item.value || 0}
                                            placeHolderText="0"
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />    
                                    </Col>
                                    <Col xs={10} lg={10} className="event_col">
                                        <ViewEdit
                                            key={item._id+"_lab"+index} 
                                            id={item._id+"_lab"+index}
                                            fieldId={item._id}
                                            group="history"
                                            field="label"
                                            value={item.label || ''}
                                            addWindowClickListener={addWindowClickListener}
                                            removeWindowClickListeners={removeWindowClickListeners}
                                            editInProgress={editInProgress}
                                            setEditInProgress={setEditInProgress}
                                            saveEdit={props.saveEdit}
                                            deleteEntry={props.deleteEntry}
                                        />
                                    </Col>
                                   
                                    
                                </Row>
                            )
                        })}

                        <Row className="lv-pair">
                            <Col xs={2} lg={2} className="year_col">
                                <ViewEdit
                                    key="new_year_val"
                                    id="new_year_val"
                                    name="new_year"
                                    group="history"
                                    field="new"
                                    value=''
                                    placeHolderText="-"
                                    lockEdit={true}
                                    // addWindowClickListener={addWindowClickListener}
                                    // removeWindowClickListeners={removeWindowClickListeners}
                                    // editInProgress={editInProgress}
                                    // setEditInProgress={setEditInProgress}
                                    // saveEdit={props.saveEdit}
                                />    
                            </Col>
                            <Col xs={10} lg={10} className="event_col">
                                <ViewEdit
                                    key={"history_new_lab"} 
                                    id={"history_new_lab"}
                                    fieldId={''}
                                    group="history"
                                    field="new"
                                    value=''
                                    placeHolderText="Click to add a new event"
                                    addWindowClickListener={addWindowClickListener}
                                    removeWindowClickListeners={removeWindowClickListeners}
                                    editInProgress={editInProgress}
                                    setEditInProgress={setEditInProgress}
                                    saveEdit={props.saveEdit}
                                    deleteEntry={props.deleteEntry}
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