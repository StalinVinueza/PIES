const express = require("express");
const router = express.Router();
const compraController = require("../controller/carritoC");

router.post("/compra", compraController.addToCart);
router.get("/compra/:es_cli_id", compraController.getCart);
router.post("/compra/finalizar", compraController.finalizePurchase);
router.delete("/compra/:detalleId", compraController.removeFromCart);


module.exports = router;
