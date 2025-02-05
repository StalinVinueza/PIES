const poolPostgres = require('../dbconfig/dbconection.js'); // Conexión a PostgreSQL

class ClienteModel {

  // Obtener todos los clientes con la dirección y perfil asociados
  static async getAllClientes() {
    try {
      const result = await poolPostgres.query(`
        SELECT 
          c.ES_CLI_ID,
          c.ES_CLI_NOMBRE,
          c.ES_CLI_APELLIDO,
          c.ES_CLI_CORREO,
          c.ES_CLI_GENERO,
          c.ES_CLI_FECHA_NACIMIENTO,
          c.ES_CLI_DIRECCION,
          c.ES_CLI_PAIS,
          c.ES_CLI_PROVINCIA,
          c.ES_CLI_CIUDAD,
          c.ES_CLI_CODIGO_POSTAL,
          c.ES_CLI_TELEFONO_1,
          c.ES_CLI_TELEFONO_2,
          c.ES_CLI_FECHA_CREACION,
          c.ES_CLI_FECHA_MODIFICACION,
          c.ES_CLI_ESTADO
        FROM ES_CLIENTE c
      `);
      return result.rows;
    } catch (err) {
      throw new Error(`Error al obtener los clientes: ${err.message}`);
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
          c.ES_CLI_CORREO,
          c.ES_CLI_GENERO,
          c.ES_CLI_FECHA_NACIMIENTO,
          c.ES_CLI_DIRECCION,
          c.ES_CLI_PAIS,
          c.ES_CLI_PROVINCIA,
          c.ES_CLI_CIUDAD,
          c.ES_CLI_CODIGO_POSTAL,
          c.ES_CLI_TELEFONO_1,
          c.ES_CLI_TELEFONO_2,
          c.ES_CLI_FECHA_CREACION,
          c.ES_CLI_FECHA_MODIFICACION,
          c.ES_CLI_ESTADO
        FROM ES_CLIENTE c
        WHERE c.ES_CLI_ID = $1
      `, [id]);

      if (result.rows.length === 0) {
        throw new Error('Cliente no encontrado');
      }

      return result.rows[0];
    } catch (err) {
      throw new Error(`Error al obtener el cliente: ${err.message}`);
    }
  }

  // Crear un nuevo cliente
  static async createCliente(clienteData) {
    try {
      const {
        ES_CLI_NOMBRE,
        ES_CLI_APELLIDO,
        ES_CLI_PERFIL_ID,
        ES_CLI_CORREO,
        ES_CLI_GENERO,
        ES_CLI_FECHA_NACIMIENTO,
        ES_CLI_DIRECCION,
        ES_CLI_PAIS,
        ES_CLI_PROVINCIA,
        ES_CLI_CIUDAD,
        ES_CLI_CODIGO_POSTAL,
        ES_CLI_TELEFONO_1,
        ES_CLI_TELEFONO_2
      } = clienteData;

      const result = await poolPostgres.query(`
        INSERT INTO ES_CLIENTE (
          ES_CLI_NOMBRE,
          ES_CLI_APELLIDO,
          ES_CLI_PERFIL_ID,
          ES_CLI_CORREO,
          ES_CLI_GENERO,
          ES_CLI_FECHA_NACIMIENTO,
          ES_CLI_DIRECCION,
          ES_CLI_PAIS,
          ES_CLI_PROVINCIA,
          ES_CLI_CIUDAD,
          ES_CLI_CODIGO_POSTAL,
          ES_CLI_TELEFONO_1,
          ES_CLI_TELEFONO_2
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
        ) RETURNING ES_CLI_ID
      `, [
        ES_CLI_NOMBRE,
        ES_CLI_APELLIDO,
        ES_CLI_PERFIL_ID,
        ES_CLI_CORREO,
        ES_CLI_GENERO,
        ES_CLI_FECHA_NACIMIENTO,
        ES_CLI_DIRECCION,
        ES_CLI_PAIS,
        ES_CLI_PROVINCIA,
        ES_CLI_CIUDAD,
        ES_CLI_CODIGO_POSTAL,
        ES_CLI_TELEFONO_1,
        ES_CLI_TELEFONO_2
      ]);

      return result.rows[0].ES_CLI_ID;
    } catch (err) {
      throw new Error(`Error al crear el cliente: ${err.message}`);
    }
  }

  // Actualizar un cliente por ID
  static async updateCliente(id, clienteData) {
    try {
      const {
        ES_CLI_NOMBRE,
        ES_CLI_APELLIDO,
        ES_CLI_PERFIL_ID,
        ES_CLI_CORREO,
        ES_CLI_GENERO,
        ES_CLI_FECHA_NACIMIENTO,
        ES_CLI_DIRECCION,
        ES_CLI_PAIS,
        ES_CLI_PROVINCIA,
        ES_CLI_CIUDAD,
        ES_CLI_CODIGO_POSTAL,
        ES_CLI_TELEFONO_1,
        ES_CLI_TELEFONO_2
      } = clienteData;

      const result = await poolPostgres.query(`
        UPDATE ES_CLIENTE
        SET 
          ES_CLI_NOMBRE = $1,
          ES_CLI_APELLIDO = $2,
          ES_CLI_PERFIL_ID = $3,
          ES_CLI_CORREO = $4,
          ES_CLI_GENERO = $5,
          ES_CLI_FECHA_NACIMIENTO = $6,
          ES_CLI_DIRECCION = $7,
          ES_CLI_PAIS = $8,
          ES_CLI_PROVINCIA = $9,
          ES_CLI_CIUDAD = $10,
          ES_CLI_CODIGO_POSTAL = $11,
          ES_CLI_TELEFONO_1 = $12,
          ES_CLI_TELEFONO_2 = $13,
          ES_CLI_FECHA_MODIFICACION = CURRENT_TIMESTAMP
        WHERE ES_CLI_ID = $14
        RETURNING ES_CLI_ID
      `, [
        ES_CLI_NOMBRE,
        ES_CLI_APELLIDO,
        ES_CLI_PERFIL_ID,
        ES_CLI_CORREO,
        ES_CLI_GENERO,
        ES_CLI_FECHA_NACIMIENTO,
        ES_CLI_DIRECCION,
        ES_CLI_PAIS,
        ES_CLI_PROVINCIA,
        ES_CLI_CIUDAD,
        ES_CLI_CODIGO_POSTAL,
        ES_CLI_TELEFONO_1,
        ES_CLI_TELEFONO_2,
        id
      ]);

      if (result.rows.length === 0) {
        throw new Error('Cliente no encontrado para actualizar');
      }

      return result.rows[0].ES_CLI_ID;
    } catch (err) {
      throw new Error(`Error al actualizar el cliente: ${err.message}`);
    }
  }

  // Eliminar un cliente por ID
  static async deleteCliente(id) {
    try {
      const result = await poolPostgres.query(`
        DELETE FROM ES_CLIENTE
        WHERE ES_CLI_ID = $1
        RETURNING ES_CLI_ID
      `, [id]);

      if (result.rows.length === 0) {
        throw new Error('Cliente no encontrado para eliminar');
      }

      return result.rows[0].ES_CLI_ID;
    } catch (err) {
      throw new Error(`Error al eliminar el cliente: ${err.message}`);
    }
  }

}

module.exports = ClienteModel;
