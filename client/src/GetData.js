import axios from 'axios';
import Auth from './Auth';


async function getData() {
    console.log("DOING THIS: getData (own knights)");
        axios.get('/api/users/'+Auth.userId)
            .then((response)=>{
                const data = response.data;
                console.log("Initial data received.");
                console.log(data.knights.length," knights found");
                console.log(JSON.stringify(data.knights));
                setKnightsData(data.knights);
                console.log("Updated knightsData: ",knightsData);
                console.log("Data reloaded. State updated.");
            })
            .catch((error)=>{
                alert("Error retrieving data: ", error);
            });
    
    console.log("DOING THIS: getData (other knights)");
        axios.get('/api/can-edit/'+Auth.userId)
            .then((response)=>{
                const data = response.data;
                console.log("Initial data received.");
                console.log(data.knights.length," knights found");
                console.log(JSON.stringify(data.knights));
                setEditOnlyKnightsData(data.knights);
                console.log("Updated editOnlyKnightsData: ",editOnlyKnightsData);
                console.log("Data reloaded. State updated.");
                
            })
            .catch((error)=>{
                alert("Error retrieving data: ", error);
            });
        
    console.log("DOING THIS: getData (dice sets)");
        axios.get('/api/can-edit/'+Auth.userId)
            .then((response)=>{
                const data = response.data;
                console.log("Initial data received.");
                console.log(data.knights.length," knights found");
                console.log(JSON.stringify(data.knights));
                setEditOnlyKnightsData(data.knights);
                console.log("Updated editOnlyKnightsData: ",editOnlyKnightsData);
                console.log("Data reloaded. State updated.");
                
            })
            .catch((error)=>{
                alert("Error retrieving data: ", error);
        });
    }