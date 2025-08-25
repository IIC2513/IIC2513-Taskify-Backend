require("dotenv").config();
const express = require("express");
const app = express();

const NOMBRE = process.env.NOMBRE;

app.get('/', (req, res) => {
    res.send(`<h1>Hola ${NOMBRE}</h1>`)
});


app.listen(3000, () => {
    console.log(`Servidor corriendo ${NOMBRE}`)
});
