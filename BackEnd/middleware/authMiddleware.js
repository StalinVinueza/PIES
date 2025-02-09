const jwt = require('jsonwebtoken');
const pool = require('../dbconfig/dbconection');  // Asegúrate de que el pool esté configurado correctamente

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Obtener el perfil del usuario
    try {
      const query = 'SELECT ES_CLI_PERFIL_ID FROM ES_CLIENTE WHERE ES_CLI_ID = $1';
      const result = await pool.query(query, [decoded.id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      req.user = decoded;  // Almacenar información del usuario en la solicitud
      req.perfilId = result.rows[0].es_cli_perfil_id;  // Almacenar el perfil

      next();  // Continuar con la solicitud
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al verificar el perfil' });
    }
  });
};

const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.perfilId)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();  // Continuar con la solicitud si tiene el rol adecuado
  };
};

module.exports = { verificarToken, verificarRol };
