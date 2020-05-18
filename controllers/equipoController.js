'use strict'
var Equipo=require('../models/equipo');

function getEquiposByUsu(req,res){
    let params=req.body;
    let id=params.usu;
    Equipo.find({'dueno':id}).sort({creado:'desc'}).exec(function(err,equipos){
        if(err){
            res.status(500).send({message:"error buscar por id : "+id });
        }else{
            res.status(200).send({equipos});
        }
    });

}
function getEquipos(req,res){
    Equipo.find({},(err,equipos)=>{
        if(err){
            res.status(500).send({message:"error, no encontro ligas"});
        }else{
            res.status(200).send({equipos});
        }
    });
}
function getEquiposByNombre(req,res){
    var nombre=req.params.nombre;
    Equipo.find({'nombre':nombre}).sort({creado:'desc'}).exec(function(err,equipos){
        if(err){
            res.status(500).send({message:"error buscar por nombre : "+nombre });
        }else{
            res.status(200).send({equipos});
        }
    });
}
function getEquiposByRegion(req,res){
    var region=req.params.region;
    Equipo.find({'region':region}).sort({creado:'desc'}).exec(function(err,equipos){
        if(err){
            res.status(500).send({message:"error buscar por region : "+region });
        }else{
            res.status(200).send({equipos});
        }
    });
}
function getEquiposByComuna(req,res){
    var comuna=req.params.comuna;
    console.log(comuna);
    Equipo.find({'comuna':comuna}).sort({creado:'desc'}).exec(function(err,equipos){
        if(err){
            res.status(500).send({message:"error buscar por comuna : "+comuna });
        }else{
            res.status(200).send({equipos});
        }
    });
}
function getEquipoBySlug(req,res){
    var slug=req.params.slug;
    Equipo.find({'slug':slug}).sort({creado:'desc'}).exec(function(err,equipos){
        if(err){
            res.status(500).send({message:"error buscar por slug : "+slug });
        }else{
            res.status(200).send({equipos});
        }
    });
}
function guardarEquipo(req,res){
    var equipo=new Equipo();
    var params=req.body;
    equipo.nombre=params.nombre;
    equipo.dueno=params.dueno;
    equipo.region=params.region;
    equipo.comuna=params.comuna;
    equipo.slug=equipo.nombre.split(" ").join("-");
    equipo.creado=new Date(Date.now());
    if(equipo.nombre != null){
        equipo.save((err,equiStored)=>{
            if(err){
                res.status(500).send({ message:"error:no se guardo"});
            }else{ 
                if(equiStored){
                    res.status(200).send(equiStored);
                }else{
                    res.status(500).send({ message:"error:torneo no existe"});
                }
            }
        });
    }else{
        res.status(200).send({message:"verifica tus datos"});
   }
}
function deleteEquipo(req,res){
    var id=req.params.id;
    var iddueno=req.params.iddueno;
    console.log(iddueno);
    Equipo.findByIdAndRemove(id,(err,equipo)=>{
        if(err){
            res.status(500).send({message:"error, no se pudo borrar equipo"});
        }else{
            res.status(200).send({equipo});
        }
    });
}
function getEquipoById(req,res){
    var userId=req.params.id;
    Equipo.findById(userId,(err,equipo)=>{
        if(err){
            res.status(500).send({ message:"Error:no se guardo"});
        }else{
            if(equipo){
                res.status(200).send({message:"Exito: ",equipo});
            }else{
                res.status(500).send({ message:"Error:usu no existe"});
            }
        }
    });
}
function updateEquipo(req,res){
    var userId=req.params.id;
    var params=req.body;
    Equipo.findByIdAndUpdate(userId,params,(err,equiUpdated)=>{
        if(err){
            res.status(500).send({ message:"Error:no se guardo"});
        }else{
            if(equiUpdated){
                res.status(200).send({message:"Exito: Actualizado correctamente",equiUpdated});
            }else{
                res.status(500).send({ message:"Error:usu no existe"});
            }
        }
    });
}

module.exports = {
    deleteEquipo,
    guardarEquipo,
    getEquiposByUsu,
    getEquipos,
    getEquiposByNombre,
    getEquipoBySlug,
    getEquiposByComuna,
    getEquiposByRegion,
    updateEquipo,
    getEquipoById
};
