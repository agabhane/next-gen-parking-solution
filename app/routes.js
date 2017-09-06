var express = require('express');
var companyCtrl = require('./company/companyController');
var slotCtrl = require('./slots/slotController');

module.exports = function (app) {
  var apiRoutes = express.Router(),
    companyRoutes = express.Router();
    slotRoutes = express.Router();


  //Company routes
  apiRoutes.use('/company', companyRoutes);
  companyRoutes.get('/', companyCtrl.getAllCompanies);
  companyRoutes.post('/', companyCtrl.createCompany);

  //Slots routes
  apiRoutes.use('/slot', slotRoutes);
  slotRoutes.get('/', slotCtrl.getAllSlots);
  slotRoutes.post('/', slotCtrl.createSlot);
  
  //User routes


  //Transaction routes
  

  app.use('/api', apiRoutes);
}