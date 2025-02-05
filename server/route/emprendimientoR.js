const express = require('express');
const router = express.Router();
const emprendimientoController = require('../controller/emprendimientoC');
const upload = require('../middleware/upload');

router.get('/emprendimientos', emprendimientoController.getAllEmprendimientos);
router.get('/emprendimientos/:id', emprendimientoController.getEmprendimientoById);
router.post('/emprendimientos', upload.single('es_emp_logo'), emprendimientoController.createEmprendimiento);
router.put('/emprendimientos/:id', upload.single('es_emp_logo'), emprendimientoController.updateEmprendimiento);
router.delete('/emprendimientos/:id', emprendimientoController.deleteEmprendimiento);

module.exports = router;