// import Packages
const express = require('express');
const app = express();
//Package For Log requests
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const cholesterolRoutes = require('./api/routes/cholesterol')
const diabetesRoutes = require('./api/routes/diabetes')
const bloodpressureRoutes = require('./api/routes/bloodpressure')
const userRoutes = require('./api/routes/user');



mongoose.connect('mongodb://arunoda:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-eet2v.mongodb.net:27017,cluster0-shard-00-01-eet2v.mongodb.net:27017,cluster0-shard-00-02-eet2v.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header','Origin,X-Requested-With,Content-Type,Accept,Authorization');

    if(req.method === 'OPTIONS'){

        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});

    }
    next();
});

//Routes which should handle request
app.use('/cholesterol',cholesterolRoutes);
app.use('/diabetes',diabetesRoutes);
app.use('/bloodpressure',bloodpressureRoutes);
app.use('/user',userRoutes);

//Midddleware for Error Handling 
app.use((req,res,next)=>{

const error = new Error('NOT FOUND');
error.status = 404
next(error);

});

app.use((error,req,res,next) =>{
   res.status(error.status || 500); 
    res.json({

        error:{
            message: error.message
        }
 
    });
});

module.exports = app;