var User = require('./userModel');

exports.createUser = function (req, res) {
  User.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ error: "boo:(" });
    }
    User.findOne({"email":req.body.email},function (err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

}

exports.getAllUsers = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });

}