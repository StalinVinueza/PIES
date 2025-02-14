const poolPostgres = require("../dbconfig/dbconection.js");

class CompraModel {
    // Verificar si el usuario tiene un carrito activo
    static async getActiveCart(es_cli_id) {
        try {
            const result = await poolPostgres.query(
                "SELECT ES_COMPRA_ID FROM ES_COMPRA WHERE ES_CLI_ID = $1",
                [es_cli_id]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            throw new Error("Error al obtener el carrito activo: " + err.message);
        }
    }

    // Verificar si el cliente existe antes de crear el carrito
    static async checkClienteExists(es_cli_id) {
        const cliente = await poolPostgres.query(
            "SELECT ES_CLI_ID FROM ES_CLIENTE WHERE ES_CLI_ID = $1",
            [es_cli_id]
        );
        return cliente.rows.length > 0;
    }

    static async createCart(es_cli_id) {
        try {
            // Verificar si el cliente existe
            const clienteExiste = await this.checkClienteExists(es_cli_id);
            if (!clienteExiste) {
                throw new Error("El cliente no existe");
            }

            // Crear el carrito
            const result = await poolPostgres.query(
                "INSERT INTO ES_COMPRA (ES_CLI_ID) VALUES ($1) RETURNING ES_COMPRA_ID",
                [es_cli_id]
            );
            return result.rows[0].es_compra_id;
        } catch (err) {
            throw new Error("Error al crear el carrito: " + err.message);
        }
    }

    // Obtener el precio de un producto
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

    static async addToCart(es_cli_id, es_pro_id, cantidad) {
        try {
            // Verificar si el cliente existe
            const clienteExiste = await this.checkClienteExists(es_cli_id);
            if (!clienteExiste) {
                throw new Error("El cliente no existe");
            }

            let carrito = await this.getActiveCart(es_cli_id);

            // Si no hay carrito activo, creamos uno nuevo
            if (!carrito) {
                const nuevoCarritoId = await this.createCart(es_cli_id);
                carrito = { es_compra_id: nuevoCarritoId };
            }

            // Obtener la factura del carrito
            let factura = await poolPostgres.query(
                "SELECT ES_FAC_ID FROM ES_FACTURA WHERE ES_COMPRA_ID = $1",
                [carrito.es_compra_id]
            );

            let es_fac_id;
            if (factura.rows.length === 0) {
                // Crear la factura si no existe
                const nuevaFactura = await poolPostgres.query(
                    "INSERT INTO ES_FACTURA (ES_COMPRA_ID, ES_CLI_ID, ES_FAC_TOTAL, ES_FAC_ESTADO) VALUES ($1, $2, 0, 'pendiente') RETURNING ES_FAC_ID",
                    [carrito.es_compra_id, es_cli_id]
                );
                es_fac_id = nuevaFactura.rows[0].es_fac_id;
            } else {
                es_fac_id = factura.rows[0].es_fac_id;
            }

            // Obtener el precio del producto
            const precio = await this.getProductPrice(es_pro_id);
            if (!precio) throw new Error("Producto no encontrado");

            const subtotal = precio * cantidad;

            // Agregar el producto al detalle de la factura
            await poolPostgres.query(
                "INSERT INTO ES_FACTURA_DETALLE (ES_FAC_ID, ES_PRO_ID, ES_FAC_DET_CANTIDAD, ES_FAC_DET_SUBTOTAL) VALUES ($1, $2, $3, $4)",
                [es_fac_id, es_pro_id, cantidad, subtotal]
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
                JOIN ES_FACTURA f ON fd.ES_FAC_ID = f.ES_FAC_ID
                JOIN ES_COMPRA c ON f.ES_COMPRA_ID = c.ES_COMPRA_ID
                JOIN ES_PRODUCTO p ON fd.ES_PRO_ID = p.ES_PRO_ID
                WHERE c.ES_CLI_ID = $1
            `, [es_cli_id]);
            return result.rows;
        } catch (err) {
            throw new Error("Error al obtener los productos del carrito: " + err.message);
        }
    }
}

module.exports = CompraModel;
