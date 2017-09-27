'use strict';
var express = require('express');
var companyCtrl = require('./company/companyController');
var userCtrl = require('./user/userController');
var slotCtrl = require('./slots/slotController');
var authCtrl = require('./authenticationController');
var passportService = require('../config/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function (app) {
    var apiRoutes = express.Router(),
        companyRoutes = express.Router(),
        userRoutes = express.Router(),
        slotRoutes = express.Router(),
        authRoutes = express.Router();


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
    
    //Auth routes
    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/register', authCtrl.register);
    authRoutes.post('/login', requireLogin, authCtrl.login);
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    //User routes
    apiRoutes.use('/user', userRoutes);
    userRoutes.get('/', requireAuth, userCtrl.getAllUsers);
    userRoutes.get('/:email', userCtrl.getUser);
    userRoutes.delete('/:email', userCtrl.deleteUser);
    userRoutes.post('/', userCtrl.createUser);
    userRoutes.put('/:email', userCtrl.updateUser);


    //Transaction routes


    app.use('/api', apiRoutes);
};