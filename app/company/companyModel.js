"use strict";
var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
  name: {
    type: String, required: true, unique: true
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model('Company', companySchema);