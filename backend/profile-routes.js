const routes = require('express').Router(); 

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/profile-routes';
const mongo = require('mongodb');

let profileCollection = null;

// {
// 	"firstname":"John",
// 	"lastname":"Doe",
// 	"email":"john.doe@email.com",
// 	"phonenum":"(123) 456-7891",
// 	"street":"Street St",
// 	"city":"City",
// 	"state":"State",
// 	"zip":"12345",
// 	"cardnum":"1234 5678 9012 3456",
// 	"expdate":"01/01",
// 	"cvc":"123"
	
// }


mongoClient.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('internDB');
    profileCollection = db.collection('profiles');
  });
 
//same from the application
//let profiles = []; 
 
// GET all profiles 
routes.get(`/profiles`, (request, response) => { 
    if(profileCollection){
        profileCollection.find().toArray((err, items) => {
            console.log(items);
            response.json(items);
        });
    }else{
        response.status(500).json("There was an issue accessing profile data.");
    }
});

//GET profile by id 
routes.get(`/profiles/:id`, (request, response) => { 
    const profileId = request.params.id; 
    console.log('profile id', profileId); 
    if(profileCollection){
        profileCollection.findOne({_id: new mongo.ObjectId(profileId)},(err, items) => {
            console.log(items);
            response.json(items);
        });
    }else{
        response.status(500).json("profile not found.");
    }
}); 


routes.post(`/profiles`, (request, response) => { 
    const incomingProfile = request.body; 
    const validityCheck = isPayloadValid(incomingProfile);

    if(!validityCheck.isValid){
        response.status(400).json(validityCheck.message);
        return false;
    } 
    profileCollection.insertOne(incomingProfile, (err, result) => {
        if(err){
            response.json("There is an issue with saving the profile.");
        }
        response.json(result); 
    });
    console.log('incoming profile ', incomingProfile);
    
}); 

routes.put(`/profiles/:id`, (request, response) => { 
    const profileId = request.params.id; 
    const body = request.body; 
    console.log('profile id', profileId);
    profileCollection.updateOne({_id: new mongo.ObjectId(profileId)}, {'$set': body}, (err, item) => {
        console.log(item);
        if(err){
            response.status(500).send('profile not found.');
        }else{
            response.send(item);
        }
      });
}); 

routes.delete(`/profiles/:id`, (request, response) => { 
    const profileId = request.params.id; 
    profileCollection.deleteOne({_id: new mongo.ObjectId(profileId)}, (err, item) => {
        console.log(item)
        if (err) { 
            response.status(500).send('profile not found.'); 
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

    if(!data.firstname){
        response.isValid = false;
        response.message ="First name is required.";
        return response;
    }
    if(!data.lastname){
        response.isValid = false;
        response.message ="Last name is required.";
        return response;
    }
    if(!data.cardnum){
        response.isValid = false;
        response.message ="Card number is required.";
        return response;
    }
    if(!data.expdate){
        response.isValid = false;
        response.message ="Expiration Date is required.";
        return response;
    }
    if(!data.cvc){
        response.isValid = false;
        response.message ="CVC is required.";
        return response;
    }
    
    return response;
}
 
//end of the file
module.exports = routes;