const Cliente = require('../model/mongoM'); // Asegúrate de tener este modelo

// Función para registrar cliente
exports.registro = async (req, res) => {
  try {
    const { es_cli_nombre, es_cli_apellido, es_cli_correo, es_cli_mongo, es_cli_genero, es_cli_fecha_nacimiento } = req.body;

    // Validar los campos obligatorios
    if (!es_cli_nombre || !es_cli_apellido || !es_cli_correo || !es_cli_mongo || !es_cli_genero || !es_cli_fecha_nacimiento) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Crear un nuevo cliente
    const nuevoCliente = new Cliente({
      es_cli_nombre,
      es_cli_apellido,
      es_cli_correo,
      es_cli_mongo,
      es_cli_genero,
      es_cli_fecha_nacimiento,
    });

    // Guardar el cliente en la base de datos
    await nuevoCliente.save();
    res.status(201).json({ message: 'Cliente registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el cliente', error });
  }
};

// Función para login de cliente
exports.login = async (req, res) => {
  try {
    const { es_cli_correo, es_cli_mongo } = req.body;

    // Validar los campos obligatorios
    if (!es_cli_correo || !es_cli_mongo) {
      return res.status(400).json({ message: 'Correo y Mongo ID son requeridos' });
    }

    // Buscar al cliente por correo
    const cliente = await Cliente.findOne({ es_cli_correo });

    // Verificar si el cliente existe
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Verificar si el ID de Mongo coincide
    if (cliente.es_cli_mongo !== es_cli_mongo) {
      return res.status(401).json({ message: 'ID Mongo incorrecto' });
    }

    // Respuesta exitosa
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el login', error });
  }
};
