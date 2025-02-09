const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar el token JWT
exports.verificarToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Añadir el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

// Middleware para verificar el rol del usuario
exports.verificarRol = (rolesPermitidos) => (req, res, next) => {
  const { perfilId } = req.usuario; // Obtener el perfil ID del token decodificado

  if (!rolesPermitidos.includes(perfilId)) {
    return res.status(403).json({ message: 'Acceso denegado. No tienes los permisos necesarios.' });
  }

  next();
};