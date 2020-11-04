'use strict'

var jwt = require('jwt-simple');
var jwtService = require('../services/jwt');
var moment = require('moment');
var secret = 'secret_key_camillion';

/*
* Authentication checking Middleware
*/
exports.ensureAuth = function (req, res, next) {

    //checking the role passed in the authentication header
    //In a real case, it would take the token from the authentication header instead of generating it.
    if (req.headers.authorization == "admin") {
        //generating a adming token
        var token = jwtService.createToken(jwtService.simulatedAdminUser());
    } else if (req.headers.authorization == "user") {
        //generating a user token
        var token = jwtService.createToken(jwtService.simulatedNormalUser());
    } else {
        //sending an error message in case there is no authentication
        let data = { error: true, errorMessage: "The request does not have the authentication header." }
        return res.status(401).send(data);
    }

    try {
        //decoding the token with the secret password
        var payload = jwt.decode(token, secret);

        //checking that the token has not expired
        if (payload.exp <= moment().unix()) {
            let data = { error: true, errorMessage: "The token has been expired" }
            return res.status(401).send(data);
        }
    } catch (ex) {
        //catching possible errors
        let data = { error: true, errorMessage: ex.message }
        return res.status(404).send(data);
    }

    //setting the request user
    req.user = payload;

    next();
}