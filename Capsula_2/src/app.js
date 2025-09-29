require("dotenv").config();
const express = require("express");
const orm = require("./models");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middlewares

app.use(cors());

app.use(express.json()); 
app.use(morgan("dev"));

app.use((req, _res, next) => {
  req.orm = orm;
  next();
});

// Importar rutas
const authRouter = require('./routes/authentication')(orm);
const usersRouter = require('./routes/users')(orm);
const tasksRouter = require('./routes/tasks')(orm);

// Usar rutas
app.use('/api/auth', authRouter);

app.use('/api/users', usersRouter);

const requireAuth = require('./middlewares/requireAuth');
app.use('/api/tasks', requireAuth, tasksRouter);

const NOMBRE = process.env.NOMBRE || "Taskify";

app.get('/', (req, res) => {
    res.send(`<h1>Hola ${NOMBRE}</h1>`)
});

module.exports = app;