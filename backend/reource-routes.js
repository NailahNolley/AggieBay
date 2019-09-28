const routes = require('express').Router(); 
const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/resource-routes';
const mongo = require('mongodb');

let resourceCollection = null;

mongoClient.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('aggiebayDB');
    resourceCollection = db.collection('recources');
});

  // GET all resources 
routes.get(`/resources`, (request, response) => { 
    if(resourceCollection){
        resourceCollection.find().toArray((err, items) => {
            console.log(items);
            response.json(items);
        });
    }else{
        response.status(500).json("There was an issue accessing resource data.");
    }
});

//GET resource by id 
routes.get(`/resources/:id`, (request, response) => { 
    const resourceId = request.params.id;  
    console.log('resource get id', resourceId); 
    if(resourceCollection){
        resourceCollection.findOne({_id: new mongo.ObjectId(resourceId)},(err, items) => {
            console.log(items);
            response.json(items);
        });
    }else{
        response.status(500).json("Resource not found.");
    }
}); 

routes.post(`/resources`, (request, response) => { 
    const incomingResource = request.body; 
    const validityCheck = isPayloadValid(incomingResource);

    if(!validityCheck.isValid){
        response.status(400).json(validityCheck.message);
        return false;
    }

    resourceCollection.insertOne(incomingResource, (err, result) => {
        if(err){
            response.json("There is an issue with saving the resource.");
        }
        response.json(result); 
    });
    console.log('incoming resource ', incomingResource);
    
}); 
 
routes.put(`/resources/:id`, (request, response) => { 
    const resourceId = request.params.id; 
    const body = request.body; 

    console.log('resource update id', resourceId);
    resourceCollection.updateOne({_id: new mongo.ObjectId(resourceId)}, {'$set': body}, (err, item) => {
      //  console.log(item);
        if(err){
            response.status(500).send('Resource not found.');
        }else{
            response.send(item);
        }
        
      });
 
}); 
 
routes.delete(`/resources/:id`, (request, response) => { 
    const resourceId = request.params.id; 

    resourceCollection.deleteOne({_id: new mongo.ObjectId(resourceId)}, (err, item) => {
        console.log(item)
        if (err) { 
            response.status(500).send('Resource not found.'); 
        } else { 
            
            response.send(item); 
        } 
        });
    
});

function isPayloadValid(data){
    let response = {
        isValid: true,
        message: "Okay to continue."
    };
    
    return response;
}