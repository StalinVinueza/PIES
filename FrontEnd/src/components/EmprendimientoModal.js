import React from "react";
import { Modal, Button } from "react-bootstrap";
import EmprendimientoForm from "./EmprendimientoForm";

function EmprendimientoModal({ show, handleClose, editData, handleChange, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editData.es_emp_id ? "Editar Emprendimiento" : "Nuevo Emprendimiento"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmprendimientoForm
          editData={editData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmprendimientoModal;