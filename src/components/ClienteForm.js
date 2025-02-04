import React from 'react';
import { Form } from 'react-bootstrap';

function ClienteForm({ editData, handleChange }) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="es_cli_nombre" value={editData.es_cli_nombre} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" name="es_cli_apellido" value={editData.es_cli_apellido} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Correo</Form.Label>
        <Form.Control type="email" name="es_cli_correo" value={editData.es_cli_correo} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Dirección</Form.Label>
        <Form.Control type="text" name="es_cli_direccion" value={editData.es_cli_direccion} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="es_cli_telefono_1" value={editData.es_cli_telefono_1} onChange={handleChange} />
      </Form.Group>
    </Form>
  );
}

export default ClienteForm;
