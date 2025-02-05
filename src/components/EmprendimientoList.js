import React, { useEffect, useState } from "react";
import { PencilSquare, TrashFill } from "react-bootstrap-icons"; // Importando los iconos

function Emprendimientos({ onShowModal }) {  // Ahora recibe onShowModal como prop
  const [emprendimientos, setEmprendimientos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/emprendimientos")
      .then((response) => response.json())
      .then((data) => setEmprendimientos(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este emprendimiento?")) {
      fetch(`http://localhost:3001/api/emprendimientos/${id}`, { method: "DELETE" })
        .then(() => setEmprendimientos((prev) => prev.filter((emp) => emp.es_emp_id !== id)))
        .catch((error) => console.error("Error al eliminar:", error));
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Emprendimientos</h1>
      <div className="row">
        {emprendimientos.map((emprendimiento) => (
          <div key={emprendimiento.es_emp_id} className="col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={emprendimiento.es_emp_logo}
                alt={emprendimiento.es_emp_nombre}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{emprendimiento.es_emp_nombre}</h5>
                <p className="card-text flex-grow-1">{emprendimiento.es_emp_descripcion}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary btn-sm" onClick={() => onShowModal(emprendimiento)}>
                    <PencilSquare size={18} />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emprendimiento.es_emp_id)}>
                    <TrashFill size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Emprendimientos;
