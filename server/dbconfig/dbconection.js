// dbconfig.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuración de la conexión
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST_PG,
  port: process.env.DB_PORT_PG,
  username: process.env.DB_USER_PG,
  password: process.env.DB_PASSWORD_PG,
  database: process.env.DB_NAME_PG,
});

// Verificar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos PostgreSQL de ECO SHOP :V');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;
