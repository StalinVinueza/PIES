const poolPostgres = require('../dbconfig/dbconection.js'); // Archivo de conexión

class EmprendimientoModel {
  // Obtener todos los clientes con la dirección y perfil asociados
  static async getAllEmprendimientos() {
    try {
      const result = await poolPostgres.query(`
        SELECT 
        e.ES_EMP_ID,
            e.ES_EMP_NOMBRE,
            e.ES_EMP_DESCRIPCION,
            e.ES_EMP_LOGO,
            e.ES_EMP_FECHA_CREACION,
            e.ES_EMP_FECHA_MODIFICACION,
            e.ES_EMP_ESTADO
        FROM ES_EMPRENDIMIENTO e
      `);
      return result.rows;
    } catch (err) {
      throw new Error('Error al obtener los clientes: ' + err.message);
    }
  }

  
}
  module.exports = EmprendimientoModel;
