var User = require('./userModel');

exports.createUser = function (req, res) {
  var resObject = {};
  User.create(req.body, function (err) {
    if (err) {
      if(err.errmsg){
        resObject = { message: 'Duplicate Key Error, ' + err.errmsg}
      } else {
        resObject = { message: 'Mandory field validation error, Field missing ' + Object.keys(err.errors)}
      }
      res.status(400).send(resObject);
    }
    User.findOne({"email":req.body.email},function (err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

}

exports.updateUser = function(req, res){
  User.findOne({"email":req.params.email},function (err, users) {
    if (err) {
      res.status(500).send({message: "Failed to get User"});//
    }
    if(users){
      User.findOneAndUpdate({"email":req.params.email},req.body,function (err, users) {
        if(err){
          res.status(500).send({ message: "Update User failed" });
        }
        User.findOne({"email":req.params.email},function (err, users) {
          if (err) {
            res.status(500).send({ message: "User is created but failed while fetching" });
          }
          res.json(users);
        });
      })
    } else {
      res.status(400).send({ message: "Given user does not exist"});
    }
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