import React from 'react';
import { Button, Row, Col } from 'react-bootstrap'; // Importar Row y Col de Bootstrap
import { Eye, Trash } from 'react-bootstrap-icons'; // Importar los iconos de Bootstrap

function ClienteList({ clientes, onShowModal, onDelete, onDarDeBaja }) {
  return (
    <div className="list-group">
      {/* Títulos de las columnas */}
      <div className="list-group-item list-group-item-info">
        <Row>
          <Col md={3}><strong>Nombre</strong></Col>
          <Col md={2}><strong>Teléfono</strong></Col>
          <Col md={3}><strong>Correo</strong></Col>
          <Col md={2}><strong>País</strong></Col>
          <Col md={1}><strong>Acciones</strong></Col> 
        </Row>
      </div>
      
      {/* Datos de cada cliente */}
      {clientes.map(cliente => (
        <div key={cliente.es_cli_id} className="list-group-item">
          <Row>
            <Col md={3}>{cliente.es_cli_nombre} {cliente.es_cli_apellido}</Col>
            <Col md={2}>{cliente.es_cli_telefono_1}</Col>
            <Col md={3}>{cliente.es_cli_correo}</Col>
            <Col md={2}>{cliente.es_cli_pais}</Col>
            <Col md={1}>
              <div className="d-flex justify-content-start">
                <Button variant="info" onClick={() => onShowModal(cliente)} className="me-2">
                  <Eye />
                </Button>
                <Button variant="danger" onClick={() => onDelete(cliente.es_cli_id)} className="me-2">
                  <Trash />
                </Button>
                {/* <Button 
                  variant="warning" 
                  onClick={() => onDarDeBaja(cliente.es_cli_id)} 
                  disabled={cliente.estado === 0} 
                >
                  <PersonX />
                </Button> */}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default ClienteList;
