import React, { useEffect, useState } from "react";
import { PencilSquare, TrashFill, Eye } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";

function Emprendimientos({ onShowModal }) {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [selectedEmprendimiento, setSelectedEmprendimiento] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/emprendimientos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la carga de emprendimientos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setEmprendimientos(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error al cargar emprendimientos:", error);
        setEmprendimientos([]);
      });
  }, []);

  // Función para eliminar un emprendimiento
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este emprendimiento?")) {
      fetch(`http://localhost:3001/api/emprendimientos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el emprendimiento");
          }
          setEmprendimientos((prev) =>
            prev.filter((emp) => emp.es_emp_id !== id)
          );
        })
        .catch((error) => console.error("Error al eliminar:", error));
    }
  };

  // Función para visualizar los detalles de un emprendimiento
  const handleView = (emprendimiento) => {
    setSelectedEmprendimiento(emprendimiento);
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => setShowViewModal(false);
  return (
    <div className="container py-">
      {emprendimientos.length === 0 ? (
        <p className="text-center">No hay emprendimientos disponibles.</p>
      ) : (
        <div className="row">
          {emprendimientos.map((emprendimiento) => (
            <div
              key={emprendimiento.es_emp_id}
              className="col-md-4 col-lg-3 mb-4"
            >
              <div className="card shadow-sm h-100">
                <img
                  src={
                    emprendimiento.es_emp_logo.startsWith("/uploads/")
                      ? `http://localhost:3001${emprendimiento.es_emp_logo}`
                      : `http://localhost:3001/uploads/${emprendimiento.es_emp_logo}`
                  }
                  alt={emprendimiento.es_emp_nombre}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{emprendimiento.es_emp_nombre}</h5>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#636b2f",
                        borderColor: "#636b2f",
                        color: "white",
                      }}
                      onClick={() => handleView(emprendimiento)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#636b2f",
                        borderColor: "#636b2f",
                        color: "white",
                      }}
                      onClick={() => onShowModal(emprendimiento)}
                    >
                      <PencilSquare size={18} />
                    </button>

                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#636b2f",
                        borderColor: "#636b2f",
                        color: "white",
                      }}
                      onClick={() => handleDelete(emprendimiento.es_emp_id)}
                    >
                      <TrashFill size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal para ver los detalles del emprendimiento (solo lectura) */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Emprendimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmprendimiento && (
            <>
              <p><strong>Nombre:</strong> {selectedEmprendimiento.es_emp_nombre}</p>
              
              <p><strong>Descripción:</strong> {selectedEmprendimiento.es_emp_descripcion}</p>
              <p><strong>Logo:</strong></p>
              <img
                src={`http://localhost:3001${selectedEmprendimiento.es_emp_logo}`}
                alt={selectedEmprendimiento.es_emp_nombre}
                className="img-fluid"
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => onShowModal(selectedEmprendimiento)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(selectedEmprendimiento.es_emp_id)}>
            Eliminar
          </button>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Emprendimientos;