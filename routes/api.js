const express = require('express');
const router = express.Router();
const models = require('../models/models');
const { Users, Knights, DiceSets } = require('../models/models');

const _ = require('lodash');
const mongoose = require('mongoose');

function tunnel(tunnelObj, tunnelString){
   //     console.log("Starting tunnel: ",tunnelString,"into object:",tunnelObj);
       function findObj(obj, str){
   //         console.log("Looking for: ",str,"in object:",obj);
           for (var el in obj) {
               if (el === str) {
                   return el
               }
           }
       }
   
       let tunnelArr = tunnelString.split('.');
   //     console.log("tunnelArr:",tunnelArr)
       let tunnelDepth = tunnelArr.length;
   //     console.log("tunnelDepth:",tunnelDepth)
       let minedObject = {};
       let digger = tunnelObj;
   
       for (var d = 0; d<tunnelDepth; d++){
   //         console.log("Depth: ", d)
           if (digger) {
               digger = digger[findObj(digger, tunnelArr[d])] || null
           }
   //         console.log("Digger:"+digger);
       }
       return digger
   }

   

// Routing
router.get('/', (req, res) => {
   console.log("API :: ROUTING: Get '/'")
   const allData = {}

   models.Knights.find({})
      .then((data)=>{
         console.log(data.length, 'characters found.');
         allData.knights = data;
         res.json(allData);
      })
      .catch((err)=>{
          console.log('Error: ',  err);
      })
});
//TEMP: DELETE BEFORE COMMIT
router.get('/admins', (req, res) => {
   console.log("API :: ROUTING: Get '/admins'")
   let allData =[]

   models.Users.find({"privilege" : "admin"}).select('_id')
      .then((data)=>{
         console.log(data.length, 'characters found.');
         data.forEach(u=>allData.push(u._id));
         res.json(allData);
      })
      .catch((err)=>{
          console.log('Error: ',  err);
      })
});

router.get('/users/:userId', (req, res) => {
   const userId = req.params.userId;
   console.log("API :: ROUTING: Get '/' for user: ",userId);
   const allData = {}

   models.Knights.find({"playerInfo.isOwner": userId})
      .then((data)=>{
         console.log(data.length, '"isOwner" characters found.');
         allData.knights = data;
         models.DiceSets.find({isOwner: userId})
            .then((setsData)=>{
               console.log("setsData:",setsData.length);
               if (setsData.length>0){
                  console.log(setsData[0].diceSets.length, 'dice sets found.')
                  allData.diceSets = setsData[0].diceSets;
                  res.json(allData);
               } else {
                  console.log("no dice sets found.")
                  allData.diceSets = []
                  res.json(allData);
               }
            })
            .catch((err)=>{
               console.log('Error retrieving dice sets: ',  err);     
            })
      })
      .catch((err)=>{
          console.log('Error retrieving knights: ',  err);
      })
});


router.get('/can-edit/:userId', (req, res) => {
   const userId = req.params.userId;
   console.log("API :: ROUTING: Get '/' for user: ",userId);
   const allData = {}

   models.Knights.find({"playerInfo.canEdit": userId})
      .then((data)=>{
         console.log(data.length, '"canEdit" characters found.');
         allData.knights = data;
         res.json(allData);
      })
      .catch((err)=>{
          console.log('Error: ',  err);
      })
});


router.post('/register', (req, res) => {
   console.log('API :: ROUTING: Creating new user. Body:',req.body)
      const email = req.body.email;
      const password = req.body.password;
      const userName = req.body.userName || req.body.login;
      const loggedIn = req.body.loggedIn || false
      const privilege = req.body.privilege || 'user'

   const newUser = new models.Users({
      email: email,
      password: password,
      userName: userName,
      loggedIn: loggedIn,
      privilege: privilege
   });

   newUser.save((err)=>{
      if (err) {
         console.log(err.code)
         console.log(err);
         if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            return res.status(422).send({ succes: false, fail: "user-exists", message: 'User already exist!' });
          }
    
          // Some other error
          return res.status(500).send(err);
        } else {
         console.log("New user created.");
         res.redirect(307, '/api/login');
         // res.json({msg: "user created"});
      }
   })
})

router.post('/login', (req, res) => {
   console.log('API :: ROUTING: Logging in user. Body:',req.body)
   const user = req.body;

   Users.findOne({email:user.email}, (err, foundUser)=>{
      if (err) {
         console.log(err)
      } else if (!foundUser) {
         Users.findOne({userName:user.userName}, (err2, foundUser2)=>{
            if (err2) {
               console.log(err2)
            } if (foundUser2) {
               console.log(foundUser2);
               if (foundUser2.password===user.password) {
                  Users.updateOne({userName:user.userName}, {loggedIn: true}, (err, resp)=>{
                     if (err) {
                        console.log("Failed to set loggedIn flag:", err)
                     } else {
                        res.send({userId: foundUser2._id, userName: foundUser2.userName});      
                     }
                  })
                  
               } else {
                  res.json({msg: "password error"});
               }
            }
         })
      } else if (foundUser) {
         console.log(foundUser);
         if (foundUser.password===user.password) {
            Users.updateOne({email:user.email}, {loggedIn: true}, (err, resp)=>{
               if (err) {
                  console.log("Failed to set loggedIn flag:", err)
               } else {
                  res.send({userId: foundUser._id, userName: foundUser.userName});      
               }
            })
         } else {
            res.json({msg: "password error"});
         }
      }
   })
})

router.post('/logout', (req, res) => {
   console.log('API :: ROUTING: Logging out user. Body:', req.body);
   const userId = req.body.userId;

   Users.update({_id: userId}, {loggedIn: false}, (err, result)=>{
      if (err) {
         console.log(err)
      } else {
         if (result) {
            console.log("Updates: ",result);
            if (result===1) {
               res.send(true);
            } else {
               res.json({msg: "Error: "+result+" users logged out."});
            }
         }
      }
   })
})

router.post('/create', (req, res) => {
   console.log('API :: ROUTING: Creating new Knight character. Body:',req.body)
   const data = req.body;
   const newKnight = new models.Knights(data);

   // function getAdmins() {
      let admins = [];
      
      models.Users.find({"privilege" : "admin"})
      .then((data)=>{
            console.log(data.length, 'admins found.');
            data.forEach(u=>admins.push(u._id));
            newKnight.playerInfo.canEdit= admins;
            console.log("newKnight.playerInfo",newKnight.playerInfo);
            newKnight.save((err, response)=>{
               if (err) {
                  res.json({msg: ("Error saving new knight: " +err)});
               } else {
                  console.log("Saved knight: ",response);
                  res.json({msg: "data received"});
               }
            })
      })
      .catch((err)=>{
          console.log('Error: ',  err);
      })
   // }

   

   
})

router.post('/save-sets', (req, res) => {
   console.log('API :: ROUTING: Saving dice sets. Body:', req.body)
   const user = req.body.userId;
   const sets = req.body.sets;
   
   DiceSets.findOneAndUpdate(
      {isOwner: user},
      {diceSets: sets},
      {useFindAndModify: false, new:true, upsert: true},
      (err, result) => {
         if (err) {
            console.log("FAILED TO SAVE SETS: ",err);
            res.send(err);
         } else {
            // console.log("Outcome of save: ",result);
            res.send("SETS SAVED SUCCESSFULLY: "+result);
         }
      }
   )

})


router.post('/edit-entry', (req, res) => {
// PROPS:
// knightId: the _id of the Knight document to update
// group: path to the nested data array (e.g. "personalInfo" or "combatSkills.general")
// field: key for values in nested objects (e.g. "label" or "value")
// value: the new/edited value to save
// fieldId: the _id of the entry to be updated :: if null, save will be treated as a new entry

   console.log('ROUTING: Editing post. Body:',req.body)
   const data = req.body;
   let value = (data.field==="label")?_.camelCase(data.value):data.value;
   let updateObject = {};
   let options = {};

   
   if (!data.fieldId.length > 0) {
      console.log("No fieldId found. Creating new entry.")
      if (data.field === "single") {
         updateObject = {$push: {[`${data.group}`]:`${value}`}};
      } else {
         const newId = new mongoose.Types.ObjectId
         updateObject = {$push: {[`${data.group}`]:{"_id": newId, "label":`${value}`,"value":"","isTicked":false}}};
      }
      options = { 
         useFindAndModify: false,
         upsert: true, 
         new: true
      }
   } else {
      console.log("fieldId found. Updating new entry.")
      updateObject = {$set: {[`${data.group}.$[entry].${data.field}`]:`${value}`}};
      options = { 
         arrayFilters: [{ 'entry._id' : data.fieldId }], 
         useFindAndModify: false,
         upsert: true, 
         new: true
      }
   }

   console.log("knightId:",data.knightId,". Update object:",updateObject,". options:",options)
      Knights.findOneAndUpdate(
         {"_id": data.knightId},
         updateObject,
         options,
         (err, resp)=>{
            if (err) {
               console.log("Update failed:",err)
               res.send(err)
            } else if (resp) {
               console.log("Update succeeded:",resp)
               res.send(resp)
            } else {
               console.log("No error or response returned by server")
            }
      });
   
})

router.post('/update-entry', (req, res) => {
   console.log('API :: ROUTING: Updating field value. Body:',req.body)
   const knightId = req.body.knightId
   const group = req.body.group;
   const fieldId = req.body.fieldId;
   const newVal = req.body.newVal;
   const field = req.body.field
   
   if (field) {
      console.log("Updating nested object")
      const filterObject = { [`${group}._id`]: fieldId }
      console.log("filterObject:",filterObject)  
      console.log("newVal:",newVal)  
      const updateObject = {$set: {[`${group}.$`]: newVal}}
      console.log("updateObject:",updateObject)  
      const options = {useFindAndModify: false, upsert: true, new: true}
      const objFilter = `${group}._id`
      console.log("options:",options)
      
      Knights.findOneAndUpdate( 
         filterObject, 
         updateObject, 
         options, 
         (err, result)=>{
            console.log("Field update completed.")
            if (err) {
               console.log("RESULT OF UPDATE: ",err);
               res.send(err);
            } else {
               console.log("Outcome of update: ",result);
               res.send("RESULT OF UPDATE: "+result);
            }
         } 
      )

   } else {
      console.log("Updating array object")
      const filterObject = { "_id" : knightId }
      // console.log("filterObject: ",filterObject)
      Knights.findById(knightId)
      .then((myKnight, err)=>{
         if (err) {
            console.log("Data retrieval failed:",err)
         } else {
            let myGroup = eval(`myKnight.${group}`)
            myGroup.splice(fieldId,1,newVal);
            myKnight.save((err,doc)=>{
               if (err) {
                  console.log("Save failed:",err)
               } else {
                  console.log("Save succeeded:", doc);
                  res.send(doc);
               }
            })
            
         }
      })
      
   }
})

router.post('/create-entry', (req, res)=>{
   console.log('API :: ROUTING: creating new entry. Body:', req.body)

// Update the database entry for Knight: knightId by adding a new {label: newLab, value: newVal} object to the nested array: group.
   const type = req.body.type
   const group = req.body.group;
   const newVal = req.body.newVal;
   const knightId = req.body.knightId;


   // Retrieve the knight record:
   let myKnight 
   Knights.findOne({"_id": knightId},(err, obj)=>{
      if (err) {
         console.log("Error retrieving Knight record:",err)
         res.send(err)
      } else {
         myKnight = obj;
      
   console.log("myKnight:",myKnight)
   console.log("tunnelling into myKnight for group:",group)
   let itemToEdit = tunnel(myKnight,group);
   let pushItem;
   
   switch (type){
      case "single":
         console.log("Saving 'single' item", newVal)
         pushItem = newVal;
         break;
      case "pers":
         console.log("Cannot add new personality traits");
         res.send("Cannot add new personality traits. Nothing saved")
         break;
      default:
         const newLab = req.body.newLab;   
      console.log("Saving label/value pair", newLab || 'xxx',"/",newVal || 'xxx')
         
         pushItem={label:newLab || '', value:newVal || ''}
   }
   console.log("itemToEdit:",itemToEdit)
   itemToEdit.push(newVal)
   console.log("Edited itemToEdit:",itemToEdit)
   console.log("Updated knight: ",myKnight);

   myKnight.save(err=>{
      if (err) {
         console.log("Failed to save edited Knight data");
      }
      return res.json
   })
}
});
})

router.post('/report-bug', (req, res)=>{
   console.log('API :: ROUTING: reporting bug. Body:', req.body)
   
   const reportedBy = req.body.reportedBy;
   const problem = req.body.problem;
   const description = req.body.description || '';
   const response = ''
   const resolved = false

const newBugReport = new models.BugReport({
   reportedBy : reportedBy,
   problem : problem,
   description : description,
   response : '',
   resolved : false
});

newBugReport.save((err, resp)=>{
   if (err) {
      console.log(err.code)
      console.log(err);
      
      return res.status(500).send(err);
     } else {
      console.log("Bug report saved.");
      res.send(resp);
   }
})
})

module.exports = router;