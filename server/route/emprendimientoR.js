const express = require('express');
const router = express.Router();
const emprendimientoController = require('../controller/emprendimientoC');
const upload = require('../middleware/upload'); // Importamos multer

// Obtener todos los emprendimientos
router.get('/emprendimientos', emprendimientoController.getAllEmprendimientos);

// Obtener un emprendimiento por ID
router.get('/emprendimientos/:id', emprendimientoController.getEmprendimientoById);

// Crear un emprendimiento con imagen
router.post('/emprendimientos', upload.single('es_emp_logo'), emprendimientoController.createEmprendimiento);

// Actualizar un emprendimiento con nueva imagen
router.put('/emprendimientos/:id', upload.single('es_emp_logo'), emprendimientoController.updateEmprendimiento);

// Eliminar un emprendimiento
router.delete('/emprendimientos/:id', emprendimientoController.deleteEmprendimiento);

module.exports = router;