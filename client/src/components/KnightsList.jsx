import React, { useState } from 'react';
import { Container, Collapse } from 'react-bootstrap';

import Disp from '../DisplayState'

export default function KnightsList(props) {
    console.log("KNIGHTSLIST :: props=",props);
    
    const [showOwn, setShowOwn] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [showView, setShowView] = useState(false);
        
    
    return (
        <Container>
            <h5 
                onClick={()=>{setShowOwn(!showOwn)}} 
                aria-expanded={showOwn} 
                aria-controls={"list_own"}
            >Own Knights</h5>
            <Collapse in={showOwn}>
                <div id="list_own">
                    {props.listData.isOwner
                    && props.listData.isOwner.map((char, index)=>{
                        return( 
                            <div>
                                <button 
                                    key={"own_"+index}  
                                    type="button" 
                                    className="character-list" 
                                    onClick={()=>{
                                        Disp.clearDisplayState();
                                        props.openSheet(char._id, "own")}
                                        }
                                >
                                    {char.name!==""
                                    ?char.name
                                    :"(unnamed knight)"}
                                </button>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </Collapse>
            {props.listData.canEdit && (
                <div>
                    <hr />
                    <h5 
                        onClick={()=>{setShowEdit(!showEdit)}} 
                        aria-expanded={showEdit} 
                        aria-controls={"list_edit"}>Other Knights</h5>
                    <Collapse in={showEdit}>
                        <div id="list_edit">
                        {props.listData.canEdit
                            && props.listData.canEdit.map((char, index)=>{
                                return( 
                                    <div>
                                        <button 
                                            key={"edit_"+index}  
                                            type="button" 
                                            className="character-list" 
                                            onClick={()=>{
                                                Disp.clearDisplayState();
                                                props.openSheet(char._id, "edit");
                                            }}
                                            
                                        >
                                            {char.name!==""
                                            ?char.name
                                            :"(unnamed knight)"}
                                        </button>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </Collapse>
                </div>
            )}
            {props.listData.viewOnly && (
                <div>
                    <hr />
                    <h5 
                        onClick={()=>{setShowView(!showView)}} 
                        aria-expanded={showView} 
                        aria-controls={"list_view"}
                    >View Only</h5>
                    <Collapse in={showView}>
                        <div id="list_view">
                            {props.listData.viewOnly
                            && props.listData.viewOnly.map((char, index)=>{
                                return( 
                                    <div>
                                        <button 
                                            key={"view_"+index}  
                                            type="button" 
                                            className="character-list" 
                                            onClick={()=>{
                                                props.openSheet(char._id, "view")}
                                                }
                                        >
                                            {char.name!==""
                                            ?char.name
                                            :"(unnamed knight)"}
                                        </button>
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </Collapse>
                </div>
        )}
        </Container>
    )
}