import React from 'react';
import { Form } from 'react-bootstrap';


function ClienteForm({ editData, handleChange }) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_nombre" 
          value={editData.es_cli_nombre} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Apellido</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_apellido" 
          value={editData.es_cli_apellido} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Correo</Form.Label>
        <Form.Control 
          type="email" 
          name="es_cli_correo" 
          value={editData.es_cli_correo} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Género</Form.Label>
        <Form.Control 
          as="select" 
          name="es_cli_genero" 
          value={editData.es_cli_genero} 
          onChange={handleChange}
        >
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control 
          type="date" 
          name="es_cli_fecha_nacimiento" 
          value={editData.es_cli_fecha_nacimiento} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Dirección</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_direccion" 
          value={editData.es_cli_direccion} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>País</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_pais" 
          value={editData.es_cli_pais} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Provincia</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_provincia" 
          value={editData.es_cli_provincia} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Ciudad</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_ciudad" 
          value={editData.es_cli_ciudad} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Código Postal</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_codigo_postal" 
          value={editData.es_cli_codigo_postal} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teléfono 1</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_telefono_1" 
          value={editData.es_cli_telefono_1} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teléfono 2</Form.Label>
        <Form.Control 
          type="text" 
          name="es_cli_telefono_2" 
          value={editData.es_cli_telefono_2} 
          onChange={handleChange} 
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Estado</Form.Label>
        <Form.Control 
          as="select" 
          name="es_cli_estado" 
          value={editData.es_cli_estado} 
          onChange={handleChange}
        >
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}

export default ClienteForm;
