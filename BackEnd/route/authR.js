const express = require("express");
const router = express.Router();
const productoController = require("../controller/productoC");
const authenticateUser = require("../middleware/authM");

// Ruta para crear un producto (solo usuarios autenticados)
router.post("/productos", authenticateUser, productoController.createProducto);

// Ruta para actualizar un producto (solo usuarios autenticados)
router.put("/productos/:id", authenticateUser, productoController.updateProducto);

// Ruta para eliminar un producto (solo usuarios autenticados)
router.delete("/productos/:id", authenticateUser, productoController.deleteProducto);