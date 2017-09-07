'use strict';
var mongoose = require('mongoose'),
    validator = require('./validator');
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
        enum: ['ACTIVE', 'INACTIVE']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);