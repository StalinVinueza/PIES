const ClienteModel = require('../model/clienteM');  // Importar el modelo de cliente

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
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
  const { nombre, apellido, correo, direccionId, perfilId } = req.body;
  try {
    const newCliente = await ClienteModel.createCliente({ nombre, apellido, correo, direccionId, perfilId });
    res.status(201).json(newCliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un cliente
const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, direccionId, perfilId } = req.body;
  try {
    const updatedCliente = await ClienteModel.updateCliente(id, { nombre, apellido, correo, direccionId, perfilId });
    if (!updatedCliente) {
      return res.status(404).json({ message: 'Cliente no encontrado para actualizar' });
    }
    res.status(200).json(updatedCliente);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCliente = await ClienteModel.deleteCliente(id);
    if (!deletedCliente) {
      return res.status(404).json({ message: 'Cliente no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
