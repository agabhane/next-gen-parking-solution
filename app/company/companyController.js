var Company = require('./companyModel'),
  HttpStatus = require('http-status-codes'),
  request = require('request'),
  appConfig = require('../../config/appConfig'),
  log4js = require('log4js');

var logger = log4js.getLogger();
logger.level = 'debug';

exports.createCompany = function (req, res) {
  Company.create({ "name": req.body.companyName }, function (err) {
    if (err) {
      logger.debug("[FAILED] - create company - " + JSON.stringify(err));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    } else {
      Company.findOne({ "name": req.body.companyName }, function (err, company) {
        if (err) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
        request.post({
          url: appConfig.baseURL + '/api/user/',
          json: {
            "name": req.body.name,
            "companyId": company._id,
            "email": req.body.email,
            "role": "ADMIN",
            "password": req.body.password,
            "status": "ACTIVE"
          }
        }, function (error, response, body) {
          if (error) {
            Company.findByIdAndRemove(company._id, function (err, deleteCompanyRes) {
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
            });
          } else {
            res.json(company);
          }

        });
      });
    }
  });
}

exports.getAllCompanies = function (req, res) {
  Company.find(function (err, companies) {
    if (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
    res.json(companies);
  });
}

exports.deleteAllCompanies = function (req, res) {
  Company.collection.drop()
    .then(() => {
      res.status(HttpStatus.OK).send({ "message": "All companies have been deleted successfully" });
    }, () => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ "message": "Failed to delete companies" });
    });
}