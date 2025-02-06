import React from "react";
import { Button, Row, Col } from "react-bootstrap"; // Importar Bootstrap
import { Eye, Trash } from "react-bootstrap-icons"; // Importar íconos de Bootstrap
import "./ClienteList.css"; // Importamos el CSS para estilos personalizados

function ClienteList({ clientes, onShowModal, onDelete }) {
  return (
    <div className="list-group">
      {/* Títulos de las columnas con nuevo color */}
      <div className="list-group-item list-group-header">
        <Row>
          <Col md={3}>
            <strong>Nombre</strong>
          </Col>
          <Col md={2}>
            <strong>Teléfono</strong>
          </Col>
          <Col md={3}>
            <strong>Correo</strong>
          </Col>
          <Col md={2}>
            <strong>País</strong>
          </Col>
          <Col md={2}>
            <strong>Acciones</strong>
          </Col>
        </Row>
      </div>

      {/* Datos de cada cliente */}
      {clientes.map((cliente) => (
        <div key={cliente.es_cli_id} className="list-group-item list-group-body">
          <Row>
            <Col md={3}>
              {cliente.es_cli_nombre} {cliente.es_cli_apellido}
            </Col>
            <Col md={2}>{cliente.es_cli_telefono_1}</Col>
            <Col md={3}>{cliente.es_cli_correo}</Col>
            <Col md={2}>{cliente.es_cli_pais}</Col>
            <Col md={2}>
              <div className="d-flex justify-content-start">
                {/* Botón de Ver */}
                <Button className="btn-custom me-2" onClick={() => onShowModal(cliente)}>
                  <Eye />
                </Button>

                {/* Botón de Eliminar */}
                <Button className="btn-custom me-2" onClick={() => onDelete(cliente.es_cli_id)}>
                  <Trash />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default ClienteList;
