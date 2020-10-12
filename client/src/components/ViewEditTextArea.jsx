import React, { useState, useRef, useEffect } from 'react';
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


    function ViewEdit (props) {   
        // console.log("LOADING ViewEdit")
        const [value, setValue] = useState(props.value)
        const [editMode, setEditMode] = useState(false)
        const fieldId = props.name;
        
        const placeHolderText = props.placeHolderText || "click to add info"
        const canEdit = props.lockEdit ? false : true
        
        let fallBackValue = '';
        
        useEffect(()=>{
            if(editMode) {
                console.log("useEffect triggered. autoGrowing.")
                autoGrow(document.getElementById(fieldId+"_"+props.field+"_i"))
            }
        }, [editMode,value])
      
        function confirmEdit() {
            console.log("DOING THIS: confirmEdit")
            // Switch back to View mode
            console.log("Edit-in-progress element (before):",document.getElementById(props.group+"_"+props.field+"_"+fieldId+props.nestedId))
            document.getElementById(props.group+"_"+props.field+"_"+fieldId+props.nestedId).classList.remove("edit-in-progress")
            console.log("Edit-in-progress element (after):",document.getElementById(props.group+"_"+props.field+"_"+fieldId+props.nestedId))
            exitEditMode()
            // Save the edited value to DB
           
            let payload = {
                group: props.group,
                field: props.field,
                value: value,
                fieldId: fieldId
            }

            if (props.nestedId) {
                payload.itemId = props.nestedId;
            }

            console.log("VE: Save payload:",payload)

            let saved = props.saveEdit(payload);
            if (!fieldId) {
                console.log("New item save completed. Resetting value to:",props.value)
                setValue(props.value)
            }
            // Disable or nullify the click-outside event listener
            props.removeWindowClickListeners();
        }

        function cancelEdit() {
            console.log("DOING THIS: cancelEdit")
            // Switch back to View mode
            exitEditMode()
            // Reset the edited value to the fall-back value
            setValue(fallBackValue);
            // Disable or nullify the click-outside event listener
            props.removeWindowClickListeners();
        }
        
        function enterEditMode(element){
            console.log("DOING THIS: enterEditMode")
            // activate  edit mode flag
            props.setEditInProgress(true);
            // use "edit-in-progress" class to set Edit Mode appearance
            element.parentElement.classList.add("edit-in-progress")
        }
        function exitEditMode(){
            console.log("DOING THIS: exitEditMode")
            // remove "edit-in-progress" class to cancel Edit Mode appearance
            // let elList = document.getElementsByClassName("edit-in-progress")
            // if (!elList.length === 0){
            //     console.log(elList.length," 'edit-in-progress' elements found")
            //     elList[0].classList.remove("edit-in-progress")
            // } else {
            //     console.log("No 'edit-in-progress' elements found")
            // }
            // deactivate  edit mode flag
            props.setEditInProgress(false);
            setEditMode(false);
        }

        function handeKeyPress(event){
            // KEY EVENTS
            // [Enter]: save contents of valueState to DB
            // [Esc]: revert valueState to fallBack
            
            // Required info: which valueState to save or revert to fallBackValue : event.target.name

            if (event.charCode===13) {
                if (event.altKey) {
                    setValue(value + "\n");

                } else {
                    confirmEdit()
                }
            } else if (event.charCode===27) {
                cancelEdit()
            }

        }
        function checkFocus(){
            var focused_element = null;
            if (
                document.hasFocus() &&
                document.activeElement !== document.body &&
                document.activeElement !== document.documentElement
            ) {
                focused_element = document.activeElement;
            }
            
            return focused_element
        }

    
        function handleParaClick(ev){
            console.log("DOING THIS: handleParaClick")
            ev.stopPropagation();
            // Save valueState to fallBack
            fallBackValue=value;
            console.log("fallBack:",fallBackValue);
            setEditMode(true);
            enterEditMode(ev.target);
            
            handleClickOutside(props.group+"_"+props.field+"_"+fieldId+props.nestedId)
            console.log("Current focus:",checkFocus())
            let paraEl = document.getElementById(fieldId+"_"+props.field+"_p");
            let inputEl = document.getElementById(fieldId+"_"+props.field+"_i");
            console.log("Para El:",paraEl," ; Input El:",inputEl);
            // inputEl.focus();
            console.log("Focus set to:",checkFocus())
        }

        function handleClickOutside(elId) {
            console.log("DOING THIS: handleClickOutside")
            console.log("Adding LISTENER to: ", elId)

            let element = document.getElementById(elId)
            console.log('element.id is',element.id)
            const selector = `#${element.id}`
            function outsideClickListener (event) {
                console.log("OUTSIDE CLICK check triggered. event.target: ",event.target)
                if ( !element.contains(event.target)) {
                    console.log("Click in ",event.target," is not inside element: ",element);
                    console.log("Edit-in-progress element (before):",document.getElementById(props.group+"_"+props.field+"_"+fieldId+props.nestedId))
                    document.getElementById(element.id).classList.remove("edit-in-progress");
                    console.log("Edit-in-progress element (after):",document.getElementById(props.group+"_"+props.field+"_"+fieldId+props.nestedId))
                    cancelEdit();
                }
            }
            props.addWindowClickListener(outsideClickListener)
        }

        function handleChange(el) {
            setValue(el.value)
        }

        function autoGrow (oField) {
            if (oField.scrollHeight > oField.clientHeight) {
              oField.style.height = (oField.scrollHeight + 6) + "px";
            }
          }

        return (
            <div 
                key={props.field+"_"+fieldId+"_d"} 
                id={props.group+"_"+props.field+"_"+fieldId+props.nestedId} 
                className={props.field+"-field"}
            >
                
                {
                    editMode
                    ? <textarea
                        autoFocus
                        key={fieldId+"_"+props.field+"_i"}
                        id={fieldId+"_"+props.field+"_i"}
                        name={props.field}
                        className={props.field+"-edit"}
                        onChange={(ev)=>{handleChange(ev.target)}} 
                        onKeyPress={handeKeyPress} 
                        value={value}    
                    />
                    : <p 
                        key={fieldId+"_"+props.field+"_p"}
                        id={fieldId+"_"+props.field+"_p"}
                        name={props.field}
                        className={
                            (value)
                            ? props.field+"-view"
                            : props.field+"-view placeholder-text"} 
                        onClick={
                            canEdit 
                            ? (ev)=>{!props.editInProgress &&(handleParaClick(ev))}
                            : ()=>{}
                        }
                    >
                        {
                            (value) 
                            ? value
                            : placeHolderText
                            }
                    </p>
                }
            </div>
        )
    }

    


export default ViewEdit;