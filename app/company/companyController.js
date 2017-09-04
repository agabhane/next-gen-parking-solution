var Company = require('./companyModel');

exports.createCompany = function (req, res) {
  Company.create(req.body, function (err, todo) {
    if (err) {
      res.send(err);
    }
    Company.find(function (err, companies) {
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