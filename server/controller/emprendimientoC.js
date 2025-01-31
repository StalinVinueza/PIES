const emprendimientoModel = require('../model/emprendimientoM.js'); // Asegúrate de que el nombre sea correcto

// Obtener todos los emprendimientos
const getAllEmprendimientos = async (req, res) => {
  try {
    const emprendimientos = await emprendimientoModel.getAllEmprendimientos();
    res.status(200).json(emprendimientos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un emprendimiento por ID
const getEmprendimientoById = async (req, res) => {
  const { id } = req.params;
  try {
    const emprendimiento = await emprendimientoModel.getEmprendimientoById(id);
    if (!emprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.status(200).json(emprendimiento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo emprendimiento
const createEmprendimiento = async (req, res) => {
  const { nombre, descripcion, logo } = req.body; // Ajustado a los campos de la tabla
  try {
    const newEmprendimiento = await emprendimientoModel.createEmprendimiento({
      nombre, descripcion, logo
    });
    res.status(201).json(newEmprendimiento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un emprendimiento
const updateEmprendimiento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, logo } = req.body;
  try {
    const updatedEmprendimiento = await emprendimientoModel.updateEmprendimiento(id, {
      nombre, descripcion, logo
    });
    if (!updatedEmprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado para actualizar' });
    }
    res.status(200).json(updatedEmprendimiento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un emprendimiento
const deleteEmprendimiento = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmprendimiento = await emprendimientoModel.deleteEmprendimiento(id);
    if (!deletedEmprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Emprendimiento eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllEmprendimientos,
  getEmprendimientoById,
  createEmprendimiento,
  updateEmprendimiento,
  deleteEmprendimiento
};
