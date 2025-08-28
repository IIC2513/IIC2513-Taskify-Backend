require("dotenv").config();
const express = require("express");
const orm = require("./models"); // importa la instancia de Sequelize con los modelos

const app = express();

// Middlewares

// para parsear JSON en el body de las requests
app.use(express.json()); 

// Middleware para agregar la instancia de Sequelize (orm) a cada request
// Luego, en cualquier ruta podremos acceder a la BD
app.use((req, _res, next) => {
  req.orm = orm; // agrega la instancia de Sequelize a cada request
  next();
});

const NOMBRE = process.env.NOMBRE || "Taskify";

// Define la ruta principal ("/"), que responde con un saludo en localhost:3000/
app.get('/', (req, res) => {
    res.send(`<h1>Hola ${NOMBRE}</h1>`)
});

// Exporta la app para usarla en otros archivos, luego haremos un index.js
// que levante el servidor (app.listen + conexión a la BD)
module.exports = app;