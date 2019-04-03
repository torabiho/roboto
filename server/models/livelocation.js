const mongoose = require('mongoose');

let liveLocationSchema = new mongoose.Schema({
  vehicle_id:{
    type: String,
  },
  location: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('liveLocationSchema', liveLocationSchema);
