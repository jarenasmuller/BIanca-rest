'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var usuarioSchema=Schema({
    nombre: String,
    clave: String,
    edad:String,
    nombreUsuario:String,
    mail:String,
    creado:Date,
    ligas:Array,
    equipos:Array,
    image:String,
    region: String,
    comuna: String,
    tipoUsuario:String,
});

module.exports=mongoose.model('Usuario',usuarioSchema);