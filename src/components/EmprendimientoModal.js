import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EmprendimientoForm from './EmprendimientoForm';


function EmprendimientoModal({ show, handleClose, editData, handleChange, handleUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editData.nombre_emprendimiento ? 'Información Emprendimiento' : 'Nuevo Emprendimiento'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEditing ? (
          // Mostrar solo la información
          <div>
            <p><strong>Nombre Emprendimiento:</strong> {editData.nombre_emprendimiento}</p>
            <p><strong>Nombre Emprendimiento:</strong> {editData.es_emp_nombre}</p>
            <p><strong>Logo:</strong> <img src={editData.es_emp_logo} alt="Logo" style={{ width: '100px' }} /></p>

          </div>
        ) : (
          // Mostrar el formulario de edición
          <EmprendimientoForm editData={editData} handleChange={handleChange} />
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

export default EmprendimientoModal;
