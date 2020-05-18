'use strict'
var Torneo=require('../models/torneo');


function getTorneoByUsu(req,res){
    let params=req.body;
    let id=params.usu;
    console.log(params.usu);
    Torneo.find({'dueno':id}).sort({creado:'desc'}).exec(function(err,torneos){
        if(err){
            res.status(500).send({message:"error buscar por id : "+id });
        }else{
            res.status(200).send({torneos});
        }
    });
}
function getTorneos(req,res){
    Torneo.find({},(err,torneos)=>{
        if(err){
            res.status(500).send({message:"error, no encontro ligas"});
        }else{
            res.status(200).send({torneos});
        }
    });
}
function getTorneosByRegion(req,res){
    var region=req.params.region;
    Torneo.find({'region':region}).sort({creado:'desc'}).exec(function(err,torneos){
        if(err){
            res.status(500).send({message:"error buscar por region : "+region });
        }else{
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`The script uses approximately ${used} MB`);
            res.status(200).send({torneos});
        }
    });
}
function getTorneosByComuna(req,res){
    var comuna=req.params.comuna;
    console.log(comuna);
    Torneo.find({'comuna':comuna}).sort({creado:'desc'}).exec(function(err,torneos){
        if(err){
            res.status(500).send({message:"error buscar por comuna : "+comuna });
        }else{
            res.status(200).send({torneos});
        }
    });
}
function getTorneoBySlug(req,res){
    var slug=req.params.slug;
    Torneo.findOne({'slug':slug}).exec(function(err,torneo){
        if(err){
            res.status(500).send({message:"error buscar por slug : "+slug });
        }else{
            res.status(200).send({torneo});
        }
    });
}
function getTorneoById(req,res){
    var id=req.params.id;
    Torneo.findOne({'_id':id}).exec(function(err,torneo){
        if(err){
            res.status(500).send({message:"error buscar por slug : "+id });
        }else{
            res.status(200).send({torneo});
        }
    });
}
function guardarTorneo(req,res){
    let torneo=new Torneo();
    let params=req.body;
    console.log(params);
    torneo.nombre=params.nombre;
    torneo.cantidadEquipo=params.cantidadEquipo;
    torneo.fechas=params.fechas;
    torneo.idaVuelta=params.idaVuelta;
    torneo.punto=params.punto;
    torneo.ubicacion=params.ubicacion;
    torneo.dueno=params.dueno;
    torneo.equipos=[];
    torneo.fixture=[];
    torneo.fixVuelta=[];
    torneo.imgDefault=params.imgDefault;
    torneo.tipoTorneo=params.tipoTorneo;
    torneo.fechaInicio=params.fechaInicio;
    torneo.tipoDeporte=params.tipoDeporte;
    let numMin=params.tipoDeporte.split(" ");
    console.log(numMin[1]);
    torneo.minJugador=numMin[1];
    torneo.maxJugador=torneo.minJugador*2+1;
   /*
   let cont=1;
    while(cont<=torneo.cantidadEquipo){
        let equipo={
            nombre:"EquiZenGenDefBianBackEnd "+cont, 
            fechaCreacion:new Date(Date.now()),
            imgDefecto:"assets/img/circuloGris.png",
            inLiga:false
        };
        //equipo.nombre="equipo "+cont;
       // equipo.fechaCreacion=new Date(Date.now());
        torneo.equipos.push(equipo);
        cont++;
    }*/
    torneo.region=params.region;
    torneo.comuna=params.comuna;
    torneo.slug=torneo.nombre.split(" ").join("-");
    torneo.creado=new Date(Date.now());
    if(torneo.nombre != null){
        torneo.save((err,torStored)=>{
            if(err){
                res.status(500).send({ message:"error:no se guardo"});
            }else{
                if(torStored){
                    res.status(200).send({ message:"Exito:Se creo Liga exitosamente",torStored});
                }else{
                    res.status(500).send({ message:"error:torneo no existe"});
                }
            }
        });
    }else{
        res.status(200).send({message:"verifica tus datos"});
   }
   const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`The script uses approximately ${used} MB`);
}
function updateTorneo(req,res){
    var ligaId=req.params.id;
    var params=req.body;
    Torneo.findByIdAndUpdate(ligaId,params,{new: true},(err,torUpdated)=>{
        if(err){
            res.status(500).send({ message:"Error"})
        }else{
            if(!torUpdated){
                res.status(404).send({ message:"Error: No se pudo actualizar"})
            }else{//console.log(userUpdated)
                console.log(torUpdated)
                res.status(200).send({message:"Exito: Actualizado correctamente",params,torUpdated});
            }
        }
    });
}
function deleteTorneo(req,res){
    let ligaId=req.params.id;
    Torneo.findByIdAndRemove(ligaId,(err,torUpdated)=>{
        if(err){
            res.status(500).send({ message:"Error"})
        }else{
            if(!torUpdated){
                res.status(404).send({ message:"Error: No se pudo eliminar"})
            }else{//console.log(userUpdated)
                console.log(torUpdated)
                res.status(200).send({message:"Exito: eliminado correctamente",torUpdated});
            }
        }
    });
}
module.exports = {
    guardarTorneo,
    getTorneoByUsu,
    getTorneos,
    getTorneoBySlug,
    getTorneosByComuna,
    getTorneosByRegion,
    getTorneoById,
    updateTorneo,
    deleteTorneo
};
