'use strict'

var express=require('express');

var UsuController=require('../controllers/usuarioController');
var midle=require('../middlewares/autenticar');
var api=express.Router();

var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./uploads/users'});

api.get('/prueba',midle.asegurarAouth,UsuController.prueba);
api.post('/subeImg/:id',[midle.asegurarAouth,md_upload],UsuController.subeImg);
api.put('/actualizar/:id',midle.asegurarAouth,UsuController.updateUser);
api.post('/guardaUsuario',UsuController.guardarUsuario);
api.post('/login',UsuController.login);
api.get('/getImageUser/:imageFile',UsuController.getImageFile);
module.exports=api;