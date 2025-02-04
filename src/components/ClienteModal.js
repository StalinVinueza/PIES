import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ClienteForm from './ClienteForm'; 

function ClienteModal({ show, handleClose, editData, handleChange, handleUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editData.es_cli_id ? 'Información Cliente' : 'Nuevo Cliente'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEditing ? (
          // Mostrar solo la información
          <div>
            <p><strong>Nombre:</strong> {editData.es_cli_nombre}</p>
            <p><strong>Apellido:</strong> {editData.es_cli_apellido}</p>
            <p><strong>Correo:</strong> {editData.es_cli_correo}</p>
            <p><strong>Genero:</strong> {editData.es_cli_genero}</p>
            <p><strong>Fecha de Nacimiento:</strong> {editData.es_cli_fecha_nacimiento}</p>
            <p><strong>Dirección:</strong> {editData.es_cli_direccion}</p>
            <p><strong>Teléfono:</strong> {editData.es_cli_telefono_1}</p>
            <p><strong>País:</strong> {editData.es_cli_pais}</p>
            <p><strong>Estado:</strong> {editData.es_cli_estado}</p>

          </div>
        ) : (
          // Mostrar el formulario de edición
          <ClienteForm editData={editData} handleChange={handleChange} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        {!isEditing ? (
          <Button variant="primary" onClick={toggleEdit}>Editar</Button>
        ) : (
          <Button variant="success" onClick={handleUpdate}>Guardar</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ClienteModal;
