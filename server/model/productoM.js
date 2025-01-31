const poolPostgres = require('../dbconfig/dbconection.js'); // Archivo de conexión

class ProductoModel {
  // Obtener todos los clientes con la dirección y perfil asociados
  static async getAllProductos() {
    try {
      const result = await poolPostgres.query(`
        SELECT 
        p.ES_PRO_ID,
            p.ES_PRO_NOMBRE,
            p.ES_PRO_PRECIO,
            p.ES_PRO_STOCK,
            p.ES_PRO_DESCRIPCION,
            p.ES_PRO_IMAGEN,
            p.ES_PRO_FECHA_CREACION,
            p.ES_PRO_FECHA_MODIFICACION,
            p.ES_PRO_ESTADO
        FROM ES_PRODUCTO p
      `);
      return result.rows;
    } catch (err) {
      throw new Error('Error al obtener los productos: ' + err.message);
    }
  }

  
}
  module.exports = ProductoModel;
