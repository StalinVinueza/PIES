import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EmprendimientoDetallePage.css";

import ProductosApi from "../components/ProductoApi";  // Importa el componente ProductosApi

function EmprendimientoDetailPage() {
  const { id } = useParams(); // Obtener el ID del emprendimiento de la URL
  const [emprendimiento, setEmprendimiento] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const usuario = JSON.parse(localStorage.getItem("usuario")); // Obtén el usuario del localStorage

  // Cargar los detalles del emprendimiento
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los detalles del emprendimiento
        const emprendimientoResponse = await axios.get(`http://localhost:3001/api/emprendimientos/${id}`);
        setEmprendimiento(emprendimientoResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al cargar los datos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchData();
  }, [id]);

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Mostrar un mensaje de error si ocurre algún problema
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="detalle-emprendimiento">
      <div className="detalle-contenedor">
        <div className="detalle-texto">
          <h1 className="detalle-titulo">{emprendimiento.es_emp_nombre}</h1>
          <p
            className="detalle-descripcion"
            dangerouslySetInnerHTML={{ __html: emprendimiento.es_emp_descripcion }}
          />
        </div>
        <div className="detalle-imagen">
          <img
            src={`http://localhost:3001${emprendimiento.es_emp_logo}`}
            alt={emprendimiento.es_emp_nombre}
            className="img-logoemp"
          />
        </div>
      </div>

      {/* Sección para mostrar los productos */}
      <div className="productos-section">
        <h2>Productos</h2>
        {/* Mostrar el componente ProductosApi y pasarle el ID del emprendimiento */}
        <ProductosApi emprendimientoId={id} />
      </div>
    </div>
  );
}

export default EmprendimientoDetailPage;