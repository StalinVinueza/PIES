import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function EmprendimientoForm({ emprendimiento, onSuccess }) {
  const [formData, setFormData] = useState({
    es_emp_nombre: "",
    es_emp_descripcion: "",
    es_emp_logo: ""
  });

  useEffect(() => {
    if (emprendimiento) {
      setFormData(emprendimiento);
    } else {
      setFormData({ es_emp_nombre: "", es_emp_descripcion: "", es_emp_logo: "" });
    }
  }, [emprendimiento]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const method = emprendimiento ? "PUT" : "POST";
    const url = emprendimiento
      ? `http://localhost:3001/api/emprendimientos/${emprendimiento.es_emp_id}`
      : "http://localhost:3001/api/emprendimientos";
  
    fetch(url, {
      method: method, // Definir correctamente la variable
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(() => {
        onSuccess();  // Asegura que la lista se recargue tras la operación
      })
      .catch(error => console.error("Error al guardar:", error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="es_emp_nombre"
          value={formData.es_emp_nombre}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="es_emp_descripcion"
          value={formData.es_emp_descripcion}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL del Logo</Form.Label>
        <Form.Control
          type="text"
          name="es_emp_logo"
          value={formData.es_emp_logo}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
}

export default EmprendimientoForm;
