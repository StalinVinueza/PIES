const mongoose = require('mongoose');

// Definición del esquema de MongoDB adaptado
const clienteSchema = new mongoose.Schema({
  es_cli_nombre: { type: String, required: true },
  es_cli_apellido: { type: String, required: true },
  es_cli_correo: { type: String, required: true, unique: true },
  es_cli_mongo: { type: String, required: true, unique: true },
  es_cli_genero: { type: String, required: true, enum: ['femenino', 'masculino'] },
  es_cli_fecha_nacimiento: { type: Date, required: true },
  es_cli_direccion: { type: String },
  es_cli_pais: { type: String },
  es_cli_provincia: { type: String },
  es_cli_ciudad: { type: String },
  es_cli_codigo_postal: { type: String },
  es_cli_telefono_1: { type: String },
  es_cli_telefono_2: { type: String },
  es_cli_fecha_creacion: { type: Date, default: Date.now, required: true },
  es_cli_fecha_modificacion: { type: Date, default: Date.now, required: true },
  es_cli_estado: { type: Number, default: 1, required: true }
});

// Modelo de MongoDB
const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;

