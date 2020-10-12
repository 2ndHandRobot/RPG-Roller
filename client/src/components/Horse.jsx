import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import ViewEdit from './ViewEdit';


export default function Horse(props) {
    const horse = props.data;

    function DescriptionBlock(descs) {
        return (
            descs.map((desc, descIndex)=>{
                return (
                    <Row className="lv-pair">
                        <Col xs={6} lg={6} className="char-col-left">
                            <ViewEdit
                                key={horse._id+"_lab"} 
                                id={horse._id+"_lab"}
                                name={descIndex}
                                group="horses"
                                field="desc.label"
                                lockEdit={true}
                                value={desc.label}
                                addWindowClickListener={props.funcs.addWindowClickListener}
                                removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                editInProgress={props.funcs.editInProgress}
                                setEditInProgress={props.funcs.setEditInProgress}
                                saveEdit={props.funcs.saveEdit}
                            />
                        </Col>
                        <Col xs={6} lg={6} className="char-col-right">
                            <ViewEdit
                                key={horse._id+"_val"} 
                                id={horse._id+"_val"}
                                name={descIndex}
                                group="horses"
                                field="desc.value"
                                value={desc.value}
                                addWindowClickListener={props.funcs.addWindowClickListener}
                                removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                editInProgress={props.funcs.editInProgress}
                                setEditInProgress={props.funcs.setEditInProgress}
                                saveEdit={props.funcs.saveEdit}
                            />
                        </Col>            
                    </Row>
                )
            })
        )
    }

    function StatisticsBlock(stats) {
        return (
            stats.map((stat, statIndex)=>{
                return (
                    <Row className="lv-pair">
                        <Col xs={6} lg={6} className="char-col-left">
                            <ViewEdit
                                key={horse._id+"_lab"} 
                                id={horse._id+"_lab"}
                                name={statIndex}
                                group="horses"
                                field="stat.label"
                                lockEdit={true}
                                value={stat.label}
                                addWindowClickListener={props.funcs.addWindowClickListener}
                                removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                editInProgress={props.funcs.editInProgress}
                                setEditInProgress={props.funcs.setEditInProgress}
                                saveEdit={props.funcs.saveEdit}
                            />
                        </Col>
                        <Col xs={6} lg={6} className="char-col-right">
                            <ViewEdit
                                key={horse._id+"_val"} 
                                id={horse._id+"_val"}
                                name={statIndex}
                                group="horses"
                                field="desc.value"
                                value={stat.value}
                                addWindowClickListener={props.funcs.addWindowClickListener}
                                removeWindowClickListeners={props.funcs.removeWindowClickListeners}
                                editInProgress={props.funcs.editInProgress}
                                setEditInProgress={props.funcs.setEditInProgress}
                                saveEdit={props.funcs.saveEdit}
                            />
                        </Col>            
                    </Row>
                )
            })
        )
    }


    return (
        <div>
            <DescriptionBlock descs={horse.desc} />
            <hr />
            <StatisticsBlock stats={horse.stats} />
        </div>
        
    )

}