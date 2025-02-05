import React from "react";
import { Form, Button } from "react-bootstrap";

function EmprendimientoForm({ editData, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="es_emp_nombre"
          value={editData.es_emp_nombre || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="es_emp_descripcion"
          value={editData.es_emp_descripcion || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Logo</Form.Label>
        <Form.Control
          type="file"
          name="es_emp_logo"
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
}

export default EmprendimientoForm;
