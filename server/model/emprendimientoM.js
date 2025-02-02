const poolPostgres = require('../dbconfig/dbconection.js'); // Archivo de conexión

class EmprendimientoModel {
  // Obtener todos los emprendimientos
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
      throw new Error('Error al obtener los emprendimientos: ' + err.message);
    }
  }

  // Obtener un emprendimiento por ID
  static async getEmprendimientobyId(id) {
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
        WHERE e.ES_EMP_ID = $1
      `, [id]);

      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      throw new Error('Error al obtener el emprendimiento por ID: ' + err.message);
    }
  }
}

module.exports = EmprendimientoModel;
