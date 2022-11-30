const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const app=express();

//configuracion
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
//para unir frontend con backend

app.use(cors({
    credentials: true,
    ControlAllowCredentials:true,
    origin: process.env.CORS_ORIGIN || "http://localhost:3000"
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