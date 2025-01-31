// server.js
const express = require('express');
const app = express();
const PORT = 3001;

const poolPostgres = require('./dbconfig/dbconection.js');

const clienteRoutes = require('./route/clienteR.js');

// Carpeta pública para el frontend
app.use(express.static('client'));

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});


// Usar las rutas definidas
app.use( clienteRoutes)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});