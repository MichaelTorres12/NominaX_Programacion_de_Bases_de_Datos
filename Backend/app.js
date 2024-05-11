// Importar módulos necesarios
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Crear una aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // para parsear application/json
app.use(express.urlencoded({ extended: true })); // para parsear application/x-www-form-urlencoded

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de NominaX!');
});

// Definir el puerto y poner el servidor a escuchar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
