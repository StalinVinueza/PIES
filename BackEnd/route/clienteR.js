const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteC');

// Definir las rutas
router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.post('/clientes', clienteController.createCliente);
router.put('/clientes/:id', clienteController.updateCliente);
router.delete('/clientes/:id', clienteController.deleteCliente);

module.exports = router;
