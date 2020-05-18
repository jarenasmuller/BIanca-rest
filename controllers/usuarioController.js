'use strict'
var bcrypt=require('bcrypt-nodejs');
var Usuario=require('../models/usuario');
var jwt=require('../services/jwt');

//modulo para trabajar con fichero
var fs=require('fs');
var path=require('path');

function guardarUsuario(req,res){
    let usu=new Usuario();
    let params=req.body;
    usu.nombre=params.nombre;
    usu.edad=params.edad;
    usu.nombreUsuario=params.nombreUsuario;
    usu.mail=params.mail;
    usu.tipoUsuario=params.tipoUsuario;
    usu.image="";
    usu.creado=new Date(Date.now());
    Usuario.findOne({mail:usu.mail},(err,user)=>{
        if(err){
            res.status(500).send({ message:"Error:"})
        }else {
            if(user){
                res.status(500).send({ message:"Error: Mail ya existe"})
            }else{
                if(params.clave){
                    console.log(params.clave);
                    bcrypt.hash(params.clave,null,null,function(err,hash){
                        usu.clave=hash;
                        if(usu.nombre != null && usu.mail !=null){
                            usu.save((err,usuStored)=>{
                                if(err){
                                    res.status(500).send({ message:"Error:no se guardo"});
                                }else{
                                    if(usuStored){
                                        res.status(200).send({message:"Exito: Guardado correctamente",usuStored});
                                    }else{
                                        res.status(500).send({ message:"Error:usu no existe"});
                                    }
                                }
                            });
                        }else{
                            res.status(500).send({message:"Verifica tus datos"});
                        }
                    });
                }else{
                    res.status(500).send({ message:"Error: sin contraseña"})
                }
            }
        }
    });
}
function prueba(req,res){
    res.status(200).send({message:"authorizacion correcta"});
}
function login(req,res){
    let params=req.body;
    let mail=params.mail;
    let pass=params.clave;
    console.log(params);
    Usuario.findOne({mail:mail},(err,user)=>{
        if(err){
            res.status(500).send({ message:"error en peticion"})
        }else if(!user){
            res.status(404).send({ message:"usuario no existe"})
        }else{
            bcrypt.compare(pass,user.clave,function(err,check){
                if(check){
                    if(params.gethash){
                        res.status(200).send({
                            token:jwt.crearToken(user)
                        });
                    }else{
                        console.log(user);
                        res.status(200).send({user});
                    }
                }else{
                    res.status(404).send({message:"usuario y/o clave no valido"})
                }
            });
        }
    });
}
function updateUser(req,res){
    var userId=req.params.id;
    var params=req.body;
    if(params.clave){
        bcrypt.hash(params.clave,null,null,function(err,hash){
            params.clave=hash;
            Usuario.findByIdAndUpdate(userId,params,{new: true},(err,userUpdated)=>{
                if(err){
                    res.status(500).send({ message:"Error:no se guardo"});
                }else{
                    if(userUpdated){
                        console.log(userUpdated);
                        res.status(200).send({message:"Exito: Actualizado correctamente",userUpdated});
                    }else{
                        res.status(500).send({ message:"Error:usu no existe"});
                    }
                }
            });
        });
    }else{
        Usuario.findByIdAndUpdate(userId,params,{new: true},(err,userUpdated)=>{
            if(err){
                res.status(500).send({ message:"Error"})
            }else{
                if(!userUpdated){
                    res.status(404).send({ message:"Error: No se pudo actualizar"})
                }else{
                    //console.log(userUpdated)
                    res.status(200).send({message:"Exito: Actualizado correctamente",params,userUpdated});
                }
            }
        });
    }
}
function subeImg(req,res){
    var userId=req.params.id;
    var fileName="no";
    if(req.files){
        var file_path=req.files.image.path;
        var file_split=file_path.split('/');
        var fileName=file_split[2];
        var extencion=fileName.split('.');
        var image={image:fileName};
        console.log(image);
        if(extencion[1]=="png"||extencion[1]=="jpg"||extencion[1]=="gif"){
            Usuario.findByIdAndUpdate(userId,image,(err,userUpdated)=>{
                //console.log("entro en callback");
                if(err){
                    console.log();
                    res.status(500).send({ message:"error al actualizar"})
                }else{
                    //console.log("sin error");
                    if(!userUpdated){
                        //console.log("no actualizado");
                        res.status(404).send({ message:"no se pudo actualizar"})
                    }else{
                        //console.log(userUpdated)
                        res.status(200).send({image:fileName,userUpdated});
                    }
                }
            });
        }else{
            //console.log(extencion)
            res.status(200).send({message:"extencion no valida"});
        }
    }else{
        res.status(200).send({message:"nada subido"});
    }
}

function getImageFile(req,res){
    var imageFile=req.params.imageFile;
    var rutaImagen='./uploads/users/'+imageFile;
    fs.exists(rutaImagen, function(exists){
        if(exists){
            res.sendFile(path.resolve(rutaImagen));
        }else{
            res.status(200).send({message:"imagen no existe"});
        }
    });
}
module.exports = {
    login,
    guardarUsuario,
    prueba,
    updateUser,
    subeImg,
    getImageFile
};
