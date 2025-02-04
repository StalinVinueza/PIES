const ClienteModel = require('../model/clienteM');

// Obtener todos los clientes
const getAllClientes = async (req, res) => {
  try {
    const clientes = await ClienteModel.getAllClientes();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un cliente por ID
const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await ClienteModel.getClienteById(id);
    res.status(200).json(cliente);
  } catch (err) {
    // Capturamos el error lanzado por el modelo (Cliente no encontrado)
    res.status(404).json({ message: err.message });
  }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
  const {
    ES_CLI_NOMBRE,
    ES_CLI_APELLIDO,
    ES_CLI_PERFIL_ID,
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
  } = req.body; // Extraer todos los datos del cuerpo de la solicitud

  try {
    // Llamar a la función de creación del cliente, pasando los datos recibidos
    const newCliente = await ClienteModel.createCliente({
      ES_CLI_NOMBRE,
      ES_CLI_APELLIDO,
      ES_CLI_PERFIL_ID,
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
    });

    // Responder con el ID del nuevo cliente creado
    res.status(201).json({ ES_CLI_ID: newCliente });
  } catch (err) {
    // En caso de error, responder con un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un cliente existente
const updateCliente = async (req, res) => {
  const { ES_CLI_ID } = req.body; // Aseguramos que el ID venga en el cuerpo de la solicitud

  if (!ES_CLI_ID) {
    return res.status(400).json({ message: 'El ID del cliente es necesario' });
  }

  const {
    ES_CLI_NOMBRE,
    ES_CLI_APELLIDO,
    ES_CLI_PERFIL_ID,
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
  } = req.body; // Extraer todos los datos del cuerpo de la solicitud

  try {
    // Verificar si el cliente existe
    const existingCliente = await ClienteModel.getClienteById(ES_CLI_ID);
    if (!existingCliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Preparar los datos actualizados (no incluir el ID ya que se pasa en la URL)
    const updatedData = {
      ES_CLI_NOMBRE,
      ES_CLI_APELLIDO,
      ES_CLI_PERFIL_ID,
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
    };

    // Llamar a la función de actualización del cliente
    const updatedCliente = await ClienteModel.updateCliente(ES_CLI_ID, updatedData);

    // Responder con el cliente actualizado
    res.status(200).json({
      message: 'Cliente actualizado con éxito',
      updatedCliente
    });
  } catch (err) {
    // En caso de error, responder con un mensaje de error
    res.status(500).json({ message: err.message });
  }
};



// Eliminar un cliente
const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCliente = await ClienteModel.deleteCliente(id);
    res.status(200).json({ message: 'Cliente eliminado', ES_CLI_ID: deletedCliente });
  } catch (err) {
    // Capturamos el error lanzado por el modelo (Cliente no encontrado para eliminar)
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
