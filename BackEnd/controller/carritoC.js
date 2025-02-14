const CompraModel = require("../model/carritoM");

const addToCart = async (req, res) => {
    const { es_cli_id, es_pro_id, cantidad } = req.body;

    try {
        await CompraModel.addToCart(es_cli_id, es_pro_id, cantidad);
        res.status(200).json({ message: "Producto agregado al carrito" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cartDetails = await CompraModel.getCartDetails(req.params.es_cli_id);
        res.status(200).json(cartDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const finalizePurchase = async (req, res) => {
    const { es_cli_id, es_met_pago_id } = req.body;

    try {
        const facturaId = await CompraModel.finalizePurchase(es_cli_id, es_met_pago_id);
        res.status(200).json({ message: "Compra finalizada", factura_id: facturaId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    const { detalleId } = req.params;
    try {
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
