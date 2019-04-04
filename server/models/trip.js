const mongoose = require('mongoose');

let tripSchema = new mongoose.Schema({
  vehicle_id:{
    type: String,
  },
});

module.exports = mongoose.model('tripsSchema', tripSchema);
