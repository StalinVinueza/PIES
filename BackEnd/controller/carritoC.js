const CompraModel = require("../model/carritoM");

const addToCart = async (req, res) => {
    const { es_cli_id, es_pro_id, cantidad } = req.body;

    try {
        // Verificar si el cliente tiene un carrito activo o crear uno nuevo
        let carrito = await CompraModel.getActiveCart(es_cli_id);
        let compraId = carrito ? carrito.es_compra_id : await CompraModel.createCart(es_cli_id);

        // Agregar el producto al carrito
        await CompraModel.addToCart(compraId, es_pro_id, cantidad);
        res.status(200).json({ message: "Producto agregado al carrito" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCart = async (req, res) => {
    const { es_cli_id } = req.params;

    try {
        // Obtener los detalles del carrito
        const cartDetails = await CompraModel.getCartDetails(es_cli_id);
        res.status(200).json(cartDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const finalizePurchase = async (req, res) => {
    const { es_cli_id, es_met_pago_id } = req.body;

    try {
        // Finalizar la compra
        const facturaId = await CompraModel.finalizePurchase(es_cli_id, es_met_pago_id);
        res.status(200).json({ message: "Compra finalizada", factura_id: facturaId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    const { detalleId } = req.params;

    try {
        // Eliminar el producto del carrito
        await poolPostgres.query("DELETE FROM ES_FACTURA_DETALLE WHERE ES_FAC_DET_ID = $1", [detalleId]);
        res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    finalizePurchase,
    removeFromCart
};
