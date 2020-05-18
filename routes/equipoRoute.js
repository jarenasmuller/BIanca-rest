'use strict'

var express=require('express');

var EquipoCont=require('../controllers/equipoController');
var midle=require('../middlewares/autenticar');
var api=express.Router();

api.post('/guardaEquipo',midle.asegurarAouth,EquipoCont.guardarEquipo);
api.post('/getEquiposByUsu/:id',EquipoCont.getEquiposByUsu);
api.get('/getEquipos',EquipoCont.getEquipos);
api.get('/getEquipoByNombre/:nombre',EquipoCont.getEquiposByNombre);
api.get('/getEquipoBySlug/:slug',EquipoCont.getEquipoBySlug);
api.delete('/borrarEquipo/:id/:iddueno',midle.asegurarAouth,EquipoCont.deleteEquipo);
api.get('/getEquipoByRegion/:region',EquipoCont.getEquiposByRegion);
api.get('/getEquipoByComuna/:comuna',EquipoCont.getEquiposByComuna);
api.put('/actualizarEquipo/:id',midle.asegurarAouth,EquipoCont.updateEquipo);
api.get('/getEquipoById/:id',EquipoCont.getEquipoById);
module.exports=api;