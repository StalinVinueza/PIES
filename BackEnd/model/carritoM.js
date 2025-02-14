const poolPostgres = require("../dbconfig/dbconection.js");

class CompraModel {
    // Verificar si el usuario tiene un carrito activo
    static async getActiveCart(es_cli_id) {
        try {
            const result = await poolPostgres.query(
                "SELECT ES_COMPRA_ID, ES_COM_ESTADO FROM ES_COMPRA WHERE ES_CLI_ID = $1 AND ES_COM_ESTADO = 'pendiente'",
                [es_cli_id]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            throw new Error("Error al obtener el carrito activo: " + err.message);
        }
    }

    // 🛒 Crear un nuevo carrito de compras
    static async createCart(es_cli_id) {
        try {
            // Verificar si el cliente ya tiene un carrito pendiente
            const activeCart = await this.getActiveCart(es_cli_id);
            if (activeCart) {
                throw new Error("El cliente ya tiene un carrito activo");
            }

            const result = await poolPostgres.query(
                "INSERT INTO ES_COMPRA (ES_CLI_ID, ES_COM_ESTADO) VALUES ($1, 'pendiente') RETURNING ES_COMPRA_ID",
                [es_cli_id]
            );
            return result.rows[0].es_compra_id;
        } catch (err) {
            throw new Error("Error al crear el carrito: " + err.message);
        }
    }

    // 🏷️ Obtener el precio de un producto
    static async getProductPrice(es_pro_id) {
        try {
            const result = await poolPostgres.query(
                "SELECT ES_PRO_PRECIO FROM ES_PRODUCTO WHERE ES_PRO_ID = $1",
                [es_pro_id]
            );
            return result.rows.length > 0 ? result.rows[0].es_pro_precio : null;
        } catch (err) {
            throw new Error("Error al obtener el precio del producto: " + err.message);
        }
    }

    // Agregar un producto al carrito
    static async addToCart(es_compra_id, es_pro_id, cantidad) {
        try {
            // Verificar que el carrito no esté finalizado
            const carrito = await this.getActiveCart(es_compra_id);
            if (!carrito || carrito.es_com_estado !== 'pendiente') {
                throw new Error("No se puede agregar productos a un carrito finalizado");
            }

            const precio = await this.getProductPrice(es_pro_id);
            if (!precio) throw new Error("Producto no encontrado");

            const subtotal = precio * cantidad;

            await poolPostgres.query(
                "INSERT INTO ES_FACTURA_DETALLE (ES_FAC_ID, ES_PRO_ID, ES_FAC_DET_CANTIDAD, ES_FAC_DET_SUBTOTAL) VALUES ($1, $2, $3, $4)",
                [es_compra_id, es_pro_id, cantidad, subtotal]
            );
        } catch (err) {
            throw new Error("Error al agregar producto al carrito: " + err.message);
        }
    }

    // Obtener los productos en el carrito
    static async getCartDetails(es_cli_id) {
        try {
            const result = await poolPostgres.query(`
                SELECT fd.ES_FAC_DET_ID, fd.ES_FAC_ID, p.ES_PRO_NOMBRE, fd.ES_FAC_DET_CANTIDAD, fd.ES_FAC_DET_SUBTOTAL
                FROM ES_FACTURA_DETALLE fd
                JOIN ES_COMPRA c ON fd.ES_FAC_ID = c.ES_COMPRA_ID
                JOIN ES_PRODUCTO p ON fd.ES_PRO_ID = p.ES_PRO_ID
                WHERE c.ES_CLI_ID = $1 AND c.ES_COM_ESTADO = 'pendiente'
            `, [es_cli_id]);
            return result.rows;
        } catch (err) {
            throw new Error("Error al obtener los productos del carrito: " + err.message);
        }
    }

    // Finalizar la compra
    static async finalizePurchase(es_cli_id, es_met_pago_id) {
        const client = await poolPostgres.connect();
        try {
            await client.query('BEGIN');

            const carrito = await this.getActiveCart(es_cli_id);
            if (!carrito) throw new Error("No hay productos en el carrito");

            const compraId = carrito.es_compra_id;

            // Obtener el total de la compra
            const totalCompra = await poolPostgres.query(
                "SELECT SUM(ES_FAC_DET_SUBTOTAL) AS total FROM ES_FACTURA_DETALLE WHERE ES_FAC_ID = $1",
                [compraId]
            );
            const total = totalCompra.rows[0].total || 0;

            // Crear la factura
            const factura = await poolPostgres.query(
                "INSERT INTO ES_FACTURA (ES_COMPRA_ID, ES_CLI_ID, ES_FAC_TOTAL, ES_FAC_ESTADO) VALUES ($1, $2, $3, 1) RETURNING ES_FAC_ID",
                [compraId, es_cli_id, total]
            );

            // Actualizar estado de la compra a "finalizado"
            await poolPostgres.query(
                "UPDATE ES_COMPRA SET ES_COM_ESTADO = 'finalizado' WHERE ES_COMPRA_ID = $1",
                [compraId]
            );

            await client.query('COMMIT');
            return factura.rows[0].es_fac_id;
        } catch (err) {
            await client.query('ROLLBACK');
            throw new Error("Error al finalizar la compra: " + err.message);
        } finally {
            client.release();
        }
    }
}

module.exports = CompraModel;
