'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_key_camillion';
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

function createToken(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
}

function simulatedAdminUser(){
    var user = new User();
    user.name = "admin";
    user.surname = "admin";
    user.nick = "admin";
    user.email = "admin@admin.com"
    user.role = 'ROLE_ADMIN';
    bcrypt.hash("admin", null, null, (err,hash) => {
        user.password = hash;
        if(err) console.log(err);
    });
    return user;
}

function simulatedNormalUser(){
    var user = new User();
    user.name = "user";
    user.surname = "user";
    user.nick = "user";
    user.email = "user@user.com"
    user.role = 'ROLE_USER';
    bcrypt.hash("user", null, null, (err,hash) => {
        user.password = hash;
        if(err) console.log(err);
    });
    return user;
}

module.exports = {
    createToken,
    simulatedAdminUser,
    simulatedNormalUser
}