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
  const { ES_EMP_NOMBRE, ES_EMP_DESCRIPCION } = req.body;
  const ES_EMP_LOGO = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const newEmprendimiento = await EmprendimientoModel.createEmprendimiento({
      nombre: ES_EMP_NOMBRE,
      descripcion: ES_EMP_DESCRIPCION,
      logo: ES_EMP_LOGO
    });
    res.status(201).json(newEmprendimiento);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el emprendimiento: ' + err.message });
  }
};

// Actualizar un emprendimiento con imagen
const updateEmprendimiento = async (req, res) => {
  const { id } = req.params;
  const { ES_EMP_NOMBRE, ES_EMP_DESCRIPCION } = req.body;
  const ES_EMP_LOGO = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const updatedEmprendimiento = await EmprendimientoModel.updateEmprendimiento(id, {
      nombre: ES_EMP_NOMBRE,
      descripcion: ES_EMP_DESCRIPCION,
      logo: ES_EMP_LOGO
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
  const { id } = req.params; // Obtener el ID de la URL
  try {
    console.log("Eliminando emprendimiento con ID:", id); // 🛠️ Debugging

    // Validar que el ID es un número
    if (isNaN(id)) {
      return res.status(400).json({ message: "El ID proporcionado no es válido." });
    }

    const result = await EmprendimientoModel.deleteEmprendimiento(id);
    if (!result) {
      return res.status(404).json({ message: "Emprendimiento no encontrado" });
    }

    res.status(200).json({ message: "Emprendimiento eliminado con éxito" });
  } catch (err) {
    console.error("Error en deleteEmprendimiento:", err);
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
