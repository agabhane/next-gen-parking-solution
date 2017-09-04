var express = require('express');
var companyCtrl = require('./company/companyController')

module.exports = function (app) {
  var apiRoutes = express.Router(),
    companyRoutes = express.Router();


  //Company routes
  apiRoutes.use('/company', companyRoutes);
  companyRoutes.get('/', companyCtrl.getAllCompanies);
  companyRoutes.post('/', companyCtrl.createCompany);

  //Slots routes

  
  //User routes


  //Transaction routes
  

  app.use('/api', apiRoutes);
}