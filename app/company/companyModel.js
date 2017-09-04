var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
  name: {
    type: String, required: true, unique: true
  },
  username: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee']
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('Company', companySchema);