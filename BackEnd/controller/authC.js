const pool = require('../dbconfig/dbconection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registro de usuario
exports.registro = async (req, res) => {
  try {
    const {
      ES_CLI_NOMBRE,
      ES_CLI_APELLIDO,
      ES_CLI_CORREO,
      ES_CLI_GENERO,
      ES_CLI_FECHA_NACIMIENTO,
      ES_CLI_DIRECCION,
      ES_CLI_PAIS,
      ES_CLI_PROVINCIA,
      ES_CLI_CIUDAD,
      ES_CLI_CODIGO_POSTAL,
      ES_CLI_TELEFONO_1,
      ES_CLI_TELEFONO_2
    } = req.body;

    // Validar datos
    if (!ES_CLI_NOMBRE || !ES_CLI_APELLIDO || !ES_CLI_CORREO || !ES_CLI_GENERO || !ES_CLI_FECHA_NACIMIENTO) {
      return res.status(400).json({ message: 'Campos obligatorios faltantes' });
    }

    // Generar contraseña encriptada
    const contrasena = req.body.contrasena;
    if (!contrasena) {
      return res.status(400).json({ message: 'Se requiere una contraseña' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashContrasena = await bcrypt.hash(contrasena, salt);

    // Insertar usuario en PostgreSQL
    const query = `
      INSERT INTO ES_CLIENTE (
        ES_CLI_NOMBRE, ES_CLI_APELLIDO, ES_CLI_CORREO, ES_CLI_MONGO, 
        ES_CLI_GENERO, ES_CLI_FECHA_NACIMIENTO, ES_CLI_DIRECCION, 
        ES_CLI_PAIS, ES_CLI_PROVINCIA, ES_CLI_CIUDAD, 
        ES_CLI_CODIGO_POSTAL, ES_CLI_TELEFONO_1, ES_CLI_TELEFONO_2
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      RETURNING ES_CLI_ID`;

    const values = [
      ES_CLI_NOMBRE, ES_CLI_APELLIDO, ES_CLI_CORREO, hashContrasena,
      ES_CLI_GENERO, ES_CLI_FECHA_NACIMIENTO, ES_CLI_DIRECCION,
      ES_CLI_PAIS, ES_CLI_PROVINCIA, ES_CLI_CIUDAD,
      ES_CLI_CODIGO_POSTAL, ES_CLI_TELEFONO_1, ES_CLI_TELEFONO_2
    ];

    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuarioId: result.rows[0].es_cli_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el registro', error });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { ES_CLI_CORREO, contrasena } = req.body;

    if (!ES_CLI_CORREO || !contrasena) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    // Buscar usuario en PostgreSQL
    const query = 'SELECT * FROM ES_CLIENTE WHERE ES_CLI_CORREO = $1';
    const result = await pool.query(query, [ES_CLI_CORREO]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = result.rows[0];

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(contrasena, usuario.es_cli_mongo);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar Token JWT

    
    const token = jwt.sign({ id: usuario.es_cli_id, correo: usuario.es_cli_correo }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.es_cli_id,
        nombre: usuario.es_cli_nombre,
        apellido: usuario.es_cli_apellido,
        correo: usuario.es_cli_correo,
        genero: usuario.es_cli_genero,
        fechaNacimiento: usuario.es_cli_fecha_nacimiento,
        direccion: usuario.es_cli_direccion,
        pais: usuario.es_cli_pais,
        provincia: usuario.es_cli_provincia,
        ciudad: usuario.es_cli_ciudad,
        codigoPostal: usuario.es_cli_codigo_postal,
        telefono1: usuario.es_cli_telefono_1,
        telefono2: usuario.es_cli_telefono_2
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el login', error });
  }
};
