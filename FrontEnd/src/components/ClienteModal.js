import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/ButtonModal.css";

function ClienteModal({ show, handleClose, editData }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Información Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editData && editData.es_cli_id ? (
          <div>
            <p><strong>Nombre:</strong> {editData.es_cli_nombre}</p>
            <p><strong>Apellido:</strong> {editData.es_cli_apellido}</p>
            <p><strong>Correo:</strong> {editData.es_cli_correo}</p>
            <p><strong>Genero:</strong> {editData.es_cli_genero}</p>
            <p><strong>Fecha de Nacimiento:</strong> {editData.es_cli_fecha_nacimiento}</p>
            <p><strong>Dirección:</strong> {editData.es_cli_direccion}</p>
            <p><strong>País:</strong> {editData.es_cli_pais}</p>
            <p><strong>Provincia:</strong> {editData.es_cli_provincia}</p>
            <p><strong>Ciudad:</strong> {editData.es_cli_ciudad}</p>
            <p><strong>Codigo Postal:</strong> {editData.es_cli_codigo_postal}</p>
            <p><strong>Teléfono 1:</strong> {editData.es_cli_telefono_1}</p>
            <p><strong>Teléfono 2:</strong> {editData.es_cli_telefono_2}</p>
            <p><strong>Fecha de Registro:</strong> {editData.es_cli_fecha_creacion}</p>
            <p><strong>Fecha de Actualización:</strong> {editData.es_cli_fecha_modificacion}</p>
            <p><strong>Estado:</strong> {editData.es_cli_estado}</p>
          </div>
        ) : (
          <p>No hay datos disponibles para mostrar.</p>
        )}
      </Modal.Body>
      
    </Modal>
  );
}

export default ClienteModal;
