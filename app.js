/**
 * @author Maicol Felipe Duque Urrea <maicolduque01@gmail.com>
 */


'use strict'

//Cargar módulos de node para servidor
const express = require("express");
const bodyParser = require("body-parser");

//Ejecutar express (http)
const app = express();

//Cargar ficheros o rutas
const articleRoutes = require("./routes/article");


//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS - Permitir peticiones desde cualquier IP
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//Añadir prefijos a rutas / Cargar rutas
app.use("/api", articleRoutes);

//Exportar módulo (Fichero actual)
module.exports = app;