const express = require('express');
const router = express.Router();
const productoController = require('../controller/productoC');
const upload = require('../middleware/upload'); 
const verificarPermisos = require("../middleware/authMiddleware");

// Rutas para productos
router.get('/productos', productoController.getAllProductos);
router.get('/productos/:id', productoController.getProductoById);
router.get('/productos/emprendimiento/:es_emp_id', productoController.getProductosByEmprendimientoId);
router.post('/productos', upload.single('es_pro_imagen'), productoController.createProducto);
router.put('/productos/:id', upload.single('es_pro_imagen'), productoController.updateProducto);
router.delete('/productos/:id', productoController.deleteProducto);

// Ruta para agregar un producto (protegida por el middleware)
router.post("/api/productos", verificarPermisos, async (req, res) => {
    const { es_emp_id, es_pro_nombre, es_pro_precio, es_pro_stock, es_pro_descripcion } = req.body;
  
    try {
      // Inserta el nuevo producto en la base de datos
      const resultado = await db.query(
        "INSERT INTO productos (es_emp_id, es_pro_nombre, es_pro_precio, es_pro_stock, es_pro_descripcion) VALUES (?, ?, ?, ?, ?)",
        [es_emp_id, es_pro_nombre, es_pro_precio, es_pro_stock, es_pro_descripcion]
      );
  
      res.status(201).json({ mensaje: "Producto agregado correctamente", id: resultado.insertId });
    } catch (error) {
      console.error("Error al agregar producto:", error);
      res.status(500).json({ error: "Error al agregar el producto" });
    }
  });
  
  // Ruta para editar un producto (protegida por el middleware)
  router.put("/api/productos/:proId", verificarPermisos, async (req, res) => {
    const { proId } = req.params;
    const { es_pro_nombre, es_pro_precio, es_pro_stock, es_pro_descripcion } = req.body;
  
    try {
      // Actualiza el producto en la base de datos
      await db.query(
        "UPDATE productos SET es_pro_nombre = ?, es_pro_precio = ?, es_pro_stock = ?, es_pro_descripcion = ? WHERE es_pro_id = ?",
        [es_pro_nombre, es_pro_precio, es_pro_stock, es_pro_descripcion, proId]
      );
  
      res.status(200).json({ mensaje: "Producto actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  });
  
  module.exports = router;