const mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
  vehicle_id:{
    type: String,
    default: 'ID of vehicle'
  },
  locationAndStats: {
      type: String,
      required:false
  }
});

module.exports = mongoose.model('locationSchema', locationSchema);
