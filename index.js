'use strict'

var mongoose =require('mongoose');
var app=require('./app');
var port=process.env.PORT||3490;
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://manu:g0nd0r@ds119692.mlab.com:19692/bianca_dev',{ useNewUrlParser: true },(err,res)=>{
//mongoose.connect('mongodb://localhost:27017/bianca',{ useNewUrlParser: true },(err,res)=>{
    if(err){
       console.log(err) ;
    }else{
        console.log('conecto ok');
        app.listen(port,function(){
            console.log("server corriendo puerto:"+port);
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`Usa cerca de ${used} MB`);
        })
    }
})