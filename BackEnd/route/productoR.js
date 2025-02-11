const express = require('express');
const router = express.Router();
const productoController = require('../controller/productoC');
const upload = require('../middleware/upload'); 

// Rutas para productos
router.get('/productos', productoController.getAllProductos);
router.get('/productos/:id', productoController.getProductoById);
router.get('/productos/emprendimiento/:es_emp_id', productoController.getProductosByEmprendimientoId); // Nueva ruta
router.post('/productos', upload.single('es_pro_imagen'), productoController.createProducto);
router.put('/productos/:id', upload.single('es_pro_imagen'), productoController.updateProducto);
router.delete('/productos/:id', productoController.deleteProducto);

module.exports = router;