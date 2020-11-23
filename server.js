// Import npm packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan('tiny'));

const routes = require('./routes/api');

let database, dbLocation;

switch (process.env.NODE_ENV) {
   case "development_local":
      database = 'mongodb://localhost:27017/RollerDB';
      dbLocation = "local";
      app.use(express.static('client'))
      break;
   case "development_remote":
      database = process.env.MONGODB_URI;
      dbLocation = "remote";
      app.use(express.static('client'))
      break;
   case "production":
      database = process.env.MONGODB_URI;
      dbLocation = "remote";
      app.use(express.static('client/build'));
      break;
   default:
   }

mongoose.connect(database, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})


mongoose.connection.on('connected', ()=>{
   console.log(`Mongoose is connected to ${dbLocation} database.`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'))
} else {
   app.use(express.static('client'))
}

app.listen(PORT, console.log(`Server (${process.env.NODE_ENV}) is starting at ${PORT}`));