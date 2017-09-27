'use strict';
var mongoose = require('mongoose'),
  validator = require('./validator'),
  bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  companyId: {
    type: String, required: true,
    validate: {
      isAsync: true,
      validator: function (companyId, callBack) {
        validator.companyValidator(companyId).then(function (isCompanyExist) {
          callBack(isCompanyExist, 'Company does not exist in DB');
        })
      }
    }
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
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  }
}, {
    timestamps: true
  });

userSchema.pre('save', function (next) {

  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {

    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function (err, hash) {

      if (err) {
        return next(err);
      }

      user.password = hash;
      next();

    });

  });

});

userSchema.methods.comparePassword = function(passwordAttempt, cb){
  
     bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
  
         if(err){
             return cb(err);
         } else {
             cb(null, isMatch);
         }
     });
  
 }

module.exports = mongoose.model('User', userSchema);