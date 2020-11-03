'use strict'

var jwt = require('jwt-simple');
var jwtService = require('../services/jwt');
var moment = require('moment');
var secret = 'secret_key_camillion';

exports.ensureAuth = function (req, res, next) {

    //In a real case, it would take the token from the authentication header instead of generating it.
    if (req.headers.authorization == "admin") {
        var token = jwtService.createToken(jwtService.simulatedAdminUser());
    } else {
        var token = jwtService.createToken(jwtService.simulatedNormalUser());
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