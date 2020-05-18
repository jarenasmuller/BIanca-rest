'use strict'

var express=require('express');
var bodyParser=require('body-parser');

var app=express();

var userRoute=require('./routes/userRoutes');
var torneoRoute=require('./routes/torneoRoute');
var equipoRoute=require('./routes/equipoRoute.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cabeceras
app.use((req,res,next)=>{
    /*res.header('Access-Control-Allow-Origins','*');
    res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Method','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');*/
   /* res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Method','GET,POST,OPTIONS,PUT,DELETE');
    next();*/
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//rutas
app.use('/api',userRoute);
app.use('/api',torneoRoute);
app.use('/api',equipoRoute);
app.get('/',function(req,res){
    res.status(200).send({message:"funciona"})
});
module.exports=app;