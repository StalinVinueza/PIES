const EmprendimientoModel = require('../model/emprendimientoM');

// Obtener todos los emprendimientos
const getAllEmprendimientos = async (req, res) => {
  try {
    const emprendimientos = await EmprendimientoModel.getAllEmprendimientos();
    res.status(200).json(emprendimientos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los emprendimientos: ' + err.message });
  }
};

// Obtener un emprendimiento por ID
const getEmprendimientoById = async (req, res) => {
  const { id } = req.params;
  try {
    const emprendimiento = await EmprendimientoModel.getEmprendimientobyId(id);
    if (!emprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.status(200).json(emprendimiento);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el emprendimiento: ' + err.message });
  }
};

// Crear un nuevo emprendimiento con imagen
const createEmprendimiento = async (req, res) => {
  try {
    const { es_emp_nombre, es_emp_descripcion } = req.body;
    const es_emp_logo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!es_emp_nombre || !es_emp_descripcion || !es_emp_logo) {
      return res.status(400).json({ message: "Todos los campos son obligatorios, incluyendo la imagen" });
    }

    const newEmprendimiento = await EmprendimientoModel.createEmprendimiento({
      nombre: es_emp_nombre,
      descripcion: es_emp_descripcion,
      logo: es_emp_logo
    });

    res.status(201).json(newEmprendimiento);
  } catch (err) {
    res.status(500).json({ message: "Error al crear el emprendimiento: " + err.message });
  }
};

// Actualizar un emprendimiento con imagen
const updateEmprendimiento = async (req, res) => {
  const { id } = req.params;
  const { es_emp_nombre, es_emp_descripcion } = req.body;
  const es_emp_logo = req.file ? `/uploads/${req.file.filename}` : req.body.es_emp_logo;

  if (!id || !es_emp_nombre || !es_emp_descripcion) {
    return res.status(400).json({ message: 'Faltan datos para actualizar el emprendimiento' });
  }

  try {
    const updatedEmprendimiento = await EmprendimientoModel.updateEmprendimiento(id, {
      nombre: es_emp_nombre,
      descripcion: es_emp_descripcion,
      logo: es_emp_logo
    });

    if (!updatedEmprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
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
    const result = await EmprendimientoModel.deleteEmprendimiento(id);
    if (!result) {
      return res.status(404).json({ message: "Emprendimiento no encontrado" });
    }

    res.status(200).json({ message: "Emprendimiento eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el emprendimiento: " + err.message });
  }
};

module.exports = {
  getAllEmprendimientos,
  getEmprendimientoById,
  createEmprendimiento,
  updateEmprendimiento,
  deleteEmprendimiento
};
