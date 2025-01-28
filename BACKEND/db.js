require('dotenv').config();
const { Pool } = require('pg');

const dbConfig = {
  host: process.env.USE_DOCKER === 'true' ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Conexión exitosa a la base de datos:', dbConfig.host);
});

pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err.message || err);
});

module.exports = pool;
