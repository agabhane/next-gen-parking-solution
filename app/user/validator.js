var HttpStatus = require('http-status-codes'),
    request = require('request'),
    appConfig = require('../../config/appConfig');
exports.companyValidator = function (v) {
    return new Promise(function (resolve, reject) {
        request(appConfig.baseURL + '/api/company/', function (error, response, body) {
            if (error) {
                resolve(false);
            } else {
                var response = JSON.parse(body);
                response.forEach(function (currCompany) {
                    if (currCompany._id === v) {
                        resolve(true);
                    }
                });
                resolve(false);
            }
        });
    })

};