const express = require('express');
const router = express.Router();
const productoController = require('../controller/productoC');

// Definir las rutas
router.get('/productos', productoController.getAllProductos);
router.get('/productos/:id', productoController.getProductoById);
router.post('/productos', productoController.createProducto);
router.put('/productos/:id', productoController.updateProducto);
router.delete('/productos/:id', productoController.deleteProducto);


module.exports = router;