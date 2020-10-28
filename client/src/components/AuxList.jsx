import React from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import FamilyMember from './FamilyMember';
import Follower from './FollowerComp';
import Horse from './Horse';

import Disp from '../DisplayState';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";


class AuxList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auxList: [],
            activeAuxData: {}
        }
        this.auxListName=Disp.getOpenAuxList()
        
        console.log("AUXLIST :: CONSTRUCTING. Disp.openAuxList:",Disp.getOpenAuxList())
        console.log("AUXLIST :: CONSTRUCTING. auxListName:",this.state.auxListName)
        console.log("AUXLIST :: CONSTRUCTING. Disp.openAux:",Disp.getOpenAuxList(),"/",Disp.getOpenAuxId())
        console.log("AUXLIST :: CONSTRUCTING.  : AuxList. auxList:",this.state.auxList)
    }
    
    static getDerivedStateFromProps(props, state){
        console.log("AUXLIST :: MOUNTING: getDerivedStateFromProps. Setting auxList state to",Disp.getOpenAuxList()," and opening sheet for",Disp.getOpenAuxId())
        function prevAuxData () {
            const auxId = Disp.getOpenAuxId()
            console.log("AUXLIST :: MOUNTING: getting activeAuxData for:",auxId)
            let auxData = {_id: ''};

            if (props.auxiliaries[Disp.getOpenAuxList()]){
                for (var a of props.auxiliaries[Disp.getOpenAuxList()]) {
                    console.log("AUXLIST :: prevAuxSheet : checking if Aux:",a," has an _id of",auxId)
                    if (a._id===auxId) {
                        console.log("AUXLIST :: prevAuxSheet : match found:",a.who)
                        auxData = a
                    }
                }
            }
            console.log("AUXLIST :: MOUNTING: auxData._id:",auxData._id)
            return auxData;
        }

        function prevAuxListData () {
            const list = Disp.getOpenAuxList()
            console.log("AUXLIST :: MOUNTING: getting AuxListData for:",list)
       
            if (props.auxiliaries[list]) {
            const auxListData = 
                props.auxiliaries[list].map(aux=>{
                    console.log("AUXLIST :: comparing auxiliaries, this aux:",aux)
                    const lab = aux.who[0].label
                    const val = aux.who[0].value
                    return ({[lab]:val, auxId:aux._id})
                })
            console.log("AUXLIST :: auxListData:",auxListData)
            return auxListData
            } else {
                return [];
            }
        }
        console.log("AUXLIST :: MOUNTING: restored states. auxList:",prevAuxListData(),", activeAuxId:", Disp.getOpenAuxId(),", activeAuxData:", prevAuxData())
        return ({auxList:prevAuxListData(), activeAuxId: Disp.getOpenAuxId(),activeAuxData: prevAuxData()})
        // this.setState({auxList:this.getAuxListData(Disp.getOpenAuxList()),activeAuxId: Disp.getOpenAuxId()})
    }

    changeAuxList(list){
        console.log("AUXLIST :: DOING: changeAuxList:",list)
        if (this.auxListName !== list){
            this.auxListName = list
            console.log("AUXLIST :: setting openAux to",list,"/''")
            Disp.setOpenAuxList(list)
            console.log("AUXLIST :: Disp.openAux is now",Disp.getOpenAuxList(),"/",Disp.getOpenAuxId());
            Disp.setOpenAuxId('')
            console.log("AUXLIST :: Disp.openAux is now",Disp.getOpenAuxList(),"/",Disp.getOpenAuxId());
            // const auxListData = 
            // this.props.auxiliaries[list].map(aux=>{
            //     console.log("AUXLIST :: comparing auxiliaries, this aux:",aux)
            //     const lab = aux.who[0].label
            //     const val = aux.who[0].value
            //     return ({[lab]:val, auxId:aux._id})
            // })
            // console.log("AUXLIST :: auxListData:",auxListData)
            this.setState({auxList:this.getAuxListData(list), activeAuxId: ''})
            
        } else {
            this.auxListName='';
            Disp.setOpenAuxList(list)
            Disp.setOpenAuxId('')
            this.setState({auxList:[], activeAuxId: ''})
        }
    }

    getAuxListData(list){
        console.log("AUXLIST :: DOING: getAuxListData for:",list)
        // if (this.auxListName !== list){
        //     this.auxListName = list
        //     console.log("AUXLIST :: setting openAux to",list,"/''")
        //     Disp.setOpenAuxList(list)
        //     console.log("AUXLIST :: Disp.openAux is now",Disp.getOpenAuxList(),"/",Disp.getOpenAuxId());
        //     Disp.setOpenAuxId('')
        //     console.log("AUXLIST :: Disp.openAux is now",Disp.getOpenAuxList(),"/",Disp.getOpenAuxId());
            if (this.props.auxiliaries[list]) {
            const auxListData = 
                this.props.auxiliaries[list].map(aux=>{
                    console.log("AUXLIST :: comparing auxiliaries, this aux:",aux)
                    const lab = aux.who[0].label
                    const val = aux.who[0].value
                    return ({[lab]:val, auxId:aux._id})
                })
            console.log("AUXLIST :: auxListData:",auxListData)
            return auxListData
            } else {
                return [];
            }
        }
    
    
    handleAuxClick(auxId){
        console.log("AUXLIST :: DOING: handleAuxClick. auxId:",auxId)
        if (this.state.activeAuxData._id===auxId){
            console.log("AUXLIST :: handleAuxClick : Aux ",auxId,"clicked twice: closing sheet")
            Disp.setOpenAuxId('')
            this.setState({activeAuxId:''});
        } else {
            console.log("AUXLIST :: handleAuxClick : Aux ",auxId,"clicked: opening sheet")
            Disp.setOpenAuxId(auxId)
            console.log("AUXLIST :: handleAuxClick : Disp auxId set to",Disp.getOpenAuxId())
            this.selectAuxSheet()
        }
    }
    
    
    selectAuxSheet(){
        const newAuxId = Disp.getOpenAuxId();
        console.log("AUXLIST :: DOING: selectAuxSheet for:",newAuxId)
        let activeAuxData = {};
        
        if (this.props.auxiliaries[this.auxListName]){
            for (var a of this.props.auxiliaries[this.auxListName]) {
                console.log("AUXLIST :: selectAuxSheet : checking Aux:",a)
                if (a._id===newAuxId) {
                    console.log("AUXLIST :: selectAuxSheet : match found:",a.who)
                    activeAuxData = a
                    this.setState({activeAuxId:newAuxId , activeAuxData:activeAuxData});
                }
            }
        }
    }  

    getAuxData(auxId){
        console.log("AUXLIST :: DOING: getActiveAuxData for:",auxId)
        let auxData = {};
        
        if (this.props.auxiliaries[this.auxListName]){
            for (var a of this.props.auxiliaries[this.auxListName]) {
                console.log("AUXLIST :: getAuxData : checking Aux:",a)
                if (a._id===auxId) {
                    console.log("AUXLIST :: getAuxData : match found:",a.who)
                    auxData = a
                }
            }
        }

        return auxData;
    }
    
    // returnAuxSheet(activeAuxData){
    returnAuxSheet(){
        console.log("AUXLIST :: returnAuxSheet : activeAuxData:",this.state.activeAuxData)
        console.log("AUXLIST :: returnAuxSheet : aux render check: (this.state.activeAuxData._id!=='') =",this.state.activeAuxData._id!=='')
        if (this.state.activeAuxData._id!==''){
            switch (this.auxListName){
                case "horses":
                    console.log("AUXLIST :: returnAuxSheet : Horses aux selected. Returning sheet for render...")
                    return (
                        <Horse
                            data={this.state.activeAuxData} 
                            addWindowClickListener={this.props.addWindowClickListener}
                            removeWindowClickListeners={this.props.removeWindowClickListeners}
                            editInProgress={this.props.editInProgress}
                            setEditInProgress={this.props.setEditInProgress}
                            saveEdit={this.props.saveEdit}
                            deleteEntry={this.props.deleteEntry}
                            saveAuxiliary={this.props.saveAuxiliary}
                        />
                    )
                    // break;
                case "followers":
                    console.log("AUXLIST :: returnAuxSheet : Followers aux selected. Returning sheet for render...")
                    return (
                        <Follower
                            data={this.state.activeAuxData} 
                            addWindowClickListener={this.props.addWindowClickListener}
                            removeWindowClickListeners={this.props.removeWindowClickListeners}
                            editInProgress={this.props.editInProgress}
                            setEditInProgress={this.props.setEditInProgress}
                            saveEdit={this.props.saveEdit}
                            deleteEntry={this.props.deleteEntry}
                            saveAuxiliary={this.props.saveAuxiliary}
                        />
                    )
                    // break;
                    case "familyMembers":
                        console.log("AUXLIST :: returnAuxSheet : FamilyMembers aux selected. Returning sheet for render...")
                    return (
                        <FamilyMember
                            data={this.state.activeAuxData} 
                            addWindowClickListener={this.props.addWindowClickListener}
                            removeWindowClickListeners={this.props.removeWindowClickListeners}
                            editInProgress={this.props.editInProgress}
                            setEditInProgress={this.props.setEditInProgress}
                            saveEdit={this.props.saveEdit}
                            deleteEntry={this.props.deleteEntry}
                            saveAuxiliary={this.props.saveAuxiliary}
                        />
                        )
                    // break;
                default:
                    return null
            }
        } else {
            return null
        }
    }
    displayPair(pairArray) {
        // console.log("pair:",JSON.stringify(pairArray))
        if (pairArray[0]&&pairArray[1]) {
            return pairArray[1]+" ("+pairArray[0]+")"
        } else if (pairArray[1]) {
            return pairArray[1]
        } else if (pairArray[0]) {
            return pairArray[0]
        } else {
            return "(unnamed)"
        }
    }
    
    render(){

        console.log("AUXLIST :: RENDER: this.state.activeAuxData._id:",this.state.activeAuxData._id,". Sheet display check:",((this.state.activeAuxData._id!=='')&&(this.returnAuxSheet())))
        console.log("AUXLIST :: RENDER: state at render:",this.state)
        return (
            <Row className="auxsheet-box" >
            <Col xs={12} lg={4}>
                <div className="aligned-div">
                    <button type="button" onClick={()=>{ this.changeAuxList("horses") }}>Horses</button>
                    <button type="button" onClick={()=>{ this.changeAuxList("followers") }}>Followers</button>
                    <button type="button" onClick={()=>{ this.changeAuxList("familyMembers") }}>Family</button>
                </div>
                <hr/>
                <h6>{_.startCase(this.auxListName)}</h6>
                <ul>
                {this.state.auxList.map((aux, index)=>{
                    {/* console.log("aux:",JSON.stringify(aux)) */}
                    return (
                        <div key={"aux-list-"+index} name={this.auxListName} onClick={()=>{this.handleAuxClick(aux.auxId)}}>
                            <hr/>
                            <li>{this.displayPair(Object.entries(aux)[0])}</li>
                        </div>
                    )
                })}
                </ul>
                {(this.auxListName!=='')&&
                    <button 
                        type="button" 
                        id="aux-add-button"
                        onClick={()=>{
                            console.log("creating a new",this.auxListName);
                            this.props.createAuxiliary(this.auxListName)}}
                    >
                    
                        {"Add "+_.startCase(this.auxListName.substring(0,this.auxListName.length-1))}
                        <span><FontAwesomeIcon icon={faPlusSquare} /></span>
                    </button>
                    }
            </Col>
            <Col xs={12} lg={8}>
                {(this.state.activeAuxData._id!=='')&&(this.returnAuxSheet())}
            </Col>
            </Row>
        )
    }
}

export default AuxList;