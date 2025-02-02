const emprendimientoModel = require('../model/emprendimientoM.js'); // Asegúrate de que el nombre del archivo sea correcto

// Obtener todos los emprendimientos
const getAllEmprendimientos = async (req, res) => {
  try {
    const emprendimientos = await emprendimientoModel.getAllEmprendimientos();
    res.status(200).json(emprendimientos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los emprendimientos: ' + err.message });
  }
};

// Obtener un emprendimiento por ID
const getEmprendimientoById = async (req, res) => {
  const { id } = req.params;
  try {
    const emprendimiento = await emprendimientoModel.getEmprendimientobyId(id); // Corregido nombre de función
    if (!emprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.status(200).json(emprendimiento);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el emprendimiento: ' + err.message });
  }
};

// Crear un nuevo emprendimiento
const createEmprendimiento = async (req, res) => {
  const { nombre, descripcion, logo } = req.body;

  // Validación de campos requeridos
  if (!nombre || !descripcion || !logo) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const newEmprendimiento = await emprendimientoModel.createEmprendimiento({
      nombre, descripcion, logo
    });
    res.status(201).json(newEmprendimiento);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el emprendimiento: ' + err.message });
  }
};

// Actualizar un emprendimiento
const updateEmprendimiento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, logo } = req.body;

  if (!nombre || !descripcion || !logo) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios para actualizar' });
  }

  try {
    const updatedEmprendimiento = await emprendimientoModel.updateEmprendimiento(id, {
      nombre, descripcion, logo
    });

    if (!updatedEmprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado para actualizar' });
    }
    res.status(200).json(updatedEmprendimiento);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el emprendimiento: ' + err.message });
  }
};

// Eliminar un emprendimiento
const deleteEmprendimiento = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await emprendimientoModel.deleteEmprendimiento(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Emprendimiento eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el emprendimiento: ' + err.message });
  }
};

module.exports = {
  getAllEmprendimientos,
  getEmprendimientoById,
  createEmprendimiento,
  updateEmprendimiento,
  deleteEmprendimiento
};
