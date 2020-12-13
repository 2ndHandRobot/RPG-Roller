
import { ResponsiveEmbed } from 'react-bootstrap';

const Disp = {
    openAuxList: '',
    openAuxId:'',
    toggleStates: [],
    
    getToggleState(toggleId) {
        // console.log("DS :: getToggleState(",toggleId,")")
        // console.log("DS :: Getting toggle state for",toggleId)
        // console.log("DS :: (current 'on' toggles:",this.toggleStates,")")
        return this.toggleStates.includes(toggleId);
    },
    
    setToggleState(toggleId) {
        // console.log("DS :: setToggleState(",toggleId,")")
        // console.log("DS :: Setting toggle state for",toggleId)
        if (this.toggleStates.indexOf(toggleId) ===-1) this.toggleStates.push(toggleId);
        // console.log("DS :: (Now 'on' toggles:",this.toggleStates,")")
    },
    
    clearToggleState(toggleId) {
        // console.log("DS :: clearToggleState(",toggleId,")")
        // console.log("DS :: Clearing toggle state for",toggleId)
        this.toggleStates.splice(this.toggleStates.indexOf(toggleId),1);
        // console.log("DS :: (Now 'on' toggles:",this.toggleStates,")")
    },
    
    getOpenAuxList() {
        // console.log("DS :: getOpenAuxList (",this.openAuxList,")")
        return this.openAuxList
    },
    
    getOpenAuxId() {
        // console.log("DS :: getOpenAuxId (",this.openAuxId,")")
        return this.openAuxId
    },

    setOpenAuxList(listName){
        // console.log("DS :: setOpenAuxList(",listName,")")
        this.openAuxList=listName
        // console.log("DS :: openAux list is",this.openAuxList)
        // console.log("DS :: openAux is",this.openAux)
    },
    
    setOpenAuxId(auxId){
        // console.log("DS :: setOpenAuxId(",auxId,")")
        this.openAuxId=auxId
    },

    clearDisplayState(){
        // console.log("DS :: clearDSisplayState");
        this.openAuxList= '';
        this.openAuxId='';
        this.toggleStates= [];
    },
    
}

export default Disp;