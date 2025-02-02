// consulta.js
const sequelize = require('./dbconection');
const { QueryTypes } = require('sequelize');

// Función para obtener categorías
const obtenerCategorias = async () => {
  try {
    const categorias = await sequelize.query('SELECT * FROM ES_CATEGORIA', {
      type: QueryTypes.SELECT,
    });
    console.log('Registros encontrados:', categorias);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
  } finally {
    await sequelize.close();
  }
};

// Ejecutar la función
obtenerCategorias();
