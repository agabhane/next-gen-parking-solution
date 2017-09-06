var mongoose = require('mongoose');

var slotSchema = new mongoose.Schema({
  name: {
    type: String, required: true, unique: true
  },
  type: {
    type: String, required: true
  },
  capacity: {
    type: String, required: true    
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('Slot', slotSchema);