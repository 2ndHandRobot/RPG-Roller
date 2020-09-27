import React, { useState } from 'react';
import _ from 'lodash';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ViewEdit from './ViewEdit';
import ViewEditPersonality from './ViewEditPersonality';

export default function KnightSheet(props) {
    // const [editMode, setEditMode] = useState(false);

    console.log("Knight data: ",props.activeKnight.knightData);

    // const    {playerInfo,personalInfo,personalityTraits,passions,statistics,skills,combatSkills} = props.activeKnight.knightData;
    

    function getPersonality(p) {
        // console.log('p: ',p);
        let value1, value2
        if (p.paragon > 0){
            value1 = 20 + p.paragon;
            value2 = 0;
        } else if (p.paragon < 0){
            value1 = 0;
            value2 = 20 - p.paragon;
        } else {
            value1 = p.value;
            value2 = 20-p.value;
        }
        
        const personalityString = _.startCase(p.traits.trait1)+' :: '+(value1.toString())+' // '+_.startCase(p.traits.trait2)+' :: '+(value2.toString())

        return personalityString
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
    return (
        <div className="Charsheet" key={props.activeKnight.knightData._id}>
        <div>
            <Row>
                <Col className="charsheet-column">
                    <div className="charsheet-box">
                        {/* {personalInfo.map((item, index)=>{ */}
                        {props.activeKnight.knightData.personalInfo.map((item, index)=>{
                            return (
                                
                                    <ViewEdit
                                        key={item._id} 
                                        entry={item}
                                        valType="text"
                                        group="personalInfo"
                                        canEditLabel={true}
                                        canEditValue={true}
                                        saveEntry={props.saveEntry}
                                    />
                                
                            )
                        })}
                    </div>
               
                    <div key="statistics" className="charsheet-box">
                        {/* {stats.map((item, index)=>{ */}
                        {props.activeKnight.knightData.statistics.map((item, index)=>{
                            return (
                                <div>
                                    <ViewEdit
                                        key={item._id} 
                                        entry={item}
                                        valType="number"
                                        group="statistics"
                                        canEditLabel={false}
                                        canEditValue={true}
                                        saveEntry={props.saveEntry}
                                    />
                                </div>
                            )
                        })}
                        {derivedStats().map((item, index)=>{
                            return (
                                    <ViewEdit
                                        key={index} 
                                        entry={item}
                                        valType="sting"
                                        group="statistics"
                                        canEditLabel={false}
                                        canEditValue={false}
                                        saveEntry={props.saveEntry}
                                    />
                            )
                        })}
                    </div>

                    
                </Col>
 
                <Col className="charsheet-column">
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

                    <div className="charsheet-box">
                        {/* {passions.map((item, index)=>{ */}
                        {props.activeKnight.knightData.passions.map((item, index)=>{
                            return (
                                <div>
                                    <ViewEdit
                                        key={item._id} 
                                        entry={item}
                                        valType="number"
                                        group="passions"
                                        canEditLabel={true}
                                        canEditValue={true}
                                        saveEntry={props.saveEntry}
                                    />
                                </div>
                            )
                        })}
                        
                    </div>
                    
                </Col>
                <Col className="charsheet-column">
                    <div key="combatSkills" className="charsheet-box">
                        {/* {combatSkills.general.map((item, index)=>{ */}
                        {props.activeKnight.knightData.combatSkills.general.map((item, index)=>{
                            return (
                                <div>
                                    <ViewEdit
                                        key={item._id} 
                                        entry={item}
                                        valType="number"
                                        group="combatSkills.general"
                                        canEditLabel={true}
                                        canEditValue={true}
                                        saveEntry={props.saveEntry}
                                    />
                                </div>
                            )
                        })}
                        {/* {combatSkills.weapons.map((item, index)=>{ */}
                        {props.activeKnight.knightData.combatSkills.weapons.map((item, index)=>{
                            return (
                                <div>
                                    <ViewEdit
                                        key={item._id}
                                        entry={item}
                                        valType="number"
                                        group="combatSkills.weapons"
                                        canEditLabel={true}
                                        canEditValue={true}
                                        saveEntry={props.saveEntry}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div key="skills" className="charsheet-box">
                        {/* {skills.map((item, index)=>{ */}
                            {props.activeKnight.knightData.skills.map((item, index)=>{
                            return (
                                    <ViewEdit
                                        key={index}
                                        entry={item}
                                        valType="number"
                                        group="skills"
                                        canEditLabel={true}
                                        canEditValue={true}
                                        saveEntry={props.saveEntry}
                                    />
                            
                            )
                        })}
                    </div>
                    {/* <div className="equipment">
                        {personalInfo.map(info=>{
                            return <p key={index}>{info}</p>
                        })}
                    </div> */}
                </Col>
            </Row>
        </div>
        </div>
    )
}