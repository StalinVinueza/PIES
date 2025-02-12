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
// middleware/authMiddleware.js

const verificarPermisos = (req, res, next) => {
  const usuario = req.usuario; // Asume que el usuario está disponible en el request (por ejemplo, después de autenticación)
  const { empId } = req.params; // Obtén el ID del emprendimiento desde la URL

  // Verifica si el usuario tiene permisos para modificar este emprendimiento
  if (usuario.perfilId === 1 || (usuario.perfilId === 4 && usuario.id === empId)) {
    next(); // Permite continuar con la solicitud
  } else {
    res.status(403).json({ error: "No tienes permisos para realizar esta acción" });
  }
};

module.exports = verificarPermisos;