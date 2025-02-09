const express = require('express');
const router = express.Router();
const { verificarToken, verificarRol } = require('../middleware/authMiddleware');
const clienteController = require('../controller/mongoC');

// Rutas protegidas por roles
// Solo ADMIN puede ver todas las pestañas
router.get('/admin/pestañas', verificarToken, verificarRol([1]), clienteController.verTodasLasPestanas);

// CLIENTE_STD puede ver productos, carrito, y emprendimiento
router.get('/productos', verificarToken, verificarRol([3, 1]), clienteController.verProductos);

// CLIENTE_STD solo puede ver emprendimiento
router.get('/emprendimiento', verificarToken, verificarRol([3, 1]), clienteController.verEmprendimiento);

// VENDEDOR puede hacer CRUD en emprendimiento por su ID
router.get('/emprendimiento/:id', verificarToken, verificarRol([4]), clienteController.verEmprendimientoPorId);
router.post('/emprendimiento', verificarToken, verificarRol([4]), clienteController.crearEmprendimiento);
router.put('/emprendimiento/:id', verificarToken, verificarRol([4]), clienteController.actualizarEmprendimiento);
router.delete('/emprendimiento/:id', verificarToken, verificarRol([4]), clienteController.eliminarEmprendimiento);

// Otras rutas
router.get('/productos', verificarToken, verificarRol([1, 2, 3, 4, 5]), clienteController.verProductos);

module.exports = router;
