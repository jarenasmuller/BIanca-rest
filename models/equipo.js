'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var equipoSchema=Schema({
    nombre: String,
    creado: Date,
    miembros:Array,
    slug:String,
    dueno:{ type: Schema.ObjectId,ref:'Usuario' },
    region: String,
    comuna: String
});

module.exports=mongoose.model('Equipo',equipoSchema);