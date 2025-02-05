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

  // Crear un nuevo emprendimiento
  static async createEmprendimiento({ nombre, descripcion, logo }) {
    try {
      const result = await poolPostgres.query(
        `INSERT INTO ES_EMPRENDIMIENTO (ES_EMP_NOMBRE, ES_EMP_DESCRIPCION, ES_EMP_LOGO, ES_EMP_FECHA_CREACION, ES_EMP_ESTADO)
         VALUES ($1, $2, $3, NOW(), 'activo') RETURNING *`,
        [nombre, descripcion, logo]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al crear el emprendimiento: ' + err.message);
    }
  }

  // Actualizar un emprendimiento
  static async updateEmprendimiento(id, { nombre, descripcion, logo }) {
    try {
      const result = await poolPostgres.query(
        `UPDATE ES_EMPRENDIMIENTO SET
         ES_EMP_NOMBRE = $1,
         ES_EMP_DESCRIPCION = $2,
         ES_EMP_LOGO = $3,
         ES_EMP_FECHA_MODIFICACION = NOW()
         WHERE ES_EMP_ID = $4 RETURNING *`,
        [nombre, descripcion, logo, id]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      throw new Error('Error al actualizar el emprendimiento: ' + err.message);
    }
  }

  // Eliminar un emprendimiento
  static async deleteEmprendimiento(id) {
    try {
      const result = await poolPostgres.query(
        `DELETE FROM ES_EMPRENDIMIENTO WHERE ES_EMP_ID = $1 RETURNING *`,
        [id]
      );
      return result.rows.length > 0;
    } catch (err) {
      throw new Error('Error al eliminar el emprendimiento: ' + err.message);
    }
  }
}

module.exports = EmprendimientoModel;