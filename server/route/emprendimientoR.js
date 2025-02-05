const express = require('express');
const router = express.Router();
const emprendimientoController = require('../controller/emprendimientoC');

// Definir las rutas
router.get('/emprendimientos', emprendimientoController.getAllEmprendimientos);
router.get('/emprendimientos/:id', emprendimientoController.getEmprendimientoById);
router.post('/emprendimientos', emprendimientoController.createEmprendimiento);
router.put('/emprendimientos/:id', emprendimientoController.updateEmprendimiento);
router.delete('/emprendimientos/:id', emprendimientoController.deleteEmprendimiento);


module.exports = router;
