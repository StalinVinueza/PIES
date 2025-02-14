// server.js
const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { registro, login } = require('./controller/authC');
require('dotenv').config(); 
const { verificarToken, verificarRol } = require('./middleware/authMiddleware');
const { enviarCorreo } = require('./mailService'); // Importar el servicio de correo

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

// Rutas API de usuarios
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

// Imágenes
app.use('/uploads', express.static(path.join(__dirname, 'middleware/uploads')));

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});

// Ruta de contacto
app.post('/api/contacto', async (req, res) => {
  const { nombre, email, celular, mensaje } = req.body;
  if (!nombre || !email || !celular || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validación de celular (debe tener 10 dígitos)
  const celularRegex = /^[0-9]{10}$/;
  if (!celularRegex.test(celular)) {
    return res.status(400).json({ error: 'El número de celular debe ser válido (10 dígitos)' });
  }

  try {
    // Llamamos al servicio de correo para enviar el mensaje
    const info = await enviarCorreo(nombre, email, celular, mensaje);
    console.log('Correo enviado: ' + info.response);
    res.status(200).json({ success: 'Mensaje recibido correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
