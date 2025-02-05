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

  const handleDeleteEmprendimiento = (id) => {
    console.log("Intentando eliminar el emprendimiento con ID:", id); // 🛠️ Debugging
  
    if (!id) {
      console.error("Error: El ID del emprendimiento es undefined");
      return;
    }
  
    if (window.confirm("¿Estás seguro de eliminar este emprendimiento?")) {
      fetch(`http://localhost:3001/api/emprendimientos/${id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo eliminar el emprendimiento.");
          }
          return response.json();
        })
        .then(() => {
          setEmprendimientos((prev) => prev.filter((emp) => emp.es_emp_id !== id));
        })
        .catch((error) => console.error("Error al eliminar:", error));
    }
  };
  

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Emprendimientos</h1>
      <div className="row">
      {emprendimientos.map((emprendimiento, index) => (
  <div key={emprendimiento.es_emp_id || index} className="col-md-4 col-lg-3 mb-4">
    <div className="card shadow-sm h-100">
      <img
        src={`http://localhost:3001${emprendimiento.ES_EMP_LOGO}`}
        alt={emprendimiento.ES_EMP_NOMBRE}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{emprendimiento.ES_EMP_NOMBRE}</h5>
        <p className="card-text flex-grow-1">{emprendimiento.ES_EMP_DESCRIPCION}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary btn-sm" onClick={() => onShowModal(emprendimiento)}>
            <PencilSquare size={18} />
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEmprendimiento(emprendimiento.es_emp_id)}>
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
