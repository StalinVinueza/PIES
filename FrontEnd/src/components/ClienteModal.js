import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClienteForm from "./ClienteForm";
import "../styles/ButtonModal.css";

function ClienteModal({ show, handleClose, editData, handleChange, handleSave }) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editData && editData.es_cli_id) {
      setIsEditing(true);  // Si hay datos, es edición
    } else {
      setIsEditing(false); // Si no hay datos, es creación
    }
  }, [editData]);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editData.es_cli_id ? 'Información Cliente' : 'Nuevo Cliente'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEditing && editData.es_cli_id ? (
          // Mostrar solo la información si ya existe un cliente
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
            <p><strong>Estado:</strong> {editData.es_cli_estado}</p>
          </div>
        ) : (
          // Mostrar el formulario de edición si es un cliente existente o nuevo
          <ClienteForm editData={editData} handleChange={handleChange} />
        )}
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        {!isEditing && editData.es_cli_id ? (
          <Button variant="primary" className="custom-btn" onClick={toggleEdit}>Editar</Button>
        ) : (
          <Button variant="success" className="custom-btn" onClick={handleSave}>Guardar</Button>
        )}
        <Button variant="secondary" className="custom-btn" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClienteModal;
