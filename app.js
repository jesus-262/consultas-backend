const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const {port, cors_origin} = require('./config');
console.log("NO")
const app=express();

//configuracion
app.set('port', port);
app.use(morgan('dev'));
//para unir frontend con backend

app.use(cors({
    credentials: true,
    ControlAllowCredentials:true,
    origin:cors_origin
  }));
//midelware
//saber si es post o get en la peticion


//solo formatos de string
app.use(express.urlencoded({extended:false}));
//solo formatos json
app.use(express.json());

//routes

app.use('/roles',require('./routes/roles'));
app.use('/api',require('./routes/consulta'));
app.use('/api',require('./routes/datos'));
module.exports =app;