import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import templates from '../tables/templates';
import CharactersList from './CharactersList';
import CharacterSheet from './CharacterSheet';
import { newChar, verification } from './CharacterGenerator';
import { Link } from 'react-router-dom';
import Roller from './Roller';
import Auth from '../Auth';
import tunnel from './tunnel';
import Reserves from './Reserves';

import { Container, Row, Col } from 'react-bootstrap';
import { Prev } from 'react-bootstrap/esm/PageItem';



const Protected = (props) => {
    console.log("LOADING Protected")
    console.log("Templates test thing:",templates.character)

    const [mainMode, setMainMode] = useState('welcome')

    const [knightsData, setKnightsData] = useState([]);
    const [editOnlyKnightsData, setEditOnlyKnightsData] = useState([]);
    // const [activeKnight, setActiveKnight] = useState({knightId:'',access:'', knightData:{}});
    const [activeKnight, setActiveKnight] = useState({});
    // let diceSets =[];
    const _listeners = [];

     

    //REBUILD:
    const [knightList, setKnightList] = useState([]);
    const [diceSets, setDiceSets] = useState([]);
    const [auxiliaries, setAuxiliaries] = useState([]);

    const [showNewChar, setShowNewChar] = useState(false);    

    useEffect(()=> {
        getData()
    },[]);

    function getData() {
        console.log("PROTECTED :: DOING: getData");
        let knightListData = {};
        const groupList = ["isOwner", "canEdit", "viewOnly"]
        groupList.forEach(group=>{
            console.log("Current knightList:",JSON.stringify(knightList))
            console.log("Getting",group,"knights")

            axios.get('/api/users/'+props.userId+'/characterlist/'+group)
            .then(resp=>{
                console.log("'Get characters' response:",resp)
                if (resp.data.err) {
                    console.log("Error retrieving",group,"characters:",resp.data.err)
                } else {
                    
                    const dataObj = {[`${group}`]: resp.data}
                    Object.assign(knightListData, dataObj)
                }
            })
            .then(()=>{
                if (group === groupList[groupList.length-1]) {
                    console.log("All character data gathered:",JSON.stringify(knightListData))
                    setKnightList(knightListData)
                }
            })
        })
    }
        

    async function createKnight (template) {
        console.log("DOING THIS: createKnight")
        const payload = template;
        payload.playerInfo = {isOwner: props.userId}
        console.log("New Knight data:",JSON.stringify(payload));
        axios({
            url: '/api/create',
            method: 'POST',
            data: payload
         })
         .then((result) => {
            console.log("Data sent to server. Result:",result);
            getData(); 
         })
         .catch((err) => {
            console.log("Internal server error.", err);
         });
         
    }

    function removeKeys(obj, keys) {
        let tidyObj = obj
        for (var prop in tidyObj) {
            if(tidyObj.hasOwnProperty(prop)) {
                switch(typeof(tidyObj[prop])) {
                    case 'object':
                        if(keys.indexOf(prop) > -1) {
                            delete tidyObj[prop];
                        } else {
                            removeKeys(tidyObj[prop], keys);
                        }
                        break;
                  default:
                        if(keys.indexOf(prop) > -1) {
                            delete tidyObj[prop];
                        }
                        break;
                }
            }
        }
        return tidyObj
    }

    function saveNewChar() {
        console.log("PROTECTED :: doing this: saveNewChar. Active Knight:",activeKnight);
        
        // remove temp '_id' fields 
        const tidyData = removeKeys(activeKnight, ["_id"])
        console.log("tidyData:",tidyData)
        const payload = tidyData;
        // const payload = activeKnight;

        payload.playerInfo = {isOwner: props.userId}
        console.log("New character data:",JSON.stringify(payload));
        axios({
            url: '/api/create',
            method: 'POST',
            data: payload
         })
         .then(() => {
            console.log("Data sent to server");
            getData(); 
         })
         .catch((err) => {
            console.log("Internal server error.", err);
         });
    }

    function knightListData(knightList){
        console.log("Getting list data.");
        let listData = []
        if (knightList.length>0){knightList.forEach(k=>{
            
            // console.log("k: ",k)
            listData.push({name: k.personalInfo[Object.keys(k.personalInfo)[0]].value, _id:k._id})
            // k.personalInfo.forEach(key=>{
            //     // console.log("key: ",key)
            //     if (key.label === "name") {
            //         listData.push({name: key.value||'', _id:k._id})
            //     }
            // })
        })}
        // console.log("listData: ",JSON.stringify(listData))
        return listData;
    }

    function saveEdit(props){
        console.log("DOING THIS: saveEdit: ",props)

        const payload = {
            characterId: props.itemId || activeKnight._id,
            group: props.group,
            field: props.field,
            value: props.value,
            fieldId: props.fieldId
        }
        console.log("Payload: ",JSON.stringify(payload));
    
        axios({
            // url: '/api/edit-entry',
            url: '/api/edit-entry',
            method: 'POST',
            data: payload
         })
        .then((result) => {
            console.log("Data sent to server. Result:", result);

            if (result.data.failure){
                console.log("Edit did not save:",result.data.failure)
                setActiveKnight(prev=>({...prev}))
                return false
            } else {
                setActiveKnight(result.data)
                return true
            }
        })
        .then(() => {
            // openSheet(activeKnight._id, activeKnight.access); 
            return true;
        })
         .catch((err) => {
            console.log("Internal server error.", err);
            return false;
         });
    }

    function saveEditTemp(props) {
        console.log("DOING THIS: saveEditTemp: ",props)
        let charObj = activeKnight
        let groupString = separateString(props.group)

        let thisGroup = getNested(charObj,...groupString)
        console.log("Group before update:",thisGroup)

      
       

        if (Array.isArray(thisGroup)){
            thisGroup.forEach(item=>{
                console.log("Looking at:",item)
                if (item._id === props.fieldId) {
                    console.log("Item found. Updating",props.field,"to",props.value)
        
            // if group is personalInfo and value has dependent effects, verify the new value
                    if (props.group === 'personalInfo'){
                        console.log("item is in personalInfo. checking if validation required for",item.label)
                        if (['gender','period','region','homeland','home','religion','culture','fatherClass'].includes(_.camelCase(item.label))) {
                            console.log("Entry in",item.label,"requires verification...")
                            console.log("verification:",verification)
                            console.log("verification[",item.label,"]",verification[item.label])
                            if (verification[_.camelCase(item.label)].includes(props.value)){
                                console.log("Entry",item.value,"is valid.")
                                item.invalid = false
                            } else {
                                console.log("Entry",item.value,"is invalid.")
                                item.invalid = true
                            }
                        }
                    }

                    item[props.field]=props.value
                }
            })
        } else if (typeof thisGroup === 'object'){
            console.log("Group is an object. Updating property",props.fieldId)
            thisGroup[props.fieldId] = props.value
        }
        console.log("Group after update:",thisGroup)
        
        setActiveKnight(prev=>({...prev,[props.group]:thisGroup}))

    }

    function separateString(myString){
        console.log("separateString with myString:",myString)
        let stringPieces = [];
        if (myString.indexOf(".")!=-1){
            stringPieces.push(myString.slice(0,myString.indexOf(".")))
            stringPieces.push(...separateString(myString.slice(myString.indexOf(".")+1)))
        } else {
            stringPieces.push(myString);
        }
    
        console.log("String Pieces found:",stringPieces)
        return stringPieces;
    }
    
    
    function deleteEntry(props){
        console.log("DOING THIS: deleteEntry: ",props)
        console.log("Entry deleted:",props)
    }
    
    
    async function getAuxiliaries(auxType, characterId){
        console.log('PROTECTED :: DOING: getAuxiliaries (',auxType,') for ',characterId)

        let result = await axios.get(`/api/users/${Auth.userId}/auxiliaries/${auxType}/${characterId}`)
        // .then(result=>{
            console.log("Auxiliary data retrieved:",JSON.stringify(result.data))
            return (result.data)
        // })
        
    }
    function createAuxiliary(type){
        console.log("PROTECTED :: DOING: createAuxiliary(",type,")")
        const payload = {
            characterId: activeKnight._id,
            auxType: type
        }

        axios({
            url: '/api/create-auxiliary',
            method: 'POST',
            data: payload
        }).
        then(result=>{
            console.log("Auxiliary created:",result)
            let characterUpdate = activeKnight
            console.log("Adding Aux to Character: group/field=",type,", value=",{auxId: result.data._id, auxType:type})
            characterUpdate[type].push({auxId: result.data_id, auxType:type})
            setActiveKnight(characterUpdate)
            console.log("Aux added to Character. Adding to 'auxiliaries' array")
            let newAuxGroup = auxiliaries[type]
            newAuxGroup.push(result.data)
            setAuxiliaries(prev=>({...prev,[props.auxType] : newAuxGroup}))
            
            console.log("Aux added to 'auxiliaries' array. Saving character changes to DB")
            saveEdit({
                group: type,
                field: "new_"+type,
                value: {auxId: result.data._id}
                // value: {auxId: result.data._id, auxType:type}
            })
        })
        .catch(err=>{
            console.log("Auxiliary creation failed for",JSON.stringify(payload),". Error:",err)
        })

    }
    function saveAuxiliary(props){
        console.log('PROTECTED :: DOING: saveAuxiliary')
        
        const payload = {
            auxId: props.auxId,
            auxType: props.auxType,
            group: props.group,
            field: props.field,
            value: props.value,
            fieldId: props.fieldId
        }
        console.log("Payload: ",JSON.stringify(payload));
    
        axios({
            url: '/api/edit-auxiliary',
            method: 'POST',
            data: payload
         })
        .then((result) => {
            console.log("Data sent to server. Result:", result);

            if (result.data.failure){
                console.log("Edit did not save:",result.data.failure)
                setAuxiliaries(prev=>({...prev}))
                return false
            } else {
                let auxGroup = auxiliaries[props.auxType]
                for (let i = 0; i<auxGroup.length; i++) {
                    console.log("checking aux:",auxGroup[i])
                    if (auxGroup[i]._id === props.auxId) {
                        console.log("updated aux found:",auxGroup[i]._id)
                        auxGroup[i] = result.data;
                        console.log("auxGroup updated:",auxGroup)
                        break;
                    }
                }
                setAuxiliaries(prev=>({...prev,[props.auxType] : auxGroup}) )
                return true
            }
        })
        .catch((err) => {
            console.log("Internal server error.", err);
            // return false;
         });
        
    }


   function saveEntry(group, fieldId, newVal, field){
    console.log("DOING THIS: saveValue. Props: g=", group,", f_id=", fieldId," v:", newVal,", f=",field)
    
    const payload = {knightId: activeKnight._id, group: group, fieldId: fieldId, newVal: newVal, field: field} 
    
    console.log("Payload: ",JSON.stringify(payload));

    axios({
        url: '/api/update-entry',
        method: 'POST',
        data: payload
     })
     .then(() => {
        console.log("Data sent to server");
        getData(); 
     })
     .catch((err) => {
        console.log("Internal server error.", err);
     });
}

    useEffect(()=> {
        console.log("Updating knightsData from activeKnight.")
        let ksd = knightsData
        // console.log("ksd:",ksd)
        ksd.forEach((k, i)=>{
            // console.log("k:",k)
            // console.log("Checking knight record:",k._id," versus activeKnight id:",activeKnight._id)

            if (k._id === activeKnight._id) {
                console.log("match found.")
                ksd[i] = activeKnight
            }
        })
        // console.log("knightsData to record:",ksd)
        setKnightsData(ksd);
    },[knightsData, activeKnight._id, activeKnight]);
    
    function setSheetDataTemp(charData){
        console.log("PROTECTED :: setSheetDataTemp: saving character to activeKnight:",charData)
        setActiveKnight(charData);
    }
    
    function setSheetGroupDataTemp(group, groupData){
        console.log("PROTECTED :: setSheetGroupDataTemp: saving",groupData," to:",group)
        const tempCharData = activeKnight
        console.log("charData before:",tempCharData)
        tempCharData[group] = groupData
        console.log("charData after:",tempCharData)
        setActiveKnight(tempCharData);
    }

    async function openSheet(knightId, access){
        console.log("Opening sheet for knightId: ", knightId);
        console.log("Permission: ", access);
        
        let buildAuxData = {};

        axios.get('/api/users/'+Auth.userId+'/charactersheet/'+knightId)
        .then(result=>{
            // console.log("Character data retireved:",JSON.stringify(result))
            setActiveKnight(result.data);
            
            for (var reserve in result.data.reserves){
                console.log("PROTECTED :: openSheet: setting reserve",reserve,"to",result.data.reserves[reserve])
                Reserves.setReserve(reserve, result.data.reserves[reserve])
            }
            setMainMode('editKnight');
        })
        .then(async ()=>{
            
            let foundAnimals = await getAuxiliaries("animals", knightId);
            // console.log("Retrieved animals:",JSON.stringify(foundAnimals))
            buildAuxData.animals = foundAnimals;
            // setAuxiliaries(prev=>({...prev,animals : foundAnimals}) )
        })
        .then(async ()=>{
            let foundFollowers = await getAuxiliaries("followers", knightId);
            // console.log("Retrieved followers:",JSON.stringify(foundFollowers))
            buildAuxData.followers = foundFollowers;
            // setAuxiliaries(prev=>({...prev,followers : followers}) )
        })
        .then(async ()=>{
            let foundFamilyMembers = await getAuxiliaries("familyMembers", knightId);
            // console.log("Retrieved familyMembers:",JSON.stringify(foundFamilyMembers))
            buildAuxData.familyMembers = foundFamilyMembers;
        })
        .then(()=>{
            // console.log("buildAuxData:",JSON.stringify(buildAuxData))
            
            setAuxiliaries(buildAuxData)
        })
        .catch(err=>{
            console.log("Error retrieving character data:",err)
        })
    }
    
    function openBlankSheet(){

            console.log("Templates:",templates )
            console.log("Triggering createKnight. template data:",templates.character )
            
            let templateChar = Object.assign({}, templates.character)
            // let templateChar = templates.character
            console.log("PROTECTED :: openBlankSheet: templateChar=",templateChar)
            let blankChar = addIds(templateChar)
            // let blankChar = addKeys(templateChar, "_id", mongoObjectId())
            console.log("PROTECTED :: openBlankSheet: blankChar=",blankChar)

            setActiveKnight(blankChar)

            setShowNewChar(true)
    }
 
    function mongoObjectId() {
        var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }
    
    function addIds(obj) {
        let messyObj = obj
        let key = "_id"
        let keyVal = mongoObjectId()
        // let messyObj = {}
        // Object.assign(messyObj, obj)
        // console.log("Checking",messyObj)
        if (Array.isArray(messyObj)) {
            // console.log("  Found array")
            messyObj.forEach(item=>{
                // console.log("    Calling addIds on",item)
                addIds(item)
            })
        } else if(typeof(messyObj) === 'object') {
            // console.log("  Found object")
            if(!(messyObj.hasOwnProperty(key))) {
                // console.log("    Did not find",key)
                if (typeof keyVal === 'function'){
                // console.log("      Calling keyVal function for",messyObj,".",key)
                messyObj[key] = keyVal.call();
                } else {
                // console.log("      Adding keyVal value")
                messyObj[key] = keyVal;
                }
            }
            // console.log("  Calling addIds on elements of",messyObj)
            for (var element in messyObj){
                // console.log("element:",element,", messyObj[element]:",messyObj[element])
                addIds(messyObj[element])
            }
        }           
    
    //    console.log("Key add completed. messyObj:",messyObj)
       return messyObj
     }
    // function addKeys(obj, key, keyVal) {
    //     let messyObj = obj
    //     // let messyObj = {}
    //     // Object.assign(messyObj, obj)
    //     console.log("Checking",messyObj)
    //     if (Array.isArray(messyObj)) {
    //         console.log("  Found array")
    //         messyObj.forEach(item=>{
    //             console.log("    Calling addKeys on",item)
    //             addKeys(item, key, keyVal)
    //         })
    //     } else if(typeof(messyObj) === 'object') {
    //         console.log("  Found object")
    //         if(!(messyObj.hasOwnProperty(key))) {
    //             console.log("    Did not find",key)
    //             if (typeof keyVal === 'function'){
    //             console.log("      Calling keyVal function for",messyObj,".",key)
    //             messyObj[key] = keyVal.call();
    //             } else {
    //             console.log("      Adding keyVal value")
    //             messyObj[key] = keyVal;
    //             }
    //         }
    //         console.log("  Calling addKeys on elements of",messyObj)
    //         for (var element in messyObj){
    //             console.log("element:",element,", messyObj[element]:",messyObj[element])
    //             addKeys(messyObj[element], key, keyVal)
    //         }
    //     }           
    
    //    console.log("Key add completed. messyObj:",messyObj)
    //    return messyObj
    //  }

     function getNested(obj, ...args) {
        return args.reduce((obj, level) => obj && obj[level], obj)
    }
    
    function getPreSelects(){
        console.log("PROTECTED :: Getting preselects...")

        let preSelects = {}
        activeKnight.personalInfo.forEach(item=>{
            console.log("checking personalInfo item",item)
            if (item.value.length > 0 ){
                let formattedValue = item.value
                let isValid = true;
                if (verification.hasOwnProperty(_.camelCase(item.label))){
                    isValid = false;
                    for (let formatVal of verification[_.camelCase(item.label)]) {
                        if (_.camelCase(formatVal)===_.camelCase(item.value)) {
                            console.log("Updataing",formattedValue,"to",formatVal)
                            formattedValue = formatVal
                            isValid = true;
                        }
                    }
                }

                if (isValid === true) {
                    preSelects[_.camelCase(item.label)] = formattedValue
                }
            }    
        })
        // console.log("Pre-Selects:",preSelects)
        return preSelects;
    }

    function generateNewChar(){
        console.log("PROTECTED :: DOING : generateNewChar")
        
        let preSel = getPreSelects()
        console.log("PROTECTED :: generateNewChar: preselects=",preSel)
        
        let randomCharacter = newChar(preSel)
        console.log("PROTECTED :: generateNewChar: randomCharacter=",randomCharacter)
        
        let keyedCharacter = addIds(randomCharacter)
        // let keyedCharacter = addKeys(randomCharacter, "_id", mongoObjectId())
        console.log("PROTECTED :: generateNewChar: Character with keys=",keyedCharacter)

        setActiveKnight(keyedCharacter);
    }

    function MainBlock () {
        console.log("PROTECTED:: Building Main Block")
        let mainBlock;
        switch (mainMode) {
            case "welcome":
                console.log("Building 'welcome' block")
                mainBlock = (
                    <h1>RPG Roller</h1>
                    )
                break;
            case "editKnight":
                console.log("Building 'edit knight' block")
                console.log("auxiliaries:",JSON.stringify(auxiliaries));
                mainBlock =(
                    // (activeKnight.access!=='')&& 
                    <CharacterSheet 
                        key={activeKnight._id} 
                        saveEdit={saveEdit} 
                        deleteEntry={deleteEntry}
                        saveEntry={saveEntry}
                        activeKnight={activeKnight} 
                        // setActiveKnight={setActiveKnight} 
                        auxiliaries={auxiliaries}
                        createAuxiliary={createAuxiliary}
                        saveAuxiliary={saveAuxiliary}
                        _listeners={_listeners}
                    />
                    )
                break;
            case "createKnight":
                console.log("Building 'create knight' block")
                console.log("Checking initial template data:",templates.character )
                
                mainBlock = (
                    <div>
                        <div className="aligned-div">
                            <button  
                                type="button" 
                                onClick={()=>{createKnight(templates.character)}}
                                >
                                    Create "Blank" Knight
                            </button>
                            <button  
                                type="button" 
                                onClick={()=>{createKnight(templates.knightAnarchy)}}
                                >
                                    Create "Anarchy" Knight
                            </button>
                            <button  
                                type="button" 
                                onClick={()=>{console.log("Checking template data:",templates.character );
                                // testingSomething()
                                (!showNewChar)&&openBlankSheet()

                                }}
                                >
                                    Create Random Knight
                                </button>
                        </div>
                        {showNewChar &&
                        <div>
                            <div className="aligned-div">
                                <button onClick={()=>{generateNewChar()}}>Generate Random Character</button>
                                <button onClick={()=>{openBlankSheet()}}>Reset form</button>
                                <button onClick={()=>{saveNewChar()}}>Save Character</button>
                            </div>
                            <CharacterSheet 
                                key="new_character" 
                                saveEdit={saveEditTemp} 
                                activeKnight={activeKnight}
                                // deleteEntry={deleteEntry}
                                // saveEntry={saveEntryTemp}
                                // setActiveKnight={setActiveKnight} 
                                // auxiliaries={auxiliaries}
                                // createAuxiliary={createAuxiliary}
                                // saveAuxiliary={saveAuxiliary}
                                _listeners={_listeners}
                            />
                        </div>
                        }
                    </div>
                    )
                break;
            default:
        }


        return mainBlock
    }
    function testingSomething(){
        window.alert("Template test:"+JSON.stringify(templates.character.passions))
    }
    return (
        <Container>
            {/* <Row>
                <h1>This is the protected route</h1>
                <h1>{props.userId}</h1>
                <button type="button" onClick={()=>getData()}>getData</button>
                
            </Row> */}
            <Row>
                <Col xs={12} lg={1} className="sidebar-column">
                    <button 
                            type="button" 
                            onClick={()=>{
                                // console.log("Triggering createKnight. template data:",templates.knight )
                                // setActiveKnight({knightId:"new", access:"own",knightData:Object.assign({}, templates.knight)});
                                setMainMode("createKnight")
                            }}
                        >
                            New Knight
                        </button>
                    <CharactersList
                            key="myKnights"
                            listName="My Knights"
                            permission="own"
                            // listData={knightListData(knightsData)}
                            listData={knightList}
                            openSheet={openSheet}    
                        />
                    {(editOnlyKnightsData.length>0)&&
                        <CharactersList
                                key="editOnlyKnights"
                                listName="Other Knights"
                                permission="edit"
                                listData={knightListData(editOnlyKnightsData)}
                                openSheet={openSheet}    
                            />
                        }
                </Col>
                <Col xs={12} lg={9} className="column">
                    <MainBlock />
                </Col>
                <Col xs={12} lg={2} className="sidebar-column">
                    <Roller key="roller" diceSets={diceSets} getData={getData}/>
                </Col>
            </Row>
        </Container>
        )

}

export default Protected;