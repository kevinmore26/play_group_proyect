require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); // Tu archivo de conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send(`Servidor corriendo en modo ${process.env.USE_DOCKER === 'true' ? 'Docker' : 'Local'}`);
});

// Ruta de productos
app.use('/api/productos', require('./routes/productos'));

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(
    `Conexión a la base de datos: ${process.env.USE_DOCKER === 'true' ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL}`
  );
});
