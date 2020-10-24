// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Collapse } from 'react-bootstrap';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShieldAlt, faInfoCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// import ViewEdit from './ViewEdit';


// export default function Armour(props){
//     const [showArmour, setShowArmour] = useState(false);
//     const [armourVal, setArmourVal] = useState(0);
//     useEffect(()=>{console.log("Initial Armour Calculation");setArmourVal(calcArmourValue())},[]);


//     function handleBoxTick(event, fieldId){
//         console.log("Handling Tick Event on",fieldId)
//         console.log("checked:",event.target.checked)
        
        
//         console.log("ticked an armour box. Updating total")
        
//         for (var a of props.armourArray) {
//             console.log("Armour item:",a)
//             if (a._id === event.target.id) {
//                 console.log("Armour matched:",a)
//                 a.isTicked=!a.isTicked;
//             }
//         }
        
//         setArmourVal(calcArmourValue())
        

//         const payload = {
//             group: event.target.name,
//             field: "isTicked",
//             value: event.target.checked,
//             fieldId: fieldId
//         }
//         props.saveEdit(payload);
//     }

//     function calcArmourValue() {
//         console.log("calculating current armour value")
//         const equippedArmour = props.armourArray.filter(a=>a.isTicked).map(a=>a.value)
//         let sumArmour = 0;
//         console.log("equippedArmour:",equippedArmour)
//         if (equippedArmour.length>0){
//             sumArmour = equippedArmour.reduce((a,b)=>a+b);
//         }
//         console.log("new armour value is:",sumArmour)
//         return sumArmour;
//     }

//     return (
//         <Container>
//             <h6 className="armour-total">Armour: {armourVal || 0}</h6>
//             <Col xs={12} className="aux-control">
//                 <FontAwesomeIcon 
//                     icon={faShieldAlt} 
//                     name="armour-info" 
//                     aria-expanded={showArmour}
//                     aria-controls={"armour-detail"}
//                     onClick={()=>setShowArmour(!showArmour)}
//                 />
//                 {showArmour 
//                 ?   <FontAwesomeIcon 
//                     icon={faChevronUp} 
//                     name="armour_chevron" 
//                     aria-expanded={showArmour}
//                     aria-controls={"armour-detail"}
//                     onClick={()=>setShowArmour(!showArmour)}
//                 />
//                 : <FontAwesomeIcon 
//                     icon={faChevronDown} 
//                     name="armour_chevron" 
//                     aria-expanded={showArmour}
//                     aria-controls={"armour-detail"}
//                     onClick={()=>setShowArmour(!showArmour)}
//                 />}
//             </Col>
//             <Collapse in={showArmour}>
//                 <Container id="armour-detail">
//                     <Row className="lv-headers">
//                         <Col xs={2} className="tick_col">
//                             <p>equip</p>
//                         </Col>
//                         <Col xs={8} className="lab_col">
//                             <p>armour type</p>
//                         </Col>
//                         <Col xs={2} className="val_col">
//                             <FontAwesomeIcon icon={faShieldAlt} />
//                         </Col>
//                     </Row>
//                     {props.armourArray.map((item, index)=>{
//                         return (
//                             <Row  className="lv-pair">
//                             <Col xs={1} lg={1} className="tick_col">
//                                     <input 
//                                         type="checkbox" 
//                                         id={item._id} 
//                                         name="armour" 
//                                         className="entry_tick" 
//                                         onClick={(event)=>{handleBoxTick(event, item._id)}} 
//                                         defaultChecked={item.isTicked}
//                                     />
//                                 </Col>
//                                 <Col xs={9} lg={9} className="label_col">
//                                     <ViewEdit
//                                         key={item._id+"_lab"} 
//                                         id={item._id+"_lab"}
//                                         fieldId={item._id}
//                                         group="armour"
//                                         field="label"
//                                         value={item.label}
//                                         addWindowClickListener={props.addWindowClickListener}
//                                         removeWindowClickListeners={props.removeWindowClickListeners}
//                                         editInProgress={props.editInProgress}
//                                         setEditInProgress={props.setEditInProgress}
//                                         saveEdit={props.saveEdit}
//                                     />
//                                     </Col>
//                                 <Col xs={2} lg={2} className="value_col">
//                                     <ViewEdit
//                                         key={item._id+"_val"} 
//                                         id={item._id+"_val"}
//                                         fieldId={item._id}
//                                         group="armour"
//                                         field="value"
//                                         value={item.value || 0}
//                                         placeHolderText="0"
//                                         addWindowClickListener={props.addWindowClickListener}
//                                         removeWindowClickListeners={props.removeWindowClickListeners}
//                                         editInProgress={props.editInProgress}
//                                         setEditInProgress={props.setEditInProgress}
//                                         saveEdit={props.saveEdit}
//                                     />    
//                                 </Col>
                                
//                             </Row>
//                         )
//                     })}
//                     <Row  className="lv-pair">
//                         <Col>
//                             <ViewEdit
//                                 key={"armour_new_lab"} 
//                                 id={"armour_new_lab"}
//                                 fieldId={''}
//                                 group="armour"
//                                 field="new"
//                                 value={''}
//                                 placeHolderText="Click to add armour"
//                                 addWindowClickListener={props.addWindowClickListener}
//                                 removeWindowClickListeners={props.removeWindowClickListeners}
//                                 editInProgress={props.editInProgress}
//                                 setEditInProgress={props.setEditInProgress}
//                                 saveEdit={props.saveEdit}
//                             />
//                         </Col>
//                     </Row>
//                 </Container>
//             </Collapse>
//         </Container>
//     )
// }