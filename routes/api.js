const express = require('express');
const mongoose = require('mongoose');

const _ = require('lodash');

const router = express.Router();
const models = require('../models/models');
const templates = require('../models/_templates');
const { Users, Characters, DiceSets, FamilyMembers, Followers, Animals } = require('../models/models');
const { route } = require('./api');

// ROUTING
//
// User management routes
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
                   res.json({userId: null, msg: "password error"});
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
 
// Character management routes
router.get('/users/:userId/characterlist/:group', (req, res)=>{
    const userId = req.params.userId;
    const group = req.params.group;
    console.log("API :: ROUTING: Get '/"+group+"' for userId:",userId);

    const filter = { [`playerInfo.${group}`] : userId }
    const fields = { personalInfo: 1 }
    // const fields = 'personalInfo'
    // Characters.find(filter, fields)
    // .slice(personalInfo,1)
    Characters.aggregate([
        {$match: filter},
        {$project: 
            {personalInfo: 
                {$arrayElemAt: 
                    ["$personalInfo", 0]
                }
            }
        }
    ])
        .then(data=>{
            console.log(data.length, group, "characters found.");
            console.log("Data recieved:", data)
            let characterData = [];
            data.map(item=>{
                characterData.push({_id: item._id, name: item.personalInfo.value})
            });
            console.log("characterData to return:",JSON.stringify(characterData))
            res.json(characterData)
        })
        .catch(err=>{
            console.log(group,"character retrieval failed:",err)
            const errSend = {err: err}
            res.json(errSend)
        })
})

router.get('/users/:userId/charactersheet/:characterId', (req, res)=>{
    const userId = req.params.userId;
    const characterId = req.params.characterId;
    
    console.log("API :: ROUTING: Get charcterId "+characterId+" for userId:",userId);

    const filter = { _id : characterId }
    Characters.findById(characterId)
    .then(data=>{
      //   console.log("Successfully loaded character data:",data)
        console.log("Successfully loaded character data.")
        res.json(data);
    })
    .catch(err=>{
        console.log("Failed to load character data:",err)
    })
})

router.post('/create', (req, res) => {
   console.log('API :: ROUTING: Creating new character. Body:',req.body)
   const data = req.body;
   // console.log("data:",data)
   const newCharacter = new models.Characters(data);
   console.log("New character:",JSON.stringify(newCharacter))

   // function getAdmins() {
      let canEditIds = [];
      
      models.Users.find({"privilege" : "admin"})
      .then((admins)=>{
            console.log(admins.length, 'admins found.');
            console.log("data.playerInfo:",data.playerInfo)
            admins.forEach(u=>{
               console.log("Admin user id:",u._id.toString())
               if (u._id.toString() !== data.playerInfo.isOwner) {
                  console.log("non-owner admin user:",u._id)
                  canEditIds.push(u._id)
               } else {
                  console.log("admin user is owner.")
               }
            });
            newCharacter.playerInfo.canEdit= canEditIds;
            console.log("newCharacter.playerInfo",newCharacter.playerInfo)
            newCharacter.save((err, response)=>{
               if (err) {
                  res.json({msg: ("Error saving new character: " +err)});
               } else {
                  console.log("Saved character: ",response);
                  res.json({msg: "data received"});
               }
            })
      })
      .catch((err)=>{
          console.log('Error: ',  err);
      })
})

router.get('/users/:userId/auxiliaries/:auxType/:characterId', (req, res)=>{
    const characterId = req.params.characterId;
    const auxType = _.upperFirst(req.params.auxType);

    console.log("API :: ROUTING: Get auxiliaries ("+auxType+") for characterId:",characterId);

    const filter = {owner: characterId}

    models[auxType].find(filter)
    .then(data=>{
      //   console.log("Successfully loaded auxiliary data:",data)
        console.log("Successfully loaded auxiliary ("+auxType+") data.")
        res.json(data);
    })
    .catch(err=>{
        console.log("Failed to load auxiliary ("+auxType+") data:",err)
    })
})

router.post('/edit-entry', (req, res) => {
    // PROPS:
    // characterId: the _id of the Character document to update
    // kinId: the _id of the family member
    // group: path to the nested data array (e.g. "personalInfo" or "combatSkills.general")
    // field: key for values in nested objects (e.g. "label" or "value")
    // value: the new/edited value to save
    // fieldId: the _id of the entry to be updated :: if null, save will be treated as a new entry
    
       console.log('ROUTING: Editing post. Body:',req.body)
       const data = req.body;
       let value = data.value;
       let updateObject = {};
       let options = {};
       let filter = {}
       
       
       const nestedGroupIndex = data.group.indexOf(".")
 
 
       console.log("Group:", data.group)
       
       
       // if (data.group === "family.reputation") {
       // if (data.group.substring(0,7) === "family.") {
       if ((nestedGroupIndex > -1) && (["family.","animals.", "followers."].includes(data.group.substring(0,nestedGroupIndex+1)))){
          console.log("Saving nested entry")
          filter = {[`${data.group.substring(0,nestedGroupIndex)}._id`]: data.characterId}
          console.log("filter:",filter);
          if (!data.fieldId && !(data.fieldId===0)) {
             console.log("No fieldId found. Creating new entry.")
          
             // updateObject = {$push: {"family.$.reputation":`${value}`}};
             let groupString = data.group.replace(".",".$.")
             // updateObject = {$push: {"family.$.reputation":`${value}`}};
            
             updateObject = {$push: {[`${groupString}`]:`${value}`}};
             options = {
                // arrayFilters: [{ 'person._id' : data.fieldId }], 
                useFindAndModify: false,
                upsert: true, 
                new: true
             }
          
          } else {
             console.log("fieldId found. Updating existing entry.")
             
             let groupString = data.group.replace(".",".$.")
             if (!(data.field==="single")) {
                groupString = groupString + "." + data.field;
             }
             // updateObject = {$set: {[`family.$.reputation.${data.fieldId}`]:`${value}`}};
             if (data.group.substring(7)==="reputation") {
                updateObject = {$set: {[`${groupString}.${data.fieldId}`]:`${value}`}};
             } else {
                updateObject = {$set: {[`${groupString}`]:`${value}`}};
             }
             options = { 
                useFindAndModify: false,
                upsert: true, 
                new: true
             }
          }
       } else { 
          console.log("Saving non-nested entry")
          filter = {"_id": data.characterId}
 
          if (data.group==="glory" ) {
            console.log("updating glory")
            updateObject = {$set: { "glory" : `${value}`}}
            options = { 
               useFindAndModify: false,
               upsert: true, 
               new: true
            }
          } else if (!data.fieldId && !(data.fieldId===0)) {
             console.log("No fieldId found. Creating new entry.")
             if (data.field === "single" || data.field === "desc") {
                console.log("single/description")
                updateObject = {$push: {[`${data.group}`]:`${value}`}};
             } else if (data.field === "familyMembers") {
                console.log("familyMember")
                const newId = new mongoose.Types.ObjectId
                updateObject = {$push: {[`${data.group}`]:value}};
             } else if (data.field === "animals") {
                console.log("animals")
                const newId = new mongoose.Types.ObjectId
                updateObject = {$push: {[`${data.group}`]:value}};
             } else if (data.field === "followers") {
                console.log("followers")
                const newId = new mongoose.Types.ObjectId
                const followerTemplate = {
                   _id: newId,
                   auxId: data.auxId,
                   auxType: data.auxType
               }
                updateObject = {$push: {[`${data.group}`]:followerTemplate}};
             } else {
                console.log("label-value pair")
                const newId = new mongoose.Types.ObjectId
                updateObject = {$push: {[`${data.group}`]:{"_id": newId, [`${data.field}`]:`${value}`,"isTicked":false}}};
             }
             options = { 
                useFindAndModify: false,
                upsert: true, 
                new: true
             }
          } else {
             console.log("fieldId found. Updating existing entry.")
             if (data.field === "single" || data.field === "desc") {
                console.log("single/description")
                updateObject = {$set: {[`${data.group}.${data.fieldId}`]:`${value}`}};
                options = { 
                   useFindAndModify: false,
                   upsert: true, 
                   new: true
                }
             } else {
                console.log("label-value pair")
                updateObject = {$set: {[`${data.group}.$[entry].${data.field}`]:`${value}`}};  
                options = {
                   arrayFilters: [{ 'entry._id' : data.fieldId }], 
                   useFindAndModify: false,
                   upsert: true, 
                   new: true
                }
             }
          }
       }
    
       console.log("characterId:",data.characterId,". Filter object:",filter,". Update object:",updateObject,". options:",options)
          Characters.findOneAndUpdate(
             filter,
             updateObject,
             options,
             (err, resp)=>{
                if (err) {
                   console.log("Update failed:",err)
                   if (err.kind === 'Number') {
                     res.json({failure:"validationError"})
                   } else {
                     console.log("Error message is NOT of type CastError")
                    res.json({failure:"otherError"})
                  }
                } else if (resp) {
                   console.log("Update succeeded:",resp)
                   res.json(resp)
                } else {
                   console.log("No error or response returned by server")
                }
          });
       
    })

    router.post('/update-entry', (req, res) => {
       // route now only used to update personality traits
      console.log('API :: ROUTING: Updating field value. Body:',req.body)
      const characterId = req.body.characterId
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
         
         Characters.findOneAndUpdate( 
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
         const filterObject = { "_id" : characterId }
         // console.log("filterObject: ",filterObject)
         Characters.findById(characterId)
         .then((myCharacter, err)=>{
            if (err) {
               console.log("Data retrieval failed:",err)
            } else {
               let myGroup = eval(`myCharacter.${group}`)
               myGroup.splice(fieldId,1,newVal);
               myCharacter.save((err,doc)=>{
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
   

router.post('/create-auxiliary', (req, res) => {
    console.log("API :: ROUTING: Creating auxiliary. Body:", req.body)

    const characterId = req.body.characterId
    const auxType = req.body.auxType.substring(0,req.body.auxType.length-1)
   //  const auxModel = mongoose.model(_.upperFirst(auxType));
    const auxName = _.upperFirst(auxType);
    console.log("auxName:",auxName)
    console.log("auxName template:",templates[auxType])
    let newAux = templates[auxType]
    newAux.owner = characterId;

    console.log("Creating document for aux type",auxName)
   //  auxModel.create(newAux)
   mongoose.model([auxName]).create(newAux)
    .then(result=>{
        console.log("Auxiliary created:",result)
        res.json(result)
    })
    .catch(err=>{
        console.log("Auxiliary creation failed:",err)
        res.json(err)
    })

    
})
router.post('/edit-auxiliary', (req, res) => {
    // PROPS:
    // auxId: the _id of the Auxiliary document to update
    // ayxType: the Collection where the auxiliary is saved
    // group: path to the nested data array (e.g. "personalInfo" or "combatSkills.general")
    // field: key for values in nested objects (e.g. "label" or "value")
    // value: the new/edited value to save
    // fieldId: the _id of the entry to be updated :: if null, save will be treated as a new entry
    
        console.log('API:: ROUTING: Editing auxiliary. Body:',req.body)
        const data = req.body;
        const auxId = data.auxId
        const auxType = _.upperFirst(data.auxType);
        const value = data.value;
        let updateObject = {};
        let options = {};
        let filter = {}
        
    
        console.log("auxType:", data.auxType)
        console.log("group:", data.group)
        console.log("field:", data.field)
        console.log("auxId:", data.auxId)
        console.log("fieldId:", data.fieldId)
        
         filter = {_id: auxId}
   
         if (!data.fieldId && !(data.fieldId===0)) {
            console.log("No fieldId found. Creating new entry.")
            if (data.field === "single" || data.field === "desc") {
               console.log("single/description")
               updateObject = {$push: {[`${data.group}`]:`${value}`}};
            } else {
               console.log("label-value pair")
               const newId = new mongoose.Types.ObjectId
               updateObject
               = {$push: {[`${data.group}`]:{"_id": newId, "label":`${value}`,"value":"","isTicked":false}}};
               }
               options = { 
               useFindAndModify: false,
               upsert: true, 
               new: true
            }
         } else {
            console.log("fieldId found. Updating existing entry.")
            if (data.field === "single" || data.field === "desc") {
               console.log("single/description")
               updateObject = {$set: {[`${data.group}.${data.fieldId}`]:`${value}`}};
               options = { 
                  useFindAndModify: false,
                  upsert: true, 
                  new: true
               }
            } else {
               console.log("label-value pair")
               updateObject = {$set: {[`${data.group}.$[entry].${data.field}`]:`${value}`}};  
               options = {
                  arrayFilters: [{ 'entry._id' : data.fieldId }], 
                  useFindAndModify: false,
                  upsert: true, 
                  new: true
               }
            }
         }
    
    
        console.log("auxId:",data.auxId,". Filter object:",filter,". Update object:",updateObject,". options:",options)
    
         console.log("auxType:",auxType)
         
         models[auxType].findOneAndUpdate(
                filter,
                updateObject,
                options,
                (err, resp)=>{
                if (err) {
                    console.log("Update failed:",err)
                    if (err.kind === 'Number') {
                     
                       console.log("Error message is of type CastError")
                       res.json({failure:"validationError"})
                     } else {
                        console.log("Error message is NOT of type CastError")
                       res.json({failure:"otherError"})
                     }
                } else if (resp) {
                    console.log("Update succeeded:",resp)
                    res.json(resp)
                } else {
                    console.log("No error or response returned by server")
                }
            })
            
    })


// Dice management routes
router.get('/users/:userId/dicesets', (req, res)=>{
    const userId = req.params.userId;
    console.log("API :: ROUTING : Get /dicesets for userId:",userId)

    const filter = {isOwner: userId}
    DiceSets.find(filter)
        .then(data=>{
            console.log("setsData:",data);
            if (data.length>0){
               console.log(data[0].diceSets.length, 'dice sets found.')
               const diceSets = data[0].diceSets;
               console.log("diceSets:",diceSets);
               res.json(diceSets);
            } else {
               console.log("no dice sets found.")
               res.json([]);
            }
        })
        .catch(err=>{
            console.log("Diceset retrieval failed:",err)
            const errSend = {err: err}
            res.json(errSend)
        })
})

// reserve routes
router.post('/getReserve', (req,res)=>{
   const reserveName = req.body


})


// Bug Report Route
router.post('/report-bug', (req, res)=>{
   console.log('API :: ROUTING: reporting bug. Body:', req.body)
   
   const reportedBy = req.body.reportedBy;
   const problem = req.body.problem;
   const description = req.body.description || '';
   const response = ''
   const resolved = false

   const newBugReport = new models.BugReports({
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