const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, "tu_secreto_jwt"); // Reemplaza "tu_secreto_jwt" con tu clave secreta
    req.user = decoded; // Añade el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};

module.exports = authenticateUser;