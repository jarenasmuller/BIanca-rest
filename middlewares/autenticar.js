'use strict'

var jwt=require('jwt-simple');
var moment=require('moment');
var secret='secret';

exports.asegurarAouth=function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: "sin headers"})
    }
    let token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload=jwt.decode(token,secret);
        if(payload.exp<=moment().unix()){
            return res.status(403).send({message: "token expiro"})
        }
    }catch(ex){
        return res.status(403).send({message: "token no valido"})
    }
    req.user=payload;
    next();
}