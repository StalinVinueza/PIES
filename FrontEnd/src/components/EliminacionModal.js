import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ClienteDeleteModal({ show, onHide, onDelete, clienteToDelete }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar este cliente?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={() => onDelete(clienteToDelete)}>Sí, Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClienteDeleteModal;
