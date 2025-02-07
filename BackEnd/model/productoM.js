const poolPostgres = require('../dbconfig/dbconection.js'); // Archivo de conexión

class ProductoModel {
  // Obtener todos los productos
  static async getAllProductos() {
    try {
      const result = await poolPostgres.query(`
        SELECT 
          ES_PRO_ID, ES_EMP_ID, ES_PRO_NOMBRE, ES_PRO_PRECIO, 
          ES_PRO_STOCK, ES_PRO_DESCRIPCION, ES_PRO_IMAGEN, 
          ES_PRO_FECHA_CREACION, ES_PRO_FECHA_MODIFICACION, ES_PRO_ESTADO
        FROM ES_PRODUCTO
      `);
      return result.rows;
    } catch (err) {
      throw new Error('Error al obtener los productos: ' + err.message);
    }
  }

  // Obtener un producto por ID
  static async getProductoById(id) {
    try {
      const result = await poolPostgres.query(`
        SELECT 
          ES_PRO_ID, ES_EMP_ID, ES_PRO_NOMBRE, ES_PRO_PRECIO, 
          ES_PRO_STOCK, ES_PRO_DESCRIPCION, ES_PRO_IMAGEN, 
          ES_PRO_FECHA_CREACION, ES_PRO_FECHA_MODIFICACION, ES_PRO_ESTADO
        FROM ES_PRODUCTO
        WHERE ES_PRO_ID = $1
      `, [id]);

      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      throw new Error('Error al obtener el producto por ID: ' + err.message);
    }
  }

  // Crear un nuevo producto
  static async createProducto({ es_emp_id, nombre, precio, stock, descripcion, imagen }) {
    try {
      const result = await poolPostgres.query(
        `INSERT INTO ES_PRODUCTO 
         (ES_EMP_ID, ES_PRO_NOMBRE, ES_PRO_PRECIO, ES_PRO_STOCK, ES_PRO_DESCRIPCION, ES_PRO_IMAGEN, ES_PRO_FECHA_CREACION, ES_PRO_ESTADO)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), 1) RETURNING *`,
        [es_emp_id, nombre, precio, stock, descripcion, imagen]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al crear el producto: ' + err.message);
    }
  }

  // Actualizar un producto
  static async updateProducto(id, { es_emp_id, nombre, precio, stock, descripcion, imagen }) {
    try {
      // Obtener la imagen anterior si no se sube una nueva
      const existing = await poolPostgres.query(`SELECT ES_PRO_IMAGEN FROM ES_PRODUCTO WHERE ES_PRO_ID = $1`, [id]);

      if (existing.rows.length === 0) {
        throw new Error('Producto no encontrado');
      }

      const es_pro_imagen = imagen || existing.rows[0].es_pro_imagen;

      const result = await poolPostgres.query(
        `UPDATE ES_PRODUCTO SET
         ES_EMP_ID = $1,
         ES_PRO_NOMBRE = $2,
         ES_PRO_PRECIO = $3,
         ES_PRO_STOCK = $4,
         ES_PRO_DESCRIPCION = $5,
         ES_PRO_IMAGEN = $6,
         ES_PRO_FECHA_MODIFICACION = NOW()
         WHERE ES_PRO_ID = $7 RETURNING *`,
        [es_emp_id, nombre, precio, stock, descripcion, es_pro_imagen, id]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      throw new Error('Error al actualizar el producto: ' + err.message);
    }
  }

  // Eliminar un producto
  static async deleteProducto(id) {
    try {
      const result = await poolPostgres.query(
        "DELETE FROM ES_PRODUCTO WHERE ES_PRO_ID = $1 RETURNING *",
        [id]
      );
      return result.rowCount > 0;
    } catch (err) {
      throw new Error("Error al eliminar el producto: " + err.message);
    }
  }
}

module.exports = ProductoModel;
