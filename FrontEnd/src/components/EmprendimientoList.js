import React, { useEffect, useState } from "react";
import { Eye, Trash, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../styles/EmprendimientosList.css";

function Emprendimientos({ onShowModal, isCliente }) {
  const [emprendimientos, setEmprendimientos] = useState([]);

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
                <div className="card-body">
                  <h5 className="card-title">{emprendimiento.es_emp_nombre}</h5>
                </div>
                {/* Footer con fondo de color para los botones */}
                <div className="card-footer">
                  <Link
                    to={`/emprendimientos/${emprendimiento.es_emp_id}`}
                    className="btn btn-sm btn-view"
                  >
                    <Eye size={18} />
                  </Link>

                  {/* Mostrar botones de editar y eliminar solo si no es un cliente */}
                  {!isCliente && (
                    <>
                      <button
                        className="btn btn-sm btn-edit"
                        onClick={() => onShowModal(emprendimiento)}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="btn btn-sm btn-delete"
                        onClick={() => handleDelete(emprendimiento.es_emp_id)}
                      >
                        <Trash size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Emprendimientos;