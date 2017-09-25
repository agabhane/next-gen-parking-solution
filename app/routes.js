'use strict';
var express = require('express');
var companyCtrl = require('./company/companyController');
var userCtrl = require('./user/userController');
var slotCtrl = require('./slots/slotController');

module.exports = function (app) {
    var apiRoutes = express.Router(),
        companyRoutes = express.Router(),
        userRoutes = express.Router(),
        slotRoutes = express.Router();


    //Company routes
    apiRoutes.use('/company', companyRoutes);
    companyRoutes.get('/', companyCtrl.getAllCompanies);
    companyRoutes.post('/', companyCtrl.createCompany);
    companyRoutes.delete('/deleteall/', companyCtrl.deleteAllCompanies);

    //Slots routes
    apiRoutes.use('/slot', slotRoutes);
    slotRoutes.get('/', slotCtrl.getAllSlots);
    slotRoutes.post('/', slotCtrl.createSlot);
    slotRoutes.get('/:companyId', slotCtrl.getSlotsByCompanyId);
    slotRoutes.put('/:slotId', slotCtrl.updateSlotById);
    slotRoutes.delete('/:slotId', slotCtrl.deleteSlot);
    


    //User routes
    apiRoutes.use('/user', userRoutes);
    userRoutes.get('/', userCtrl.getAllUsers);
    userRoutes.get('/:email', userCtrl.getUser);
    userRoutes.delete('/:email', userCtrl.deleteUser);
    userRoutes.post('/', userCtrl.createUser);
    userRoutes.put('/:email', userCtrl.updateUser);


    //Transaction routes


    app.use('/api', apiRoutes);
};