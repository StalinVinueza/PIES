// server.js
const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');

const clienteRoutes = require('./route/clienteR.js');
const emprendimientoRoutes = require('./route/emprendimientoR.js');

// Carpeta pública para el frontend
app.use(express.static('client'));

// Permitir servir archivos estáticos desde "server/uploads"
app.use('/uploads', express.static('server/uploads'));

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


// Usar las rutas definidas
app.use('/api', clienteRoutes);

app.use('/api', emprendimientoRoutes);



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

