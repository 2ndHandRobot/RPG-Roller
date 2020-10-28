import React, { useState } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faHeart, faMars, faVenus, faShieldAlt, faBan, faInfoCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faCreativeCommonsBy } from "@fortawesome/free-brands-svg-icons";

import ViewEdit from './ViewEdit';
import Armour from './Armour';


export default function Follower(props) {
    
    console.log("SQUIRE:: loading component. Props:",props)
    const [followerData, setFollowerData] = useState(props.value);
    console.log("followerData:", followerData)
    console.log("followerData.who:", followerData.who)
    console.log("followerData.stats:", followerData.stats)
    

    const [showSheet, setShowSheet] = useState(false);

    let whoData=followerData.who || [];
    let aboutData=followerData.about || [];
    let statusData=followerData.status || [];
    statusData.push(followerData.armour);
    let skillsData=followerData.skills || [];
    let reputationData=followerData.reputation || [];
    
    function auxValueChange(props){
        console.log("SQUIRE:: DOING: auxValueChange")
        console.log("props:",props)
        let payload = props;

    }

    function toggleData(toggle, newVal) {
        const data = {
            group: "followers.status",
            field: toggle,
            value: newVal,
            fieldId: props.value._id
        };
        
        console.log("Toggle data:",data)
        props.funcs.saveEdit(data)
    }


// Functional Components
    function WhoBlock(prps) {
        console.log("WhoBlock:",prps.data)
            return (
                <div>
                {prps.data.map((desc, descIndex)=>{
                console.log("desc:",desc)
                return (
                    <div>
                    <Row className="lv-pair">
                        <Col xs={6} lg={6} className="char-col-left">
                            <ViewEdit
                                key={followerData._id+"_lab"} 
                                id={followerData._id+"_lab"}
                                name={descIndex}
                                group="followers"
                                field="who.label"
                                lockEdit={true}
                                value={desc.label}
                                // addWindowClickListener={props.funcs.addWindowClickListener}
                                // removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                // editInProgress={props.funcs.editInProgress}
                                // setEditInProgress={props.funcs.setEditInProgress}
                                // saveEdit={props.funcs.saveEdit}
                            />
                        </Col>
                        <Col xs={6} lg={6} className="char-col-right">
                            <ViewEdit
                                key={followerData._id+"_val"} 
                                id={followerData._id+"_val"}
                                name={descIndex}
                                group="followers"
                                field="who.value"
                                value={desc.value}
                                addWindowClickListener={props.funcs.addWindowClickListener}
                                removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                editInProgress={props.funcs.editInProgress}
                                setEditInProgress={props.funcs.setEditInProgress}
                                saveEdit={auxValueChange}
                            />
                        </Col>            
                    </Row>
                    </div>
                )
            })}
            </div>)
        
    }

    function AboutBlock(prps) {
        console.log("AboutBlock:",prps.data)
        // function sBlock (){
            return (
                <div>
                    {prps.data.map((stat, statIndex)=>{
                        console.log("stat:",stat)
                        return (
                            <div>
                            <Row className="lv-pair">
                                <Col xs={6} lg={6} className="char-col-left">
                                    <ViewEdit
                                        key={followerData._id+"_lab"} 
                                        id={followerData._id+"_lab"}
                                        name={statIndex}
                                        group="followers"
                                        field="stat.label"
                                        lockEdit={true}
                                        value={stat.label}
                                        // addWindowClickListener={props.funcs.addWindowClickListener}
                                        // removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                        // editInProgress={props.funcs.editInProgress}
                                        // setEditInProgress={props.funcs.setEditInProgress}
                                        // saveEdit={props.funcs.saveEdit}
                                    />
                                </Col>
                                <Col xs={6} lg={6} className="char-col-right">
                                    <ViewEdit
                                        key={followerData._id+"_val"} 
                                        id={followerData._id+"_val"}
                                        name={statIndex}
                                        group="followers"
                                        field="who.value"
                                        value={stat.value}
                                        addWindowClickListener={props.funcs.addWindowClickListener}
                                        removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                        editInProgress={props.funcs.editInProgress}
                                        setEditInProgress={props.funcs.setEditInProgress}
                                        saveEdit={props.funcs.saveEdit}
                                    />
                                </Col>            
                            </Row>
                        </div>
                        )
                    })}
                </div>
            )
        
    }
    function StatusBlock(prps) {
        console.log("StatusBlock:",prps.data)
        
            return (
                <div className="charsheet-column">
                    <Row>
                        <Col xs={1} lg={1} className="family-col" >
                            { prps.male
                                ? <FontAwesomeIcon icon={faMars} name="gender" onClick={()=>toggleData("male",false)}/>
                                : <FontAwesomeIcon icon={faVenus} name="gender" onClick={()=>toggleData("male",true)}/>
                            }
                        </Col>
                        <Col xs={1} lg={1} className="family-col" >
                            { prps.retired
                                ? <FontAwesomeIcon icon={faBan} name="retired" onClick={()=>toggleData("decearetiredsed",false)}/>
                                : <FontAwesomeIcon icon={faCreativeCommonsBy} name="retired" onClick={()=>toggleData("retired",true)}/>
                            }
                        </Col>
                        <Col xs={1} lg={1} className="family-col" >
                            { prps.deceased
                                ? <FontAwesomeIcon icon={faSkullCrossbones} name="dead" onClick={()=>toggleData("deceased",false)}/>
                                : <FontAwesomeIcon icon={faHeart} name="dead" onClick={()=>toggleData("deceased",true)}/>
                            }
                        </Col>
                        <Col>
                        <Armour 
                            armourArray={prps.armour||[]}
                            funcs={props.funcs}
                        />
                        </Col>
                    </Row>
                </div>
            )
            
    }

    function SkillsBlock(prps) {
        console.log("SkillsBlock:",prps.data)
        
            return (
                <div>
                    {prps.data.map((stat, statIndex)=>{
                        console.log("stat:",stat)
                        return (
                            <div>
                            <Row className="lv-pair">
                                <Col xs={6} lg={6} className="char-col-left">
                                    <ViewEdit
                                        key={followerData._id+"_lab"} 
                                        id={followerData._id+"_lab"}
                                        name={statIndex}
                                        group="followers"
                                        field="stat.label"
                                        lockEdit={true}
                                        value={stat.label}
                                        // addWindowClickListener={props.funcs.addWindowClickListener}
                                        // removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                        // editInProgress={props.funcs.editInProgress}
                                        // setEditInProgress={props.funcs.setEditInProgress}
                                        // saveEdit={props.funcs.saveEdit}
                                    />
                                </Col>
                                <Col xs={6} lg={6} className="char-col-right">
                                    <ViewEdit
                                        key={followerData._id+"_val"} 
                                        id={followerData._id+"_val"}
                                        name={statIndex}
                                        group="followers"
                                        field="who.value"
                                        value={stat.value}
                                        addWindowClickListener={props.funcs.addWindowClickListener}
                                        removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                        editInProgress={props.funcs.editInProgress}
                                        setEditInProgress={props.funcs.setEditInProgress}
                                        saveEdit={props.funcs.saveEdit}
                                    />
                                </Col>            
                            </Row>
                        </div>
                        )
                    })}
                </div>
            )
}
function ReputationBlock(prps) {
    console.log("ReputationBlock:",prps.data)
    
        return (
            <div>
                {prps.data.map((stat, statIndex)=>{
                    console.log("stat:",stat)
                    return (
                        <div>
                        <Row className="lv-pair">
                            <Col xs={6} lg={6} className="char-col-left">
                                <ViewEdit
                                    key={followerData._id+"_lab"} 
                                    id={followerData._id+"_lab"}
                                    name={statIndex}
                                    group="followers"
                                    field="stat.label"
                                    lockEdit={true}
                                    value={stat.label}
                                    // addWindowClickListener={props.funcs.addWindowClickListener}
                                    // removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                    // editInProgress={props.funcs.editInProgress}
                                    // setEditInProgress={props.funcs.setEditInProgress}
                                    // saveEdit={props.funcs.saveEdit}
                                />
                            </Col>
                            <Col xs={6} lg={6} className="char-col-right">
                                <ViewEdit
                                    key={followerData._id+"_val"} 
                                    id={followerData._id+"_val"}
                                    name={statIndex}
                                    group="followers"
                                    field="who.value"
                                    value={stat.value}
                                    addWindowClickListener={props.funcs.addWindowClickListener}
                                    removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                    editInProgress={props.funcs.editInProgress}
                                    setEditInProgress={props.funcs.setEditInProgress}
                                    saveEdit={props.funcs.saveEdit}
                                />
                            </Col>            
                        </Row>
                    </div>
                    )
                })}
            </div>
        )
            
    }
    return (
        <div>
            <WhoBlock data={whoData} />
            <Col xs={12} className="aux-control">
                {showSheet 
                ?   <FontAwesomeIcon 
                    icon={faChevronUp} 
                    name="stables_chevron" 
                    aria-expanded={showSheet}
                    aria-controls={"follower_sheet"}
                    onClick={()=>setShowSheet(!showSheet)}
                />
                : <FontAwesomeIcon 
                    icon={faChevronDown} 
                    name="stables_chevron" 
                    aria-expanded={showSheet}
                    aria-controls={"follower_sheet"}
                    onClick={()=>setShowSheet(!showSheet)}
                />}
            </Col>
            <Collapse in={showSheet}>
                <div id="follower-sheet" className="ghost-div">
                    <AboutBlock data={aboutData} />
                    <hr />
                    <StatusBlock data={statusData} />
                    <hr />
                    <SkillsBlock data={skillsData} />
                    <hr />
                    <ReputationBlock data={reputationData} />
                </div>
            </Collapse> 
        </div>
    )        
    

    }   
