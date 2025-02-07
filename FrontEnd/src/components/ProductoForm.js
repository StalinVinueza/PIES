import React from "react";
import { Form, Button } from "react-bootstrap";

function ProductoForm({ editData, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          name="es_pro_nombre"
          value={editData.es_pro_nombre || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          name="es_pro_precio"
          value={editData.es_pro_precio || ""}
          onChange={handleChange}
          step="0.01"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          name="es_pro_stock"
          value={editData.es_pro_stock || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="es_pro_descripcion"
          value={editData.es_pro_descripcion || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen del Producto</Form.Label>
        <Form.Control
          type="file"
          name="es_pro_imagen"
          accept="image/*"
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
}

export default ProductoForm;
