// server.js
const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { registro, login } = require('./controller/mongoC'); 
const { registro, login } = require('./controller/authC');
require('dotenv').config(); 

// Conectar a MongoDB Local
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};


// Conectar a MongoDB
connectMongo();


// Middleware
app.use(express.static('client')); 
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// // Rutas API de usuarios
// app.post('/api/usuarios/registro', registro);  // Registro
// app.post('/api/usuarios/login', login);  // Login


app.post('/api/auth/registro', registro);
app.post('/api/auth/login', login);


// Otras rutas
const clienteRoutes = require('./route/clienteR.js');
const emprendimientoRoutes = require('./route/emprendimientoR.js');
const productoRoutes = require('./route/productoR.js');
const compraRoutes = require('./route/carritoR');

app.use('/api', clienteRoutes);
app.use('/api', emprendimientoRoutes);
app.use('/api', productoRoutes);
app.use('/api', compraRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
