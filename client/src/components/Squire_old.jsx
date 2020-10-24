import React, { useState } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';
import ViewEdit from './ViewEdit';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faHeart, faMars, faVenus, faChevronDown, faChevronUp, faBan, faInfoCircle, faBook } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faCreativeCommonsBy } from "@fortawesome/free-brands-svg-icons";


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

    function Squire (props) {   
        // console.log("LOADING ViewEditFamily. Props:",props)


        const [showAbout, setShowAbout] = useState(false)
        const [showSkills, setShowSkills] = useState(false)
        const [showReputation, setShowReputation] = useState(false)
        
        const index = props.data.index
        // console.log("index:",index);
        const personId = props.data._id
        // console.log("personId:",personId);
        const who = props.data.who || [];
        // console.log("who:",who);
        const about = props.data.about || [];
        // console.log("about:",about)
        const status = props.data.status || [];
        // console.log("status:",status)
        const skills = props.data.skills || [];
        // console.log("skills:",skills)
        const reputation = props.data.reputation || [];
        // console.log("reputation:",reputation);

        function toggleData(toggle, newVal) {
            const data = {
                group: "squires.status",
                field: toggle,
                value: newVal,
                fieldId: personId
            };
            
            console.log("Toggle data:",data)
            props.saveEdit(data)
        }

        return (
            <div>
                
                {who.map((item,index)=>{
                    return (
                        <Row  className="lv-pair">
                            <Col xs={6} lg={6}>
                                <ViewEdit 
                                    key={"who_label_"+personId} 
                                    id={"who_label_"+personId} 
                                    name={personId}
                                    group="squires.who"
                                    field="label"
                                    value={item.label}
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
                                    group="squires.who"
                                    nestedId={personId}
                                    field="value"
                                    value={item.value}
                                    placeHolderText="add name"
                                    addWindowClickListener={props.addWindowClickListener}
                                    removeWindowClickListeners={props.removeWindowClickListeners}
                                    editInProgress={props.editInProgress}
                                    setEditInProgress={props.setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>  
                        </Row>
                        )
                })}
                <Row  className="lv-pair">
                    <Col>
                        <ViewEdit
                            key={"who_new_lab"} 
                            id={"who_new_lab"}
                            name={''}
                            group="squires.who"
                            field="new"
                            value={''}
                            placeHolderText="Click to add info"
                            addWindowClickListener={props.addWindowClickListener}
                            removeWindowClickListeners={props.removeWindowClickListeners}
                            editInProgress={props.editInProgress}
                            setEditInProgress={props.setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </Col>
                </Row>        
                <hr />
                <Row className="squires-row" >
                    <Col xs={1} lg={1} className="squires-col" >
                        { status.male
                            ? <FontAwesomeIcon icon={faMars} name="gender" onClick={()=>toggleData("male",false)}/>
                            : <FontAwesomeIcon icon={faVenus} name="gender" onClick={()=>toggleData("male",true)}/>
                        }
                    </Col>
                    <Col xs={1} lg={1} className="squires-col" >
                        { status.deceased
                            ? <FontAwesomeIcon icon={faSkullCrossbones} name="dead" onClick={()=>toggleData("deceased",false)}/>
                            : <FontAwesomeIcon icon={faHeart} name="dead" onClick={()=>toggleData("deceased",true)}/>
                        }
                    </Col>
                    <Col xs={1} lg={1} className="squires-col" >
                        { status.retired
                            ? <FontAwesomeIcon icon={faBan} name="retired" onClick={()=>toggleData("decearetiredsed",false)}/>
                            : <FontAwesomeIcon icon={faCreativeCommonsBy} name="retired" onClick={()=>toggleData("retired",true)}/>
                        }
                    </Col>
                    <Col xs={1} lg={1} className="squires-col" >
                        <FontAwesomeIcon 
                            icon={faInfoCircle} 
                            name="showAbout" 
                            aria-expanded={showAbout}
                            aria-controls={"about_block"+personId}
                            onClick={()=>setShowAbout(!showAbout)}
                        />
                        {showAbout 
                        ?   <FontAwesomeIcon 
                            icon={faChevronUp} 
                            name="showAbout" 
                            aria-expanded={showAbout}
                            aria-controls={"about_block"+personId}
                            onClick={()=>setShowAbout(!showAbout)}
                        />
                        : <FontAwesomeIcon 
                            icon={faChevronDown} 
                            name="showAbout" 
                            aria-expanded={showAbout}
                            aria-controls={"about_block"+personId}
                            onClick={()=>setShowAbout(!showAbout)}
                        />}
                    </Col>                   
                    <Col xs={1} lg={1} className="squires-col" >
                        <FontAwesomeIcon 
                            icon={faBook} 
                            name="showSkills" 
                            aria-expanded={showSkills}
                            aria-controls={"skills_block"+personId}
                            onClick={()=>setShowSkills(!showSkills)}
                        />
                        {showSkills 
                        ?   <FontAwesomeIcon 
                            icon={faChevronUp} 
                            name="showSkills" 
                            aria-expanded={showSkills}
                            aria-controls={"skills_block"+personId}
                            onClick={()=>setShowSkills(!showSkills)}
                        />
                        : <FontAwesomeIcon 
                            icon={faChevronDown} 
                            name="showSkills" 
                            aria-expanded={showSkills}
                            aria-controls={"skills_block"+personId}
                            onClick={()=>setShowSkills(!showSkills)}
                        />}
                    </Col>
                    <Col xs={1} lg={1} className="squires-col" >
                        <FontAwesomeIcon 
                            icon={faStar} 
                            name="showReputation" 
                            aria-expanded={showReputation}
                            aria-controls={"rep_block"+personId}
                            onClick={()=>setShowReputation(!showReputation)}
                        />
                        {showReputation 
                        ?   <FontAwesomeIcon 
                            icon={faChevronUp} 
                            name="showReputation" 
                            aria-expanded={showReputation}
                            aria-controls={"rep_block"+personId}
                            onClick={()=>setShowReputation(!showReputation)}
                        />
                        : <FontAwesomeIcon 
                            icon={faChevronDown} 
                            name="showReputation" 
                            aria-expanded={showReputation}
                            aria-controls={"rep_block"+personId}
                            onClick={()=>setShowReputation(!showReputation)}
                        />}
                    </Col>
                </Row>
                <hr />
                <Collapse in={showAbout}>
                <div id={"about_block"+personId} >
                {about.map((item,index)=>{
                    return (
                        <Row  className="lv-pair">
                            <Col xs={6} lg={6}>
                                <ViewEdit 
                                    key={"about_"+index+"_label_"+personId} 
                                    id={"about_"+index+"_label_"+personId} 
                                    name={index}
                                    group="squires.about"
                                    field="label"
                                    value={item.label}
                                    addWindowClickListener={props.addWindowClickListener}
                                    removeWindowClickListeners={props.removeWindowClickListeners}
                                    editInProgress={props.editInProgress}
                                    setEditInProgress={props.setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                            <Col xs={6} lg={6}>
                                <ViewEdit 
                                    key={"about_"+index+"_value_"+personId} 
                                    id={"about_"+index+"_value_"+personId} 
                                    name={index}
                                    group="squires.about"
                                    nestedId={personId}
                                    field="value"
                                    value={item.value}
                                    placeHolderText="add name"
                                    addWindowClickListener={props.addWindowClickListener}
                                    removeWindowClickListeners={props.removeWindowClickListeners}
                                    editInProgress={props.editInProgress}
                                    setEditInProgress={props.setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>  
                        </Row>
                        )
                })}
                <Row  className="lv-pair">
                    <Col>
                        <ViewEdit
                            key={"who_new_lab"} 
                            id={"who_new_lab"}
                            name={''}
                            group="squires.about"
                            field="new"
                            value={''}
                            placeHolderText="Click to add info"
                            addWindowClickListener={props.addWindowClickListener}
                            removeWindowClickListeners={props.removeWindowClickListeners}
                            editInProgress={props.editInProgress}
                            setEditInProgress={props.setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </Col>
                </Row>     
                </div>  
                </Collapse> 
                <hr />
                <Collapse in={showSkills}>
                <div id={"skills_block"+personId} >
                {skills.map((item,index)=>{
                    return (
                        <Row  className="lv-pair">
                            <Col xs={6} lg={6}>
                                <ViewEdit 
                                    key={"skills_"+index+"_label_"+personId} 
                                    id={"skills_"+index+"_label_"+personId} 
                                    name={index}
                                    group="squires.skills"
                                    field="label"
                                    nestedId={personId}
                                    value={item.label}
                                    addWindowClickListener={props.addWindowClickListener}
                                    removeWindowClickListeners={props.removeWindowClickListeners}
                                    editInProgress={props.editInProgress}
                                    setEditInProgress={props.setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>
                            <Col xs={6} lg={6}>
                                <ViewEdit 
                                    key={"skills_"+index+"_value_"+personId} 
                                    id={"skills_"+index+"_value_"+personId} 
                                    name={index}
                                    group="squires.skills"
                                    field="value"
                                    nestedId={personId}
                                    value={item.value}
                                    placeHolderText="add value"
                                    addWindowClickListener={props.addWindowClickListener}
                                    removeWindowClickListeners={props.removeWindowClickListeners}
                                    editInProgress={props.editInProgress}
                                    setEditInProgress={props.setEditInProgress}
                                    saveEdit={props.saveEdit}
                                />
                            </Col>  
                        </Row>
                        )
                })}
                <Row  className="lv-pair">
                    <Col>
                        <ViewEdit
                            key={"skill_new_lab"} 
                            id={"skill_new_lab"}
                            name={''}
                            group="squires.skills"
                            field="new"
                            value={''}
                            placeHolderText="Click to add a skill"
                            addWindowClickListener={props.addWindowClickListener}
                            removeWindowClickListeners={props.removeWindowClickListeners}
                            editInProgress={props.editInProgress}
                            setEditInProgress={props.setEditInProgress}
                            saveEdit={props.saveEdit}
                        />
                    </Col>
                </Row>   
                </div>
                </Collapse>     
                <hr />
                
                <Collapse in={showReputation}>
                    <div id={"rep_block"+personId} >
                        {(reputation.length>0)&&(<p>Reputation:</p>)}
                        {reputation.map((famousTrait, index)=>{
                            return (
                                <ViewEdit 
                                    key={"reputation_"+index+"_"+personId} 
                                    id={"reputation_"+index+"_"+personId} 
                                    name={index}
                                    group={"squires.reputation"}
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
                            group={"squires.reputation"}
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


export default Squire;