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
    slotRoutes.get('/', requireAuth, slotCtrl.getAllSlots);
    slotRoutes.post('/', requireAuth, slotCtrl.createSlot);
    slotRoutes.get('/:companyId', requireAuth, slotCtrl.getSlotsByCompanyId);
    slotRoutes.put('/:slotId', requireAuth, slotCtrl.updateSlotById);
    slotRoutes.delete('/:slotId', requireAuth, slotCtrl.deleteSlot);
    
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
    userRoutes.get('/:email', requireAuth, userCtrl.getUser);
    userRoutes.delete('/:email', requireAuth, userCtrl.deleteUser);
    userRoutes.post('/', requireAuth, userCtrl.createUser);
    userRoutes.put('/:email', requireAuth, userCtrl.updateUser);


    //Transaction routes


    app.use('/api', apiRoutes);
};