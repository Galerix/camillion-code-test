'use strict'

var jwt = require('jwt-simple');
var jwtService = require('../services/jwt');
var moment = require('moment');
var secret = 'secret_key_camillion';

exports.ensureAuth = function (req, res, next) {

    if (!req.headers.authorization) {
        var token = jwtService.createToken(jwtService.simulatedUser());
    } else {
        var token = req.headers.authorization.replace(/['"]+/g, '');
    }    

    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            let data = { error: true, errorMessage: "The token has been expired" }
            return res.status(401).send(data);
        }
    } catch (ex) {
        let data = { error: true, errorMessage: ex.message }
        return res.status(404).send(data);
    }

    req.user = payload;

    next();
}