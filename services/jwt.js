'use strict'

var jwt=require('jwt-simple');
var moment=require('moment');
var secret='secret';

exports.crearToken=function(user){
    var payload={
        sub:user._id,
        name:user.nombre,
        mail:user.mail,
        iat:moment().unix(),
        exp:moment().add(5,'minutes').unix
    }
    return jwt.encode(payload,secret);
}