import React, { useState } from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones, faStar, faGem, faHeart, faMars, faVenus, faShieldAlt, faBan, faInfoCircle, faChevronDown, faChevronUp, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faCreativeCommonsBy } from "@fortawesome/free-brands-svg-icons";

import Disp from '../DisplayState';

import ViewEdit from './ViewEdit';
// import Armour from './Armour';


class Squire extends  React.Component {
    // PROPS: 
    // props.data = the squire's character sheet data
    // props.func = the PROTECTED function  (and variable) bundle VEFuncs 
    // props.saveEdit = the PROTECTED function for saving Auxiliaries
    // props.auxValueChange = the PROTECTED function for saving changes to Auxiliary toggles
    // ** N.B.: These function bundles need tidying up. At the very least into VE and Aux bundles **

    constructor(props){
        super(props);
        
        
        this.personId = this.props.data._id
        this.state = { 
            showEquipment: false,
            showReputation: false,
            showArmour: false,
            armourVal: 0,
            
            
            
        
        }
        console.log("SQUIRE:: loading component. Props:",this.props.data)

        this.saveSquireEdit=this.saveSquireEdit.bind(this);
        this.WhoBlock=this.WhoBlock.bind(this);
        this.AboutBlock=this.AboutBlock.bind(this);
        this.StatusBlock=this.StatusBlock.bind(this);
        this.SkillsBlock=this.SkillsBlock.bind(this);
        this.ArmourBlock=this.ArmourBlock.bind(this);
        this.EquipmentBlock=this.EquipmentBlock.bind(this);
        this.ReputationBlock=this.ReputationBlock.bind(this);
        
    }
        
        
    static getDerivedStateFromProps(props, state){
        
        console.log("SQUIRE :: MOUNTING: restoring View Toggles & armour value"); 

        function initArmourValue() {
            console.log("SQUIRE :: DOING: initArmourValue: ")
            const equippedArmour = props.data.armour.filter(a=>a.isTicked).map(a=>a.value)
            let sumArmour = 0;
            console.log("SQUIRE :: calcArmourValue: equippedArmour:",equippedArmour)
            if (equippedArmour.length>0){
                sumArmour = equippedArmour.reduce((a,b)=>a+b);
            }
            console.log("SQUIRE :: calcArmourValue: new armour value is:",sumArmour)
            return sumArmour;
        }
        return { 
            showEquipment: Disp.getToggleState("eqpt_block_"+props.data._id),
            showReputation: Disp.getToggleState("rep_block_"+props.data._id),
            showArmour: Disp.getToggleState("arm_block_"+props.data._id),
            armourVal: initArmourValue(),
        }
    }

    setViewToggles() {
        this.setState({showEquipment:Disp.getToggleState("eqpt_block_"+this.personId)})
        this.setState({showReputation:Disp.getToggleState("rep_block_"+this.personId)})
        this.setState({showArmour:Disp.getToggleState("arm_block_"+this.personId)})
    }

    calcArmourValue() {
        console.log("SQUIRE :: DOING: calcArmourValue: ")
        const equippedArmour = this.props.data.armour.filter(a=>a.isTicked).map(a=>a.value)
        let sumArmour = 0;
        console.log("SQUIRE :: calcArmourValue: equippedArmour:",equippedArmour)
        if (equippedArmour.length>0){
            sumArmour = equippedArmour.reduce((a,b)=>a+b);
        }
        console.log("SQUIRE :: calcArmourValue: new armour value is:",sumArmour)
        return sumArmour;
    }

    // handleArmourBoxTick(event, fieldId){
    //     console.log("Handling Amrour tick event on",fieldId)
    //     console.log("checked:",event.target.checked)
        
        
    //     console.log("ticked an armour box. Updating total")
        
    //     for (var a of props.armourArray) {
    //         console.log("Armour item:",a)
    //         if (a._id === event.target.id) {
    //             console.log("Armour matched:",a)
    //             a.isTicked=!a.isTicked;
    //         }
    //     }
        
    //     this.setState({armourVal:this.calcArmourValue()})
        

    //     const payload = {
    //         group: event.target.name,
    //         field: "isTicked",
    //         value: event.target.checked,
    //         fieldId: fieldId
    //     }
    //     props.saveEdit(payload);
    // }


    toggleData(fieldId, newVal) {
        const data = {
            group: "status",
            field: "value",
            value: newVal,
            fieldId: fieldId
        };
        
        console.log("Toggle data:",data)
        this.saveSquireEdit(data)
    }

    saveSquireEdit(thisprops){
        const payload = {
            auxId: this.props.data._id,
            auxType: "squires",
            group: thisprops.group,
            field: thisprops.field,
            value: thisprops.value,
            fieldId: thisprops.fieldId
        }
        this.props.saveAuxiliary(payload)
    }

    handleDispToggleClick(eventTarget) {
        console.log("SQUIRE :: DOING: handleDispToggleClick. eventTarget:",eventTarget)
        const toggleId = eventTarget
        const toggleState = Disp.getToggleState(toggleId)
        
        console.log("SQUIRE :: handleDispToggleClick: saving toggle state for", toggleId,". Changing from",toggleState)
        console.log("SQUIRE :: handleDispToggleClick: Event target:",eventTarget)
        if (toggleState) {
            Disp.clearToggleState(toggleId)
        } else {
            Disp.setToggleState(toggleId)
        }
        
        console.log("SQUIRE :: handleDispToggleClick: Saved toggle state now", Disp.getToggleState(toggleId))
        
    }




// Sub-Components
    WhoBlock(prps) {
        // console.log("WhoBlock:",prps.data)
            return (
                <div>
                {prps.data.map((whoItem, whoIndex)=>{
                {/* console.log("whoItem:",whoItem) */}
                return (
                    <div>
                    <Row className="lv-pair">
                        <Col xs={6} lg={6} className="char-col-left">
                            <ViewEdit
                                key={whoItem._id+"_lab"} 
                                id={whoItem._id+"_lab"}
                                fieldId={whoItem._id}
                                group="who"
                                field="label"
                                value={whoItem.label}
                                placeHolderText="add squire type"
                                addWindowClickListener={prps.addWindowClickListener}
                                removeWindowClickListeners={prps.removeWindowClickListeners}
                                editInProgress={prps.editInProgress}
                                setEditInProgress={prps.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                            />
                        </Col>
                        <Col xs={6} lg={6} className="char-col-right">
                            <ViewEdit
                                key={whoItem._id+"_val"} 
                                id={whoItem._id+"_val"}
                                fieldId={whoItem._id}
                                group="who"
                                field="value"
                                value={whoItem.value}
                                placeHolderText="add name"
                                addWindowClickListener={prps.addWindowClickListener}
                                removeWindowClickListeners={prps.removeWindowClickListeners}
                                editInProgress={prps.editInProgress}
                                setEditInProgress={prps.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                            />
                        </Col>            
                    </Row>
                    </div>
                )
             })}
            </div>)
        
    }

    AboutBlock(prps) {
        // console.log("AboutBlock:",prps.data)
        // function sBlock (){
            return (
                <div>
                    {prps.data.map((stat, statIndex)=>{
                        {/* console.log("stat:",stat) */}
                        return (
                            <div>
                            <Row className="lv-pair">
                                <Col xs={6} lg={6} className="char-col-left">
                                    <ViewEdit
                                        key={prps.squireId+"_lab_"+statIndex} 
                                        id={prps.squireId+"_lab_"+statIndex}
                                        fieldId={statIndex}
                                        group="about"
                                        field="label"
                                        lockEdit={true}
                                        value={stat.label}
                                    />
                                </Col>
                                <Col xs={6} lg={6} className="char-col-right">
                                    <ViewEdit
                                        key={prps.squireId+"_val_"+statIndex} 
                                        id={prps.squireId+"_val_"+statIndex}
                                        fieldId={stat._id}
                                        group="about"
                                        field="value"
                                        value={stat.value}
                                        addWindowClickListener={prps.addWindowClickListener}
                                        removeWindowClickListeners={prps.removeWindowClickListeners}
                                        editInProgress={prps.editInProgress}
                                        setEditInProgress={prps.setEditInProgress}
                                        saveEdit={this.saveSquireEdit}
                                    />
                                </Col>            
                            </Row>
                        </div>
                        )
                    })}
                </div>
            )
        
    }
    
    StatusBlock(prps) {
        console.log("StatusBlock data:",prps.data)
        // const reProps = prps.data.map(item=>{return{[item.label]: {value: item.value, _id: item._id}}})
        var rePropsArr = prps.data.map(item=>{
            console.log("label:",item.label)
            console.log("value:",item.value)
            console.log("_id:",item._id)
            
            console.log("assembled:",{[item.label]: {value: item.value, _id: item._id}})
            const newObj = {[item.label]: {value: item.value, _id: item._id}}
            
            return newObj
        })
        const reProps = Object.assign({},...rePropsArr)
        console.log("StatusBlock data reformatted:",reProps)

            return (
                <div className="charsheet-column">
                    <Row className="inline-div">
                    
                        <Col className="family-col" >
                            { reProps.male.value
                                ? <FontAwesomeIcon icon={faMars} verticalAlign="middle" name="gender" data-toggle="tooltip" title="male" onClick={()=>this.toggleData(reProps.male._id,false)}/>
                                : <FontAwesomeIcon icon={faVenus} name="gender" data-toggle="tooltip" title="female" onClick={()=>this.toggleData(reProps.male._id,true)}/>
                            }
                        </Col>
                        <Col className="family-col" >
                            { reProps.retired.value
                                ? <FontAwesomeIcon icon={faBan} name="retired" data-toggle="tooltip" title="retired" onClick={()=>this.toggleData(reProps.retired._id,false)}/>
                                : <FontAwesomeIcon icon={faCreativeCommonsBy} name="retired" data-toggle="tooltip" title="active" onClick={()=>this.toggleData(reProps.retired._id,true)}/>
                            }
                        </Col>
                        <Col className="family-col" >
                            { reProps.deceased.value
                                ? <FontAwesomeIcon icon={faSkullCrossbones} name="dead" data-toggle="tooltip" title="deceased" onClick={()=>this.toggleData(reProps.deceased._id,false)}/>
                                : <FontAwesomeIcon icon={faHeart} name="dead" data-toggle="tooltip" title="alive" onClick={()=>this.toggleData(reProps.deceased._id,true)}/>
                            }
                        </Col>
                       
                    </Row>
                </div>
            )
            
    }
    ReputationBlock(prps) {
        // console.log("ReputationBlock:",prps.data)
        return (
            <div name="reputation_block" className="ghost-div">
                <div 
                    className="aligned-div" 
                    name={"rep_block_"+this.personId} onClick={()=>{
                        this.handleDispToggleClick("rep_block_"+this.personId);
                        this.setState({showReputation:!this.state.showReputation})
                    }}
                >
                    <Col xs={1} lg={1} className="family-col ghost-div icon-pair fa-stack" >
                        <FontAwesomeIcon 
                            icon={faStar} 
                            size="xs"
                            // name={"rep_block"+personId}
                            // aria-expanded={this.props.showStatus}
                            // aria-controls={"rep_block"+this.personId}
                            // onClick={()=>setShowReputation(!showReputation)}
                            
                        />
                        {this.state.showReputation 
                        ?   <FontAwesomeIcon 
                            icon={faChevronUp} 
                            size="xs"
                            // name={"rep_block"+personId}
                            // aria-expanded={this.props.showStatus}
                            // aria-controls={"rep_block"+this.personId}
                            // onClick={()=>setShowReputation(!showReputation)}
                            // onClick={(ev)=>{handleDispToggleClick(ev);setShowReputation(!showReputation);}}
                        />
                        : <FontAwesomeIcon 
                            icon={faChevronDown} 
                            size="xs"
                            // name={"rep_block"+personId}
                            // aria-expanded={this.props.showStatus}
                            // aria-controls={"rep_block"+this.personId}
                            // onClick={()=>setShowReputation(!showReputation)}
                            // onClick={(ev)=>{handleDispToggleClick(ev);setShowReputation(!showReputation);}}
                        />}
                    </Col>
                    <h6>Reputation</h6>
                </div>
                <div>
                    <Collapse in={this.state.showReputation} timeout={10} >
                        <div id={"rep_block_"+this.personId} >
                            {this.props.data.aux_reputation.map((repItem,repIndex)=>{
                                return(
                                    <div key={"rep"+repIndex+"_item_row"} className="lv-pair">
                                        <Col xs={12} lg={12}>
                                            <ViewEdit 
                                                key={this.personId+"_"+repIndex+"_item"} 
                                                id={this.personId+"_"+repIndex+"_item"} 
                                                name={"rep_item"}
                                                group="aux_reputation"
                                                field="single"
                                                fieldId={repIndex}
                                                value={repItem}
                                                placeHolderText="add reputation"
                                                addWindowClickListener={this.props.addWindowClickListener}
                                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                                editInProgress={this.props.editInProgress}
                                                setEditInProgress={this.props.setEditInProgress}
                                                saveEdit={this.saveSquireEdit}
                                            />
                                        </Col>    
                                    </div>
                                )
                            })}
                            <ViewEdit
                                key={"rep_new"+this.personId} 
                                id={"rep_new"+this.personId} 
                                fieldId={''}
                                group="aux_reputation"
                                field="single"
                                value={''}
                                placeHolderText="Click to add reputation"
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                            />
                        </div>
                    </Collapse>
                </div>
            </div>
            )
        }

    


    EquipmentBlock(prps) {
        // console.log("ReputationBlock:",prps.data)
        return (
            <div name="equipment_block" className="ghost-div">
                <div 
                    className="aligned-div" 
                    name={"eqpt_block_"+this.personId} onClick={()=>{
                        this.handleDispToggleClick("eqpt_block_"+this.personId);
                        this.setState({showEquipment:!this.state.showEquipment})
                    }}
                >
                    <Col xs={1} lg={1} className="family-col ghost-div icon-pair fa-stack" >
                        <FontAwesomeIcon 
                            icon={faGem} 
                            size="xs"
                            // name={"rep_block"+personId}
                            // aria-expanded={this.props.showStatus}
                            // aria-controls={"eqpt_block"+this.personId}
                            // onClick={()=>setShowReputation(!showReputation)}
                            
                        />
                        {this.state.showEquipment
                        ?   <FontAwesomeIcon 
                            icon={faChevronUp} 
                            size="xs"
                            // name={"rep_block"+personId}
                            // aria-expanded={this.props.showStatus}
                            // aria-controls={"eqpt_block"+this.personId}
                            // onClick={()=>setShowReputation(!showReputation)}
                            // onClick={(ev)=>{handleDispToggleClick(ev);setShowReputation(!showReputation);}}
                        />
                        : <FontAwesomeIcon 
                            icon={faChevronDown} 
                            size="xs"
                            // name={"rep_block"+personId}
                            // aria-expanded={this.props.showStatus}
                            // aria-controls={"eqpt_block"+this.personId}
                            // onClick={()=>setShowReputation(!showReputation)}
                            // onClick={(ev)=>{handleDispToggleClick(ev);setShowReputation(!showReputation);}}
                        />}
                    </Col>
                    <h6>Valuables</h6>
                </div>
                <div>
                    <Collapse in={this.state.showEquipment} timeout={10} >
                        <div id={"eqpt_block_"+this.personId} >
                            {this.props.data.aux_equipment.map((eqptItem,eqptIndex)=>{
                                return(
                                    <div key={"rep"+eqptIndex+"_item_row"} className="lv-pair">
                                        <Col xs={12} lg={12}>
                                            <ViewEdit 
                                                key={this.personId+"_"+eqptIndex+"_item"} 
                                                id={this.personId+"_"+eqptIndex+"_item"} 
                                                name={"eqpt_item"}
                                                group="aux_equipment"
                                                field="single"
                                                fieldId={eqptIndex}
                                                value={eqptItem}
                                                addWindowClickListener={this.props.addWindowClickListener}
                                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                                editInProgress={this.props.editInProgress}
                                                setEditInProgress={this.props.setEditInProgress}
                                                saveEdit={this.saveSquireEdit}
                                            />
                                        </Col>    
                                    </div>
                                )
                            })}
                            <ViewEdit
                                key={"rep_new"+this.personId} 
                                id={"rep_new"+this.personId} 
                                fieldId={''}
                                group="aux_equipment"
                                field="single"
                                value={''}
                                placeHolderText="Click to add an item"
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                            />
                        </div>
                    </Collapse>
                </div>
            </div>
            )
        }


        ArmourBlock(prps){
            function handleArmourBoxTick(event, fieldId){
                console.log("Handling Amrour tick event on",fieldId)
                console.log("checked:",event.target.checked)
                
                
                console.log("ticked an armour box. Updating total")
                
                for (var a of prps.armourArray) {
                    console.log("Armour item:",a)
                    if (a._id === event.target.id) {
                        console.log("Armour matched:",a)
                        a.isTicked=!a.isTicked;
                    }
                }
                
                this.setState({armourVal:this.calcArmourValue()})
                
        
                const payload = {
                    group: event.target.name,
                    field: "isTicked",
                    value: event.target.checked,
                    fieldId: fieldId
                }
                this.saveSquireEdit(payload);
            }
        
            
            
        
            return (
                <div>
                        <div
                            className="aligned-div" 
                            name={"arm_block_"+this.personId} onClick={()=>{
                                this.handleDispToggleClick("arm_block_"+this.personId);
                                this.setState({showArmour:!this.state.showArmour})
                        }}>

                            <Col xs ={11}>
                                <h6 className="armour-total">Armour: {this.state.armourVal}</h6>
                            </Col>
                            <Col xs={1} className="family-col ghost-div icon-pair fa-stack">
                                <FontAwesomeIcon 
                                    icon={faShieldAlt} 
                                    name="armour-info" 
                                    // aria-expanded={showArmour}
                                    // aria-controls={"armour-detail"}
                                    // onClick={()=>setShowArmour(!showArmour)}
                                />
                                {this.state.showArmour 
                                ?   <FontAwesomeIcon 
                                    icon={faChevronUp} 
                                    name="armour_chevron" 
                                    // aria-expanded={showArmour}
                                    // aria-controls={"armour-detail"}
                                    // onClick={()=>setShowArmour(!showArmour)}
                                />
                                : <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    name="armour_chevron" 
                                    // aria-expanded={showArmour}
                                    // aria-controls={"armour-detail"}
                                    // onClick={()=>setShowArmour(!showArmour)}
                                />}
                            </Col>
                        </div>
                        <Collapse in={this.state.showArmour}>
                            <div id={"arm_block"+this.personId}>
                                <div className="lv-headers">
                                    <Col xs={2} className="tick_col">
                                        <p>equip</p>
                                    </Col>
                                    <Col xs={8} className="lab_col">
                                        <p>armour type</p>
                                    </Col>
                                    <Col xs={2} className="val_col">
                                        <FontAwesomeIcon icon={faShieldAlt} />
                                    </Col>
                                </div>
                                {prps.armourArray.map((item, index)=>{
                                    return (
                                        <Row  className="lv-pair">
                                        <Col xs={1} lg={1} className="tick_col">
                                                <input 
                                                    type="checkbox" 
                                                    id={item._id} 
                                                    name="armour" 
                                                    className="entry_tick" 
                                                    onClick={(event)=>{handleArmourBoxTick(event, item._id)}} 
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
                                                    value={item.label}
                                                    addWindowClickListener={this.props.addWindowClickListener}
                                                    removeWindowClickListeners={this.props.removeWindowClickListeners}
                                                    editInProgress={this.props.editInProgress}
                                                    setEditInProgress={this.props.setEditInProgress}
                                                    saveEdit={this.saveSquireEdit}
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
                                                    addWindowClickListener={this.props.addWindowClickListener}
                                                    removeWindowClickListeners={this.props.removeWindowClickListeners}
                                                    editInProgress={this.props.editInProgress}
                                                    setEditInProgress={this.props.setEditInProgress}
                                                    saveEdit={this.saveSquireEdit}
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
                                            addWindowClickListener={this.props.addWindowClickListener}
                                            removeWindowClickListeners={this.props.removeWindowClickListeners}
                                            editInProgress={this.props.editInProgress}
                                            setEditInProgress={this.props.setEditInProgress}
                                            saveEdit={this.saveSquireEdit}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Collapse>
                </div>
            )
        }


        SkillsBlock(prps) {
            // console.log("SkillsBlock:",prps.data)
            
                return (
                    <div>
                        {prps.data.map((skill, skillIndex)=>{
                            {/* console.log("stat:",stat) */}
                            return (
                                <div>
                                <Row className="lv-pair">
                                    <Col xs={6} lg={6} className="char-col-left">
                                        <ViewEdit
                                            key={prps.squireId+"_lab_"+skill._id} 
                                            id={prps.squireId+"_lab_"+skill._id}
                                            fieldId={skill._id}
                                            group="skills"
                                            field="label"
                                            lockEdit={true}
                                            value={skill.label}
                                            addWindowClickListener={this.props.addWindowClickListener}
                                            removeWindowClickListeners={this.props.removeWindowClickListeners}
                                            editInProgress={this.props.editInProgress}
                                            setEditInProgress={this.props.setEditInProgress}
                                            saveEdit={this.saveSquireEdit}
                                        />
                                    </Col>
                                    <Col xs={6} lg={6} className="char-col-right">
                                        <ViewEdit
                                            key={prps.squireId+"_val_"+skill._id} 
                                            id={prps.squireId+"_val_"+skill._id}
                                            fieldId={skill._id}
                                            group="skills"
                                            field="value"
                                            value={skill.value || 0}
                                            placeHolderText="0"
                                            addWindowClickListener={this.props.addWindowClickListener}
                                            removeWindowClickListeners={this.props.removeWindowClickListeners}
                                            editInProgress={this.props.editInProgress}
                                            setEditInProgress={this.props.setEditInProgress}
                                            saveEdit={this.saveSquireEdit}
                                        />
                                    </Col>            
                                </Row>
                            </div>
                            )
                        })}
                        <ViewEdit
                                key={"skill_new"+this.personId} 
                                id={"skill_new"+this.personId} 
                                fieldId={''}
                                group="skills"
                                field="new"
                                value={''}
                                placeHolderText="Click to add a skill"
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                            />
                    </div>
                )
    }
    

    render () {
        console.log("AUX RENDER: ",this.props.data.who)
        return (
            <Row>
                <Col name="left-col" xs={12} lg={6}> {/* Aux Sheet left column */}
                    <p>{this.auxId}</p>
                    <Row>
                        {/* <Col name="who-col" xs={9} lg={9}> */}
                        <Col name="who-col" >
                            <this.WhoBlock 
                                data={this.props.data.who || {}} 
                                squireId={this.props.data._id} 
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                                deleteEntry={this.props.deleteEntry} 
                                auxValueChange={this.auxValueChange}
                            />
                        </Col>
                        </Row>

                    <Row> 
                        <Col name="status-col" xs={2}></Col>
                        <Col name="status-col" xs={8}>
                                <this.StatusBlock 
                                    data={this.props.data.status ||[]} 
                                    squireId={this.props.data._id} 
                                    addWindowClickListener={this.props.addWindowClickListener}
                                    removeWindowClickListeners={this.props.removeWindowClickListeners}
                                    editInProgress={this.props.editInProgress}
                                    setEditInProgress={this.props.setEditInProgress}
                                    saveEdit={this.saveSquireEdit}
                                    deleteEntry={this.props.deleteEntry}  
                                    auxValueChange={this.auxValueChange}
                                    />
                        </Col>
                        <Col name="status-col" xs={2}></Col>
                    </Row>

                    <Row> 
                        <Col name="left-col-main" >
                            <this.AboutBlock 
                                data={this.props.data.about ||[]} 
                                squireId={this.props.data._id}  
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                                deleteEntry={this.props.deleteEntry}  
                                auxValueChange={this.auxValueChange}
                            />
                            <hr />
                            <this.ReputationBlock 
                                data={this.props.data.reputation ||[]} 
                                squireId={this.props.data._id}  
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                                deleteEntry={this.props.deleteEntry}  
                                auxValueChange={this.auxValueChange}
                            />
                            <hr />
                            <this.EquipmentBlock 
                                data={this.props.data.equipment ||[]} 
                                squireId={this.props.data._id}  
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                                deleteEntry={this.props.deleteEntry}  
                                auxValueChange={this.auxValueChange}
                            />
                        </Col>
                    </Row>
                </Col>       
                <Col name="right-col" xs={12} lg={6}> {/* Aux Sheet right column */}
                    <Row>
                        <Col name="right-col-main" >
                            
                            <this.ArmourBlock 
                                armourArray={this.props.data.armour||[]}
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                                deleteEntry={this.props.deleteEntry}
                            />
                            <hr />
                            <this.SkillsBlock 
                                data={this.props.data.skills ||[]} 
                                squireId={this.props.data._id}  
                                addWindowClickListener={this.props.addWindowClickListener}
                                removeWindowClickListeners={this.props.removeWindowClickListeners}
                                editInProgress={this.props.editInProgress}
                                setEditInProgress={this.props.setEditInProgress}
                                saveEdit={this.saveSquireEdit}
                                deleteEntry={this.props.deleteEntry}
                                auxValueChange={this.auxValueChange}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )        
    }

    }   


    export default Squire;