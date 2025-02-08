const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/mongoC');

// Ruta para el registro de usuarios
router.post('/registro', usuarioController.registrarUsuario);

// Ruta para el login de usuarios
router.post('/login', usuarioController.login);

module.exports = router;