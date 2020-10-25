import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import _ from 'lodash';

// DESCRIPTION
// The ViewEdit component is a toggleable diplay unit
// It allows you to display a value, which becomes editable when clicked
// (note: future versions may include a 'lock' prop, so that you can lock the unit from editing, or switch between a mode where clicking edits or does something else, such as make a skill roll)
// Content is updated by pressing [Enter] in the input field
// THe edit is cancelled and content reverts to its previous value by pressing [Esc] or clicking outside the area.
// When one ViewEdit component on the page is in Edit mode, the rest of the page is dimmed and locked for edit.


// PROPS 
// Content ID: props.id
// Content Field Name: props.field
// Content CSS Class: props.css_class
// Content Value: props.value
// Save Changes function: props.saveEdit
// Page listeners: props._listeners
// Page edit flag: props.editInProgess
// (note: the [0] is required on the editInProgess flag because the parent 'App' is a component


    class ViewEdit extends React.Component {
        constructor  (props) {
            super (props)
            // console.log("VIEWEDIT :: LOADING ViewEdit. Props:",props)
            // console.log("VIEWEDIT :: props.value:",props.value)
            // console.log("VIEWEDIT :: props.placeHolderText:",props.placeHolderText)
            // console.log("length:",  props.value.length)
            this.state = {
                value: props.value,
                editMode: false
            }
            this.fallBackValue = '';
            this.placeHolderText = this.props.placeHolderText || "click to add info"

            this.confirmEdit = this.confirmEdit.bind(this);
            this.cancelEdit = this.cancelEdit.bind(this);
            this.enterEditMode = this.enterEditMode.bind(this);
            this.exitEditMode = this.exitEditMode.bind(this);
            this.handleKeyPress = this.handleKeyPress.bind(this);
            this.handleParaClick = this.handleParaClick.bind(this);
            this.handleClickOutside = this.handleClickOutside.bind(this);
            
            // console.log("VIEWEDIT :: state.value:",this.state.value)
            // console.log("length:",  this.state.value.length)
            // console.log("VIEWEDIT :: state.editMode:",this.state.editMode)
            
        }   
        // const [value, setValue] = useState(props.value)
        // const [editMode, setEditMode] = useState(false)
        
        // const placeHolderText = this.props.placeHolderText || "click to add info"
        // const canEdit = this.props.lockEdit ? false : true
        
        // let fallBackValue = '';
        
        
        // const textInput = useRef()
      
        confirmEdit() {
            console.log("DOING THIS: confirmEdit")
            // Switch back to View mode
            console.log("Edit-in-progress element (before):",document.getElementById(this.props.group.replace(".","")+"_"+this.props.field+"_"+this.props.fieldId))
            document.getElementById(this.props.group.replace(".","")+"_"+this.props.field+"_"+this.props.fieldId).classList.remove("edit-in-progress")
            console.log("Edit-in-progress element (after):",document.getElementById(this.props.group.replace(".","")+"_"+this.props.field+"_"+this.props.fieldId))
            this.exitEditMode()
            // Save the edited value to DB
           
            let payload = {
                group: this.props.group,
                field: this.props.field,
                value: this.state.value,
                fieldId: this.props.fieldId
            }

            console.log("VE: Save payload:",payload)

            let saved = this.props.saveEdit(payload);
            if (!saved) {
                console.log("VE :: confirmEdit: Save outcome = false")
                console.log("VE :: confirmEdit: resetting value to fallBack:",this.fallBackValue)
                this.setState({value: this.fallBackValue})
            } else {
                console.log("VE :: confirmEdit: Save outcome = true")
                if (!this.props.fieldId) {
                    console.log("New item save completed. Resetting value to:",this.props.value)
                    this.setState({value: this.props.value})
                }
            }
            // Disable or nullify the click-outside event listener
            this.props.removeWindowClickListeners();
        }

        cancelEdit() {
            console.log("DOING THIS: cancelEdit")
            // Switch back to View mode
            this.exitEditMode()
            // Reset the edited value to the fall-back value
            this.setState({value: this.fallBackValue});
            // Disable or nullify the click-outside event listener
            this.props.removeWindowClickListeners();
        }
        
        enterEditMode(element){
            console.log("DOING THIS: enterEditMode. Target:",element)
            // update the "editMode" state of the current component

           
            
            // use "edit-in-progress" class to set Edit Mode appearance
            console.log("Parent element:",element.parentElement)
            element.parentElement.classList.add("edit-in-progress")
            
            // activate  edit mode flag
            // setTimeout(()=>{console.log("1000");this.props.setEditInProgress(true)}, 1000);
            this.props.setEditInProgress(true);
                console.log("Setting editInProgress to true.")

        }

        exitEditMode(){
            console.log("DOING THIS: exitEditMode")
            // remove "edit-in-progress" class to cancel Edit Mode appearance
            // deactivate  edit mode flag
            this.props.setEditInProgress(false);
            this.setState({editMode: false},()=>{console.log("setState to false. VE editMode set to:",this.state.editMode)});
        }

        handleKeyPress(event){
            // KEY EVENTS
            // [Enter]: save contents of valueState to DB
            // [Esc]: revert valueState to fallBack
            
            // Required info: which valueState to save or revert to fallBackValue : event.target.name

            // console.log("event.target.name:",event.target.name)
            // console.log("editMode:",this.state.editMode)
            // console.log("value:",this.state.value)
            if (event.charCode===13) {
                if (this.state.value ==="[delete]") {
                    this.props.deleteEntry(this.props.fieldId)
                }
                this.confirmEdit()
            } else if (event.charCode===27) {
                this.cancelEdit()
            }

        }
        
        handleParaClick(ev){
            console.log("DOING THIS: handleParaClick")
            ev.stopPropagation();
            // Save valueState to fallBack
            this.fallBackValue=this.state.value;
            console.log("fallBack:",this.fallBackValue);
            // setEditMode(true);
            console.log("Setting editMode state to true.")
            this.setState({ editMode: true },()=>{console.log("setState to true. VE editMode set to:",this.state.editMode)})
            console.log("Requested to set editMode to true.")
            this.enterEditMode(ev.target);
            console.log("Now in edit mode. state.editMode:",this.state.editMode)
            this.handleClickOutside(this.props.group.replace(".","")+"_"+this.props.field+"_"+this.props.fieldId)
            let paraEl = document.getElementById(this.props.fieldId+"_"+this.props.field+"_p");
            let inputEl = document.getElementById(this.props.fieldId+"_"+this.props.field+"_i");
            console.log("Para El:",paraEl," ; Input El:",inputEl)
        }

        handleClickOutside(elId) {
            console.log("DOING THIS: handleClickOutside")
            console.log("Adding LISTENER to: ", elId)

            let element = document.getElementById(elId)
            console.log('element.id is',element.id)

            const cancelEdit = this.cancelEdit
            const addWindowClickListener = this.props.addWindowClickListener
            
            const selector = `#${element.id}`
            function outsideClickListener (event) {
                console.log("OUTSIDE CLICK check triggered. event.target: ",event.target)
                if ( !element.contains(event.target)) {
                    console.log("Click in ",event.target," is not inside element: ",element);
                    console.log("selector:",selector);

                    document.getElementById(element.id.replace(".","")).classList.remove("edit-in-progress");
                    cancelEdit();
                }
            }
            addWindowClickListener(outsideClickListener)
        }

        

        render () {
            return (
                <Container 
                    key={this.props.field+"_"+this.props.fieldId+"_d"} 
                    id={this.props.group.replace(".","")+"_"+this.props.field+"_"+this.props.fieldId}
                    className={this.props.field+"-field"}
                >
                    {/* <Col className="ghost-div "> */}
                    {
                        this.state.editMode
                        ? <input 
                            autoFocus
                            key={this.props.fieldId+"_"+this.props.field+"_i"}
                            id={this.props.fieldId+"_"+this.props.field+"_i"}
                            name={this.props.field}
                            className={this.props.field+"-edit"}
                            // update valueState
                            onChange={(ev)=>this.setState({value:ev.target.value})} 
                            // check if [Enter] (save) or [Esc] (cancel)
                            onKeyPress={this.handleKeyPress} 
                            // ref={textInput}
                            value={this.state.value}    
                        />
                        : <p 
                            key={this.props.fieldId+"_"+this.props.field+"_p"}
                            id={this.props.fieldId+"_"+this.props.field+"_p"}
                            name={this.props.field}
                            className={
                                (this.state.value)
                                ? this.props.field+"-view"
                                : this.props.field+"-view placeholder-text"} 
                            onClick={
                                (!this.props.editLock) 
                                ? (ev)=>{!this.props.editInProgress &&(this.handleParaClick(ev))}
                                : ()=>{}
                            }
                        >
                            {
                                (['',0].includes(this.state.value)) 
                                ? this.placeHolderText
                                : this.state.value
                                }
                        </p>
                    }
                    {/* </Col> */}
                </Container>
            )
        }
    }

    


export default ViewEdit;