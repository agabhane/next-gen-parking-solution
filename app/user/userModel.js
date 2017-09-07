var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  companyId: {
    type: String, required: true
  },
  email: {
    type: String, required: true, unique: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'MANAGER', 'USER']
  },
  password: {
    type: String
  },
  code: {
    type: String
  },
  status: {
    type: String, required: true,
    enum: ['ACTIVE', 'INACTIVE']
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);