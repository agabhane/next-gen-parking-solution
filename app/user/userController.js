var User = require('./userModel');
var HttpStatus = require('http-status-codes');

exports.createUser = function (req, res) {
  var resObject = {};
  User.create(req.body, function (err) {
    if (err) {
      if(err.errmsg){
        resObject = { message: 'Duplicate Key Error, ' + err.errmsg}
      } else {
        resObject = { message: 'Mandory field validation error, Field missing ' + Object.keys(err.errors)}
      }
      res.status(HttpStatus.BAD_REQUEST).send(resObject);
    }
    User.findOne({"email":req.body.email}, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

}

exports.updateUser = function(req, res){
  User.findOne({"email":req.params.email},function (err, users) {
    if (err) {
      res.status(HttpStatus.BAD_REQUEST).send({message: "Failed to get User"});//
    }
    if(users){
      User.findOneAndUpdate({"email":req.params.email},req.body,function (err, users) {
        if(err){
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "Update User failed" });
        }
        User.findOne({"email":req.params.email},function (err, user) {
          if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "User is created but failed while fetching" });
          }
          res.json(user);
        });
      })
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({ message: "Given user does not exist"});
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