var express = require('express');
var companyCtrl = require('./company/companyController');
var userCtrl = require('./user/userController');

module.exports = function (app) {
  var apiRoutes = express.Router(),
    companyRoutes = express.Router();
    userRoutes = express.Router();


  //Company routes
  apiRoutes.use('/company', companyRoutes);
  companyRoutes.get('/', companyCtrl.getAllCompanies);
  companyRoutes.post('/', companyCtrl.createCompany);

  //Slots routes

  
  //User routes

  apiRoutes.use('/user', userRoutes);
  userRoutes.get('/', userCtrl.getAllUsers);
  userRoutes.post('/', userCtrl.createUser);


  //Transaction routes
  

  app.use('/api', apiRoutes);
}