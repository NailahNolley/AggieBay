const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const mongo = require('mongodb');



mongoClient.connect(url, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  
});



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
    next(); 
  }); 
 
const PORT = 3000; 
 
const resourceRoutes = require('./resource-routes'); 
const profileRoutes = require('./profile-routes'); 
// const validateAddress = require('./address-routes');

 
//  Connect all our routes to our application 
app.use('/', resourceRoutes); 
app.use('/', profileRoutes); 
// app.use('/', validateAddress);
 
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));