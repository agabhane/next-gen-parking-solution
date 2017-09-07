var Company = require('./companyModel');
var HttpStatus = require('http-status-codes');

exports.createCompany = function (req, res) {
  Company.create(req.body, function (err, todo) {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
    Company.findOne({ "name": req.body.name }, function (err, companies) {
      if (err) {
        res.send(err);
      }
      res.json(companies);
    });
  });

}

exports.getAllCompanies = function (req, res) {
  Company.find(function (err, companies) {
    if (err) {
      res.send(err);
    }
    res.json(companies);
  });

}