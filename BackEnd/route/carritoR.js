const express = require("express");
const router = express.Router();
const compraController = require("../controller/carritoC");

// Ruta para agregar un producto al carrito
router.post("/compra", compraController.addToCart);

// Ruta para obtener los productos en el carrito del cliente
router.get("/compra/:es_cli_id", compraController.getCart);

// Ruta para finalizar la compra
router.post("/compra/finalizar", compraController.finalizePurchase);

// Ruta para eliminar un producto del carrito
router.delete("/compra/:detalleId", compraController.removeFromCart);


module.exports = router;
