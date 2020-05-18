'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var torneoSchema=Schema({
    dueno:{ type: Schema.ObjectId,ref:'Usuario' },
    nombre: String,
    cantidadEquipo : String,
    fechas:String,
    idaVuelta: String,
    ubicacion:String,
    creado: String,
    equipos:Array,
    slug:String,
    tipoDeporte:String,
    tipoTorneo:String,
    fechaInicio:Date,
    region:String,
    comuna:String,
    minJugador:String,
    maxJugador:String,
    imgDefault:String,
    fixture:Array,
    fixVuelta:Array,
});

module.exports=mongoose.model('Torneo',torneoSchema);