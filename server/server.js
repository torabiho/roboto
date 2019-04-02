const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

let vehicleLocation = require('./models/location');
let liveLocation = require('./models/livelocation');

mongoose.connect('mongodb://admin:admin1@ds229826.mlab.com:29826/roboto', {useNewUrlParser: true });
let db = mongoose.connection;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(`../public/`));

app.get('/locations', (req,res) =>{
  console.log("Sending fleet info");
  vehicleLocation.find({}).then(docs => res.json(docs));
});

app.get('/livelocation', (req,res) =>{ 
  liveLocation.find({}).then(docs => res.json(docs));
});

app.post('/locations', (req,res) =>{
  console.log(req.body.vehicle_id);
  var location = new vehicleLocation({vehicle_id: req.body.vehicle_id, locationAndStats:req.body.locationAndStats });
  location.save();
  console.log("Received new update:");
  console.log(location);
  res.send("Success");
});

app.listen(port, function(){
  console.log('Server started on port: ' + port);
});
