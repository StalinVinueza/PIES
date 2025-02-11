import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EmprendimientoDetailPage() {
  const { id } = useParams(); // Obtener el ID del emprendimiento de la URL
  const [emprendimiento, setEmprendimiento] = useState(null);

  useEffect(() => {
    const fetchEmprendimiento = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/emprendimientos/${id}`);
        setEmprendimiento(response.data);
      } catch (error) {
        console.error("Error al obtener el emprendimiento:", error);
      }
    };

    fetchEmprendimiento();
  }, [id]);

  if (!emprendimiento) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container my-4">
      <div className="row d-flex align-items-center">
        <div className="col-md-8 text-center">
          <h1>{emprendimiento.es_emp_nombre}</h1>
          <p><strong>Descripción:</strong> {emprendimiento.es_emp_descripcion}</p>
        </div>
        <div className="col-md-4 text-end">
          <img
            src={`http://localhost:3001${emprendimiento.es_emp_logo}`}
            alt={emprendimiento.es_emp_nombre}
            className="img-fluid"
            style={{ maxWidth: '200px' }} // Limitar el tamaño del logo
          />
        </div>
      </div>
    </div>
  );
}

export default EmprendimientoDetailPage;
