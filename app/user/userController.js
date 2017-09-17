'use strict';
var User = require('./userModel');
var HttpStatus = require('http-status-codes');


exports.createUser = function (req, res) {
    var resObject = {};
    User.find({"email": req.body.email}, function (err, users) {
        console.log(users);
        if (users.length == 0) {
                User.create(req.body, function (err) {
                if (err) {
                    if (err.errmsg) {
                        resObject = {message: 'Duplicate Key Error, ' + err.errmsg}
                    } else {
                        resObject = {message: err.message}
                    }
                    res.status(HttpStatus.BAD_REQUEST).send(resObject);
                }
                User.findOne({"email": req.body.email}, function (err, user) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(user);
                });
            });
        } else {
            res.status(HttpStatus.BAD_REQUEST).send({message: 'User Already exist'});
        }
    });
}

exports.updateUser = function (req, res) {
    User.findOne({"email": req.params.email}, function (err, users) {
        if (err) {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Failed to get User"});//
        }
        if (users) {
            User.findOneAndUpdate({"email": req.params.email}, req.body, function (err, users) {
                if (err) {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Update User failed"});
                }
                User.findOne({"email": req.params.email}, function (err, user) {
                    if (err) {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "User is created but failed while fetching"});
                    }
                    res.json(user);
                });
            })
        } else {
            res.status(HttpStatus.BAD_REQUEST).send({message: "Given user does not exist"});
        }
    });
}

exports.getAllUsers = function (req, res) {
    if(req.query.status){
        User.find({"status":req.query.status}, function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    } else {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }
}

exports.getUser = function (req, res) {
    User.findOne({"email": req.params.email}, function (err, userOne) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "User is created but failed while fetching"});
        } else if (userOne) {
            res.json(userOne);
        } else {
            res.status(HttpStatus.BAD_REQUEST).send({message: "User does not exist"});
        }
    });
}
exports.deleteUser = function (req, res) {
    User.findOne({"email": req.params.email}, function (err, userOne) {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "User is created but failed while fetching"});
        } else if (userOne) {
            User.findByIdAndRemove(userOne._id, function (err, deleteUserStatus) {
                res.json({"message":"User deleted successfully"});
            });
        } else {
            res.status(HttpStatus.BAD_REQUEST).send({message: "User does not exist"});
        }
    });
}