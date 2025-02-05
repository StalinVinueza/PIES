const poolPostgres = require('../dbconfig/dbconection.js'); // Archivo de conexión

class ClienteModel {
  // Obtener todos los clientes con la dirección y perfil asociados
  static async getAllClientes() {
    try {
      const result = await poolPostgres.query(`
        SELECT 
          c.ES_CLI_ID,
          c.ES_CLI_NOMBRE,
          c.ES_CLI_APELLIDO,
          p.ES_CLI_PERFIL_ROL,
          c.ES_CLI_CORREO,
          d.ES_CLI_DIRECCION,
          d.ES_CLI_PAIS,
          d.ES_CLI_PROVINCIA,
          d.ES_CLI_CIUDAD,
          d.ES_CLI_CODIGO_POSTAL,
          d.ES_CLI_TELEFONO_1,
          d.ES_CLI_TELEFONO_2,
          c.ES_CLI_FECHA_CREACION,
          c.ES_CLI_FECHA_MODIFICACION,
          c.ES_CLI_ESTADO
        FROM ES_CLIENTE c
        LEFT JOIN ES_CLIENTE_DIRECCION d ON c.ES_CLI_DIRECCION_ID = d.ES_CLI_DIRECCION_ID
        LEFT JOIN ES_CLIENTE_PERFIL p ON c.ES_CLI_PERFIL_ID = p.ES_CLI_PERFIL_ID
      `);
      return result.rows;
    } catch (err) {
      throw new Error('Error al obtener los clientes: ' + err.message);
    }
  }

  // Obtener un cliente por ID con su dirección y perfil asociados
  static async getClienteById(id) {
    try {
      const result = await poolPostgres.query(`
        SELECT 
            c.ES_CLI_ID,
          c.ES_CLI_NOMBRE,
          c.ES_CLI_APELLIDO,
          p.ES_CLI_PERFIL_ROL,
          c.ES_CLI_CORREO,
          d.ES_CLI_DIRECCION,
          d.ES_CLI_PAIS,
          d.ES_CLI_PROVINCIA,
          d.ES_CLI_CIUDAD,
          d.ES_CLI_CODIGO_POSTAL,
          d.ES_CLI_TELEFONO_1,
          d.ES_CLI_TELEFONO_2,
          c.ES_CLI_FECHA_CREACION,
          c.ES_CLI_FECHA_MODIFICACION,
          c.ES_CLI_ESTADO
        FROM ES_CLIENTE c
        LEFT JOIN ES_CLIENTE_DIRECCION d ON c.ES_CLI_DIRECCION_ID = d.ES_CLI_DIRECCION_ID
        LEFT JOIN ES_CLIENTE_PERFIL p ON c.ES_CLI_PERFIL_ID = p.ES_CLI_PERFIL_ID
        WHERE c.ES_CLI_ID = $1
      `, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al obtener el cliente: ' + err.message);
    }
  }
}
  module.exports = ClienteModel;
