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
    const [knightsData, setKnightsData] = useState([]);
    const [editOnlyKnightsData, setEditOnlyKnightsData] = useState([]);
    const [activeKnight, setActiveKnight] = useState({knightId:'',access:'', knightData:{}});
    let diceSets =[];
    let ownKnights = [];
    let otherKnights = [];

    useEffect(()=> {
        getData()
    },[]);
    
    async function getData() {
        console.log("DOING THIS: getData (own knights)");
            axios.get('/api/users/'+props.userId)
                .then((response)=>{
                    ownKnights = response.data.knights;
                    console.log("Initial data received.");
                    console.log(ownKnights.length," knights found");
                    console.log(response.data.diceSets.length," dice sets found");
                    console.log(JSON.stringify(ownKnights));
                    setKnightsData(ownKnights);
                    
                })
                .then(r=>{
                    console.log("Updated knightsData: ",JSON.stringify(knightsData));
                    // console.log("Data reloaded. State updated.");
                    console.log("DOING THIS: getData (other knights)");
            axios.get('/api/can-edit/'+props.userId)
                .then((response)=>{
                    const data = response.data;
                    console.log("Initial knights data received.");
                    console.log(data.knights.length," knights found");
                    console.log(JSON.stringify(data.knights));
                    // DEBUG THIS:::
                    let knightIds = []
                    console.log("Currently loaded knightsData: ",JSON.stringify(knightsData));
                    ownKnights.forEach(k=>{
                        console.log(k)
                        knightIds.push(k._id)
                    })
                    console.log("knightIds:",knightIds)
                    const otherKnights = data.knights.filter(item=>{
                        return knightIds.indexOf(item._id) === -1;
                    })
                    console.log("otherKnights:",otherKnights)
                    setEditOnlyKnightsData(otherKnights);
                    diceSets = data.diceSets;
                    console.log("Updated editOnlyKnightsData: ",editOnlyKnightsData);
                    console.log("Data reloaded. State updated.");
                    
                })
                .catch((error)=>{
                    alert("Error retrieving data (other knights): ", error);
                });
                })
                .catch((error)=>{
                    alert("Error retrieving data (own knights): ", error);
                });
        
        }

    async function createKnight () {
        console.log("DOING THIS: createKnight")
        const payload = templates.knight;
        payload.playerInfo = {isOwner: props.userId}

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
            
            console.log("k: ",k)
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

    function saveValue(group, fieldId, newVal){
        console.log("DOING THIS: saveValue. Props: g=", group,", f=", fieldId," v:", newVal)
        
        const payload = {group: group, fieldId: fieldId, newVal: newVal} 
        console.log("Payload: ",JSON.stringify(payload));

        axios({
            url: '/api/update-val',
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

    
    function saveEntry(group, fieldId, newLab, newVal){
        console.log("DOING THIS: saveValue. Props: g=", group,", f=", fieldId," v:", newVal)
        // Update activeKnight state object
        let knightObj = activeKnight.knightData;
        let objectToEdit = tunnel(knightObj, group)

        const valChange = ()=>{
            if ((typeof newVal) === "number") {
                console.log("newVal is a number");
                return true;
            } else if ((typeof newVal) === "string") {
                console.log("newVal is a number");
                return true;
                }
            }
        
                objectToEdit.forEach(entry=>{
                    console.log("entry:",entry)
                    if (entry._id === fieldId) { 
                        if (newLab&&valChange){
                            console.log("both found")
                            entry.label = newLab;
                            entry.value = newVal
                        } else if (newLab) {
                            console.log("newLab found")
                            entry.label = newLab;
                        } else if (valChange) {
                            console.log("newVal found")
                            entry.value = newVal;
                        }
                    }
                })
            
        let updateObj = {...activeKnight};
        updateObj.knightData = knightObj;
        console.log("Active knight update object: ",JSON.stringify(updateObj))
        setActiveKnight(updateObj);
        // console.log("Active knight updated to: ",JSON.stringify(activeKnight))
        // Update database
        const payload = {group: group, fieldId: fieldId, newLab: newLab, newVal: newVal} 
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

    function saveEntry_bkup(group, fieldId, newLab, newVal){
        console.log("DOING THIS: saveValue. Props: g=", group,", f=", fieldId," v:", newVal)
        // Update activeKnight state object
        let knightObj = activeKnight.knightData;
        
        for (var prop in knightObj) {
            console.log("prop:",prop)
            if (prop === group) {
                knightObj[prop].forEach(entry=>{
                    console.log("entry:",entry)
                    if (entry._id === fieldId) { 
                        console.log("_id ",fieldId,"found.")
                        if (newLab&&(newVal || newVal===0)){
                            console.log("both found")
                            entry.label = newLab;
                            entry.value = newVal
                        } else if (newLab) {
                            console.log("newLab found")
                            entry.label = newLab;
                        } else if (newVal.isInteger() || newVal===0) {
                            console.log("newVal found")
                            entry.value = newVal;
                        }
                    }
                })
            }
        }
        let updateObj = {...activeKnight};
        updateObj.knightData = knightObj;
        console.log("Active knight update object: ",JSON.stringify(updateObj))
        setActiveKnight(updateObj);
        // console.log("Active knight updated to: ",JSON.stringify(activeKnight))
        // Update database
        const payload = {group: group, fieldId: fieldId, newLab: newLab, newVal: newVal} 
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
    function openSheet(knightId, access){
        console.log("Opening sheet for knightId: ", knightId);
        console.log("Permission: ", access);
        let kd;
        switch (access) {
            case 'own':
                kd = knightsData.find(k=>k._id === knightId)
                break;
            case 'edit':
                kd = editOnlyKnightsData.find(k=>k._id === knightId)
                break;
            default: 
        }
        // console.log("adding kd: ",JSON.stringify(kd))
        setActiveKnight({knightId: knightId, access: access, knightData: kd});
        // console.log("Updated active knight: ",JSON.stringify(activeKnight));
    }


    return (
        <Container>
            {/* <Row>
                <h1>This is the protected route</h1>
                <h1>{props.userId}</h1>
                <button type="button" onClick={()=>getData()}>getData</button>
                
            </Row> */}
            <Row>
                <Col md={1} className="column">
                    <button type="button" onClick={()=>createKnight()}>New Knight</button>
                    <KnightsList
                        key="myKnights"
                        listName="My Knights"
                        permission="own"
                        listData={knightListData(knightsData)}
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
                <Col md={9} className="column">
                    {(activeKnight.access!=='')&& <KnightSheet key={activeKnight.knightId} saveValue={saveValue} saveEntry={saveEntry} activeKnight={activeKnight} setActiveKnight={setActiveKnight} />}
                </Col>
                <Col md={2} className="column">
                    <Roller key="roller" diceSets={diceSets} getData={getData}/>
                </Col>
            </Row>
        </Container>
        )

}

export default Protected;