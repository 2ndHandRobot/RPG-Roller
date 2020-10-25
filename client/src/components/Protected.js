import React, { useEffect, useState } from 'react';
import axios from 'axios';
import templates from '../templates/templates';
import KnightsList from './KnightsList';
import KnightSheet from './KnightSheet';
import { Link } from 'react-router-dom';
import Roller from './Roller';
import Auth from '../Auth';
import tunnel from './tunnel';

import { Container, Row, Col } from 'react-bootstrap';
import { Prev } from 'react-bootstrap/esm/PageItem';



const Protected = (props) => {
    console.log("LOADING Protected")

    const [mainMode, setMainMode] = useState('welcome')

    const [knightsData, setKnightsData] = useState([]);
    const [editOnlyKnightsData, setEditOnlyKnightsData] = useState([]);
    const [activeKnight, setActiveKnight] = useState({knightId:'',access:'', knightData:{}});
    // let diceSets =[];
    const _listeners = [];

     

    //REBUILD:
    const [knightList, setKnightList] = useState([]);
    const [diceSets, setDiceSets] = useState([]);
    const [auxiliaries, setAuxiliaries] = useState([]);

    

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
            characterId: props.itemId || activeKnight.knightId,
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
                setActiveKnight(prev=>({...prev, knightData: result.data}))
                return true
            }
        })
        .then(() => {
            // openSheet(activeKnight.knightId, activeKnight.access); 
            return true;
        })
         .catch((err) => {
            console.log("Internal server error.", err);
            return false;
         });
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
            characterId: activeKnight.knightId,
            auxType: type
        }

        axios({
            url: '/api/create-auxiliary',
            method: 'POST',
            data: payload
        }).
        then(result=>{
            console.log("Auxiliary created:",result)
            let characterUpdate = activeKnight.knightData
            console.log("Adding Aux to Character: group/field=",type,", value=",{auxId: result.data._id, auxType:type})
            characterUpdate[type].push({auxId: result.data_id, auxType:type})
            setActiveKnight(prev=>({...prev, knightData: characterUpdate}))
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
    
    const payload = {knightId: activeKnight.knightId, group: group, fieldId: fieldId, newVal: newVal, field: field} 
    
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
            // console.log("Checking knight record:",k._id," versus activeKnight id:",activeKnight.knightId)

            if (k._id === activeKnight.knightId) {
                console.log("match found.")
                ksd[i] = activeKnight.knightData
            }
        })
        // console.log("knightsData to record:",ksd)
        setKnightsData(ksd);
    },[knightsData, activeKnight.knightId, activeKnight.knightData]);


    async function openSheet(knightId, access){
        console.log("Opening sheet for knightId: ", knightId);
        console.log("Permission: ", access);
        
        let buildAuxData = {};

        axios.get('/api/users/'+Auth.userId+'/charactersheet/'+knightId)
        .then(result=>{
            // console.log("Character data retireved:",JSON.stringify(result))
            setActiveKnight({knightId: knightId, access: access, knightData: result.data});
            setMainMode('editKnight');
        })
        .then(async ()=>{
            
            let foundHorses = await getAuxiliaries("horses", knightId);
            // console.log("Retrieved horses:",JSON.stringify(foundHorses))
            buildAuxData.horses = foundHorses;
            // setAuxiliaries(prev=>({...prev,horses : foundHorses}) )
        })
        .then(async ()=>{
            let foundSquires = await getAuxiliaries("squires", knightId);
            // console.log("Retrieved squires:",JSON.stringify(foundSquires))
            buildAuxData.squires = foundSquires;
            // setAuxiliaries(prev=>({...prev,squires : squires}) )
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
                    (activeKnight.access!=='')
                    && <KnightSheet 
                        key={activeKnight.knightId} 
                        saveEdit={saveEdit} 
                        deleteEntry={deleteEntry}
                        saveEntry={saveEntry}
                        activeKnight={activeKnight} 
                        setActiveKnight={setActiveKnight} 
                        auxiliaries={auxiliaries}
                        createAuxiliary={createAuxiliary}
                        saveAuxiliary={saveAuxiliary}
                        _listeners={_listeners}
                    />
                    )
                break;
            case "createKnight":
                console.log("Building 'create knight' block")
                mainBlock = (
                    <div>
                        <button  
                            type="button" 
                            onClick={()=>{createKnight(templates.knight)}}
                            >
                                Create "Blank" Knight
                            </button>
                        <button  
                            type="button" 
                            onClick={()=>{createKnight(templates.knightAnarchy)}}
                            >
                                Create "Anarchy" Knight
                            </button>
                        </div>
                    )
                break;
            default:
        }


        return mainBlock
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
                            onClick={()=>setMainMode("createKnight")}
                        >
                            New Knight
                        </button>
                    <KnightsList
                            key="myKnights"
                            listName="My Knights"
                            permission="own"
                            // listData={knightListData(knightsData)}
                            listData={knightList}
                            openSheet={openSheet}    
                        />
                    {(editOnlyKnightsData.length>0)&&
                        <KnightsList
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