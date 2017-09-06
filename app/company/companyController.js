var Company = require('./companyModel');

exports.createCompany = function (req, res) {
  Company.create(req.body, function (err) {
    if (err) {
      res.status(500).send({ error: "boo:(" });
    }
    Company.findOne({"name":req.body.name},function (err, companies) {
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