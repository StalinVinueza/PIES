require('dotenv').config();

const { Pool } = require('pg');

const poolPostgres = new Pool({
  user: process.env.DB_USER_PG,   
  host: process.env.DB_HOST_PG,
  database: process.env.DB_NAME_PG,
  password: process.env.DB_PASSWORD_PG, 
  port: process.env.DB_PORT_PG,
});

// Verificar la conexión a PostgreSQL
poolPostgres.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar a la base de datos PostgreSQL:', err.stack);
  } else {
    console.log('Conectado a la base de datos PostgreSQL de ECO SHOP :V');
  }
  release();
});

// Exportar el pool para usarlo en otros archivos
module.exports = poolPostgres;

// (async () => {
//     try {
//       const queryText = 'SELECT * FROM ES_CATEGORIA'; // Consulta SQL
//       const res = await poolPostgres.query(queryText); // Ejecuta la consulta
//       console.log('Registros encontrados:', res.rows); // Muestra los datos
//     } catch (err) {
//       console.error('Error ejecutando la consulta:', err.stack);
//     } finally {
//       await poolPostgres.end(); // Finaliza la conexión
//     }
//   })();