# 📌 IIC2513 - Taskify Backend

## 💻 Cápsula 2: Introducción a Express

### 📖 Resumen
La **Cápsula 2** es la introducción a **Express**, un framework rápido y minimalista para crear aplicaciones backend en Node.js.  

Un **backend** es la parte de una aplicación que procesa peticiones (requests) desde el frontend y devuelve respuestas (responses), generalmente con información o resultados.  

En Express, además de definir rutas, podemos usar **middlewares**, que son funciones que se ejecutan entre el request y la response para realizar tareas como autenticación, logging o manejo de errores.

---

## ⚙️ Requisitos previos
Antes de comenzar, asegúrate de tener instalado en tu entorno (ej. **WSL** si usas Windows):

- [Node.js](https://nodejs.org/)  
- [Yarn](https://yarnpkg.com/)  

---

## 📦 Instalación del proyecto
1. Inicializar un proyecto Node.js:  
   ```bash
   yarn init -y

2. Instalar dependencias principales:

```bash
yarn add express
yarn add morgan       # Middleware para mostrar logs de requests
yarn add dotenv       # Manejo de variables de entorno
```

3. Instalar dependencias de desarrollo:

```bash
yarn add -D nodemon   # Reinicia el servidor automáticamente en cambios
```

4. Crear la carpeta principal:
```bash
src/
└── index.js
```

---
## 📜 Scripts de ejecución

En tu archivo package.json, agrega los siguientes scripts:
``` bash
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```


- yarn start: inicia el servidor con Node.js.

- yarn dev: inicia el servidor con Nodemon (reinicia automáticamente al detectar cambios).

---
## 🚀 Creando tu primer servidor con Express

En src/index.js:
```bash
const express = require("express");
const app = express();

// Middleware de logging (ejemplo opcional)
const morgan = require("morgan");
app.use(morgan("dev")); // aquí se utiliza use para que pase obligatoriamente por ahí una vez se recibe el mensaje

// Ruta principal
app.get("/", (req, res) => {
  res.send("<h1>Hola mundo</h1>");
});

// Levantar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
```
---
## 🔑 Uso de variables de entorno

Para mantener credenciales seguras (ej: contraseñas, llaves de API, etc.), se utiliza un archivo .env.

En primer lugar, se debe instalar dotenv en consola:
```bash
yarn add dotenv
```

Luego, crear un archivo .env dentro de la raíz del proyecto (no dentro de src):
```bash
NOMBRE=Ignacio
```

Después se deberá modificar src/index.js:
```bash
require("dotenv").config();

const express = require("express");
const app = express();

const NOMBRE = process.env.NOMBRE;

app.get("/", (req, res) => {
  res.send(`<h1>Hola ${NOMBRE}</h1>`);
});

app.listen(3000, () => {
  console.log(`Servidor corriendo con ${NOMBRE} en el puerto 3000`);
});
```
---
## 📄 Buenas prácticas

- Siempre incluir .env y node_modules en .gitignore.

- Mantener src/ como la carpeta de código fuente.

- Usar middlewares para modularizar funcionalidades (ej: morgan, autenticación, validaciones).

Ejemplo de ***.gitignore***:
```
node_modules/
.env
```

## 💻 Cápsula 3: Sequelize

Se integró Sequelize al proyecto.

### Comandos útiles

### 📦 Comando: `yarn sequelize db:create`

Este comando crea la base de datos definida en tu archivo `config/config.js` (según el entorno especificado, por defecto `development`).  

- **¿Qué hace?**  
  Ejecuta internamente la instrucción SQL `CREATE DATABASE` en tu motor (por ejemplo, PostgreSQL).  
  Si la base ya existe, mostrará un error.

- **¿Cuándo usarlo?**  
  - La primera vez que configuras tu proyecto.  
  - Cuando inicias un nuevo entorno (ej: en otra máquina o servidor).  
  - Después de haber borrado la base de datos y necesitar recrearla.
 
  ```bash
  yarn sequelize db:create
  ```
  ### 📦 Comando: `yarn sequelize db:migrate`

Este comando ejecuta todas las **migraciones pendientes** definidas en la carpeta `migrations/`.  

- **¿Qué hace?**  
  Traduce tus archivos de migración a sentencias SQL (`CREATE TABLE`, `ALTER TABLE`, etc.) y las aplica a la base de datos.  
  Lleva un registro en la tabla `SequelizeMeta` para saber qué migraciones ya se ejecutaron.  

- **¿Cuándo usarlo?**  
  - Después de crear la base de datos (`db:create`).  
  - Cada vez que agregas o modificas un modelo y generas nuevas migraciones.  
  - Para mantener sincronizada la estructura de la base en todos los entornos.  

```bash
yarn sequelize db:migrate
```

---

### 📦 Comando: `yarn sequelize db:seed:all`

Este comando ejecuta todos los **seeders** definidos en la carpeta `seeders/`.  

- **¿Qué hace?**  
  Inserta datos iniciales o de prueba en tus tablas (usuarios de demo, tareas de ejemplo, etc.).  
  Usa internamente `bulkInsert` para poblar los registros.  

- **¿Cuándo usarlo?**  
  - Para poblar la base de datos la primera vez que la levantas.  
  - Cuando necesitas cargar datos de prueba en desarrollo.  
  - Para dejar listas tablas con configuraciones base (roles, estados, etc.).  

```bash
yarn sequelize db:seed:all
```


