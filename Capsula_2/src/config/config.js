const dotenv = require('dotenv');
dotenv.config();

// Exporta un objeto con la configuración para tres entornos:
// desarrollo, pruebas y producción. Utiliza variables de entorno para
// la configuración de la base de datos.
// reemplazamos los placeholders (root, null)
//el sufijo (_development, _test, _production) es una convención útil, pero no obligatoria.
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": `${process.env.DB_NAME}_development`,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": `${process.env.DB_NAME}_test`,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": `${process.env.DB_NAME}_production`,
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
