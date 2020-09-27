import React, { useState, useEffect } from 'react';
import { Container, Collapse, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Auth from '../Auth';

export default function Roller(props){
    const [diceSet, setDice] = useState([]);
    const [savedDiceSets, setSavedDiceSets] = useState([]);
    const [roll, setRoll] = useState([]);
    const [diceInput, setDiceInput] = useState();
    
    useEffect(()=> {
        getSetsData()
    },[]);

    function clearDice(){
        setDice([]);
    }

    function handeDiceInput(event){
        setDiceInput(event.target.value);
    }

    async function getSetsData(){
         
            console.log("DOING THIS: getData (dice sets)");
                axios.get('/api/users/'+Auth.userId)
                    .then((response)=>{
                        const data = response.data;
                        // console.log("Initial sets data received.");
                        // console.log(data.diceSets.length," dice sets found");
                        // console.log(JSON.stringify(data.diceSets));
                        setSavedDiceSets(data.diceSets);
                        // console.log("Updated saved dice sets: ",savedDiceSets);
                        // console.log("Data reloaded. State updated.");
                    })
                    .catch((error)=>{
                        alert("Error retrieving data (dice sets): ", error);
                    });
    }

    function saveDice(set){
        console.log("DOING THIS: saveDice");
        if (diceSet.length>0) {
            // console.log("saving: ",JSON.stringify(set));
            // console.log("curently saved: ",JSON.stringify(savedDiceSets));
            const allSavedSets = savedDiceSets;
            allSavedSets.push(set);
            setSavedDiceSets(allSavedSets);
            // console.log("Saved locally: ",JSON.stringify(savedDiceSets));
            setDice([]);

            if (Auth.isAuthenticated) {
                // console.log("saveDice: Logged in. Saving sets to DB.")
                const payload = {
                    userId: Auth.userId,
                    sets: savedDiceSets
                }

                axios({
                        url: '/api/save-sets',
                        method: 'POST',
                        data: payload
                    })
                    .then(() => {
                        console.log("Data sent to server");
                        getSetsData(); 
                    })
                        .catch((err) => {
                        console.log("Internal server error.", err);
                    });
            }
        }
    }

    function handleKeyPress(event){
        if ([13].includes(event.charCode)) {
            // console.log("Adding dice to dice array")
            if (isNaN(diceInput)) {
                alert("Input must be an integer.");
            } else {
                setDice(prev=>[...prev, parseInt(diceInput,10)].sort((a,b)=>{return a > b ? 1 : b > a ? -1 : 0}));      
            }
            clearForm();
            // console.log("dice array: ",diceSet);
        }
    }
    function clearForm() {
        setDiceInput('');
    }
    function rollDice(rollThis){
        setRoll([])
        rollThis.forEach(d=>{
            const result = Math.floor(Math.random()*d)+1;
            console.log("Rolled ",result," on a D",d);
            setRoll(prev=>[...prev, result]);
        })
    }

    function compactSet(set){
        
        let diceSet = set;
        // console.log("diceSet: ",diceSet)
        let compactedSet = [];
        let csCounts = [];
        diceSet.sort((a,b)=>{return a > b ? 1 : b > a ? -1 : 0})
        for (let i=0; i<diceSet.length; i++){
            if (diceSet[i]!==diceSet[i-1]){
                compactedSet.push(diceSet[i])
                csCounts.push(1)
            } else {
                csCounts[csCounts.length-1]++
            }
        }
       
            const result = {set: compactedSet, counts: csCounts}
            // console.log("Compact Set: ",JSON.stringify(result))
            // console.log(typeof result)
        return result;
    }

    function diceSetString(set){
        let diceString = '';
        const getStuff  = compactSet(set);
        // console.log("getStuff: ",JSON.stringify(getStuff));
        const compactedSet = getStuff.set;
        const csCounts = getStuff.counts;
        // console.log("compactedSet: ",compactedSet)
        // console.log("csCounts: ",csCounts)
        const itemCount = compactedSet.length

        for ( var i = 0; i<itemCount-1; i++ ) {
            console.log("i: ",i,"count: ",csCounts[i],"die: ",compactedSet[i])
            diceString = diceString + (csCounts[i]+"D"+compactedSet[i]) + ", "
            // diceStringArr.push(csCounts[i]+"D"+compactedSet[i])
        }
        // console.log("ic-1: ",itemCount-1,"count: ",csCounts[itemCount-1],"die: ",compactedSet[itemCount-1])
        diceString = diceString + (csCounts[itemCount-1]+"D"+compactedSet[itemCount-1]);
        return diceString;

    }

    function removeSet(set) {
        console.log("DOING THIS: removeSet");
        // console.log("removing: ",JSON.stringify(set));
        // console.log("curently saved: ",JSON.stringify(savedDiceSets));
        const allSavedSets = savedDiceSets;
        const filteredSets = allSavedSets.filter(s=>{return s!==set});
        // console.log("Filtered sets: ",filteredSets );
        setSavedDiceSets(filteredSets);
        // console.log("now saved: ",JSON.stringify(savedDiceSets));
        
    }

    function DiceSets(props) {
        // console.log("Set: ",JSON.stringify(props.set));
        if (props.set.length>0) {
            if (props.type==="button"){
                // console.log("Saved set:", JSON.stringify(props.set));

                return (
                    props.set.map(set=>{
                        return (
                            <div>
                                <button type="button" onClick={()=>rollDice(set)}>{diceSetString(set)}</button>
                                <button type="button" onClick={()=>removeSet(set)}>-</button>
                            </div>
                        )
                    })
                )
            } else {
                // console.log("Current set:", JSON.stringify(props.set));
                return (
                    
                    props.set.map(set=>{
                        return <p>{diceSetString(props.set)}</p>
                    })
                )
            }
        } else {
                return '';
        }
    }

    return(
        <Container className="Roller">
            <Row>
                <Col className="dice-selection">
                    
                        <h2>Roller</h2>
                        
                        <label for="add-dice">Add a Die</label>
                        <input type="number" min="2" id="add-dice" onChange={handeDiceInput} onKeyPress={handleKeyPress} value={diceInput} autocomplete="off"></input>

                        <p>Current dice:</p>
                        <div>
                        <p>{diceSet.length>0&&diceSetString(diceSet)}</p>

                        <button type="button" onClick={()=>rollDice(diceSet)}>roll</button>
                        </div>
                        <button type="button" onClick={clearDice}>clear</button>
                        <button type="button" onClick={()=>{saveDice(diceSet)}}>save</button>
                        
                        
                        <h3>Saved Rolls:</h3>
                        <DiceSets type="button" set={savedDiceSets}/>
                    
                </Col>
                <Col className="roll-results">
                    
                    <h3>Result:</h3>
                        {(roll.length>0) && 
                        (<h4>{"Total: "+roll.reduce((a,b)=>{return a+b})}</h4>)}
                        <p>
                            {(roll.length>0)&&("rolled: ")}
                            {roll.map((r,i)=>{
                                console.log((i<roll.length-1)?r + ', ':r);
                                return ((i<roll.length-1)?r + ', ':r);
                            })}
                        
                        </p>
                    
                </Col>
            </Row>
        </Container>
    )

}