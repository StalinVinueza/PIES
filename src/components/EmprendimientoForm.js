import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function EmprendimientoForm({ emprendimiento, onSuccess }) {
  const [formData, setFormData] = useState({
    ES_EMP_NOMBRE: "",
    ES_EMP_DESCRIPCION: "",
    ES_EMP_LOGO: null, // Para la imagen
  });

  useEffect(() => {
    if (emprendimiento) {
      setFormData({ ...emprendimiento, ES_EMP_LOGO: null });
    }
  }, [emprendimiento]);

  // Manejar cambios en los campos de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar selección de imagen
  const handleFileChange = (e) => {
    setFormData({ ...formData, ES_EMP_LOGO: e.target.files[0] });
  };

  // Enviar formulario con la imagen al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("ES_EMP_NOMBRE", formData.ES_EMP_NOMBRE);
    formDataToSend.append("ES_EMP_DESCRIPCION", formData.ES_EMP_DESCRIPCION);
    if (formData.ES_EMP_LOGO) {
      formDataToSend.append("ES_EMP_LOGO", formData.ES_EMP_LOGO);
    }

    const method = emprendimiento ? "put" : "post";
    const url = emprendimiento
      ? `http://localhost:3001/api/emprendimientos/${emprendimiento.ES_EMP_ID}`
      : "http://localhost:3001/api/emprendimientos";

    try {
      await axios({
        method,
        url,
        data: formDataToSend,
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess(); // Refrescar la lista después de crear/actualizar
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="ES_EMP_NOMBRE"
          value={formData.ES_EMP_NOMBRE}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="ES_EMP_DESCRIPCION"
          value={formData.ES_EMP_DESCRIPCION}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen del Emprendimiento</Form.Label>
        <Form.Control type="file" name="ES_EMP_LOGO" onChange={handleFileChange} accept="image/*" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
}

export default EmprendimientoForm;
