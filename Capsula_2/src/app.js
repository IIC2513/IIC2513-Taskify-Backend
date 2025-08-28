require("dotenv").config();
const express = require("express");
const orm = require("./models");

const app = express();

// Middlewares

app.use(express.json()); 

app.use((req, _res, next) => {
  req.orm = orm;
  next();
});

const NOMBRE = process.env.NOMBRE || "Taskify";

app.get('/', (req, res) => {
    res.send(`<h1>Hola ${NOMBRE}</h1>`)
});

module.exports = app;