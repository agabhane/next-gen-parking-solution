var jwt = require('jsonwebtoken');
var User = require('./user/userModel');
var Company = require('./company/companyModel');
var authConfig = require('../config/auth');

var httpStatus = require('http-status-codes');

var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

function generateToken(user) {
  return jwt.sign(user, authConfig.secret, {
    expiresIn: 3600
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    role: request.role
  };
}

exports.login = function (req, res, next) {

  var userInfo = setUserInfo(req.user);

  res.status(httpStatus.OK).json({
    token: generateToken(userInfo),
    user: userInfo
  });

}

exports.register = function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  if (!req.body.email) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Email address required' });
  }

  if (!req.body.password) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Password required' });
  }

  if (!req.body.name) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Name required' });
  }

  if (!req.body.companyName) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Company Name required' });
  }

  User.findOne({ email: email }, function (err, existingUser) {

    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(httpStatus.BAD_REQUEST).send({ error: 'Email address is already in use' });
    }

    Company.findOne({name: req.body.companyName}, (err, existingCompany)=>{
      if (err) {
        return next(err);
      }
      if (existingCompany) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'Company name is already in use' });
      }

      Company.create({ "name": req.body.companyName }, function (err) {
        if (err) {
          logger.debug("[FAILED] - create company - " + JSON.stringify(err));
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: 'Failed to register'});
        }

        Company.findOne({ "name": req.body.companyName }, function (err, company) {
          if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: 'Failed to register'});
          }

          User.create({
            "name": req.body.name,
            "companyId": company._id,
            "email": req.body.email,
            "role": "ADMIN",
            "password": req.body.password
          }, function (err) {
            if (err) {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: 'Failed to register'});
            }
            var userInfo = setUserInfo({
              email: req.body.email,
              role: 'ADMIN'
            });

            res.status(httpStatus.CREATED).json({
              token: generateToken(userInfo),
              user: userInfo
            })

          });

          
        });

      });

    });

  });

}

/* exports.roleAuthorization = function (roles) {

  return function (req, res, next) {

    var user = req.user;

    User.findById(user._id, function (err, foundUser) {

      if (err) {
        res.status(422).json({ error: 'No user found.' });
        return next(err);
      }

      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content' });
      return next('Unauthorized');

    });

  }

} */