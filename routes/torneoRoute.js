'use strict'

var express=require('express');

var TorneoCont=require('../controllers/torneoController');
var midle=require('../middlewares/autenticar');
var api=express.Router();

api.post('/guardarTorneo',midle.asegurarAouth,TorneoCont.guardarTorneo);
api.post('/getTorneosByUsu',TorneoCont.getTorneoByUsu);
api.get('/getTorneos',TorneoCont.getTorneos);
api.get('/getTorneoSlug/:slug',TorneoCont.getTorneoBySlug);
api.get('/getTorneoByRegion/:region',TorneoCont.getTorneosByRegion);
api.get('/getTorneoByComuna/:comuna',TorneoCont.getTorneosByComuna);
api.get('/getTorneoById/:id',TorneoCont.getTorneoById);
api.put('/actualizarTorneo/:id',midle.asegurarAouth,TorneoCont.updateTorneo);
api.delete('/borrarTorneo/:id',midle.asegurarAouth,TorneoCont.deleteTorneo);
module.exports=api;