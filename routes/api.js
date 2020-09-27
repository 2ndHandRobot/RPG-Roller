const express = require('express');
const router = express.Router();
const models = require('../models/models');
const { Users, Knights, DiceSets } = require('../models/models');

// Routing
router.get('/', (req, res) => {
   console.log("ROUTING: Get '/'")
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
   console.log("ROUTING: Get '/admins'")
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
   console.log("ROUTING: Get '/' for user: ",userId);
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
   console.log("ROUTING: Get '/' for user: ",userId);
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
   console.log('ROUTING: Creating new user. Body:',req.body)
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
   console.log('ROUTING: Logging in user. Body:',req.body)
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
   console.log('ROUTING: Logging out user. Body:', req.body);
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
   console.log('ROUTING: Creating new Knight character. Body:',req.body)
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
   console.log('ROUTING: Saving dice sets. Body:', req.body)
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

router.post('/update-val', (req, res) => {
   console.log('ROUTING: Updating field value. Body:',req.body)
   const group = req.body.group;
   const newVal = req.body.newVal;
   const updateString = `{${group}.$.value: ${newVal}}`
   
   Knights.findOneAndUpdate(
      {[`${group}._id`]: req.body.fieldId},
      {$set: {[`${group}.$.value`]: newVal}},
      {useFindAndModify: false, new:true},
      (err, result)=>{
         if (err) {
            console.log("RESULT OF LIST UPDATE: ",err);
            res.send(err);
         } else {
            // console.log("Outcome of update: ",result);
            res.send("RESULT OF LIST UPDATE: "+result);
         }
      }
   )
})


   router.post('/update-entry', (req, res) => {
      console.log('ROUTING: Updating field value. Body:',req.body)
      const group = req.body.group;
      const newLab = req.body.newLab;
      const newVal = req.body.newVal;
      console.log("group: ",group," / newLab: ",newLab," / newVal: ",newVal);
      let updateObject;
      if (newLab&&newVal){
         console.log("both found")
         updateObject = {[`${group}.$.label`]: newLab, [`${group}.$.value`]: newVal}
      } else if (newLab) {
         console.log("newLab found")
         updateObject = {[`${group}.$.label`]: newLab}
      } else if (newVal) {
         console.log("newVal found")
         updateObject = {[`${group}.$.value`]: newVal}
      }

      Knights.findOneAndUpdate(
         {[`${group}._id`]: req.body.fieldId},
         {$set: updateObject},
         {useFindAndModify: false, new:true},
         (err, result)=>{
         if (err) {
         console.log("RESULT OF LIST UPDATE: ",err);
         res.send(err);
         } else {
         // console.log("Outcome of update: ",result);
         res.send("RESULT OF LIST UPDATE: "+result);
         }
         }
      )
   }
)

router.post('/report-bug', (req, res)=>{
   console.log('ROUTING: reporting bug. Body:', req.body)
   
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