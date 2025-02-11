import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EmprendimientoDetallePage.css";
import ProductoModal from "../components/ProductoModal";
import ProductoForm from "../components/ProductoForm";

function EmprendimientoDetailPage() {
  const { id } = useParams(); // Obtener el ID del emprendimiento de la URL
  const [emprendimiento, setEmprendimiento] = useState(null);
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [editData, setEditData] = useState({ // Estado para manejar los datos del formulario
    es_pro_id: "",
    es_emp_id: id, // Asignar el ID del emprendimiento por defecto
    es_pro_nombre: "",
    es_pro_precio: "",
    es_pro_stock: "",
    es_pro_descripcion: "",
    es_pro_imagen: null
  });

  // Cargar los detalles del emprendimiento y los productos asociados
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los detalles del emprendimiento
        const emprendimientoResponse = await axios.get(`http://localhost:3001/api/emprendimientos/${id}`);
        setEmprendimiento(emprendimientoResponse.data);

        // Obtener los productos asociados al emprendimiento
        const productosResponse = await axios.get(`http://localhost:3001/api/productos/emprendimiento/${id}`);
        setProductos(productosResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al cargar los datos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchData();
  }, [id]);

  // Mostrar modal para nuevo producto
  const handleShowModal = () => {
    setEditData({
      es_pro_id: "",
      es_emp_id: id, // Asignar el ID del emprendimiento por defecto
      es_pro_nombre: "",
      es_pro_precio: "",
      es_pro_stock: "",
      es_pro_descripcion: "",
      es_pro_imagen: null
    });
    setShowModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => setShowModal(false);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    if (e.target.name === "es_pro_imagen") {
      if (e.target.files && e.target.files[0]) {
        setEditData((prev) => ({
          ...prev,
          es_pro_imagen: e.target.files[0]
        }));
      }
    } else {
      setEditData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  // Guardar o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("es_emp_id", editData.es_emp_id);
    formData.append("es_pro_nombre", editData.es_pro_nombre);
    formData.append("es_pro_precio", editData.es_pro_precio);
    formData.append("es_pro_stock", editData.es_pro_stock);
    formData.append("es_pro_descripcion", editData.es_pro_descripcion);
    if (editData.es_pro_imagen instanceof File) {
      formData.append("es_pro_imagen", editData.es_pro_imagen);
    }

    try {
      let response;
      if (editData.es_pro_id) {
        response = await axios.put(
          `http://localhost:3001/api/productos/${editData.es_pro_id}`,
          formData
        );
      } else {
        response = await axios.post("http://localhost:3001/api/productos", formData);
      }

      console.log("Respuesta del servidor:", response.data);
      setShowModal(false);
      window.location.reload(); // Recargar la página para ver los cambios
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

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
          {/* Usamos dangerouslySetInnerHTML para renderizar HTML almacenado en la base de datos */}
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
        <button className="btn btn-success mb-3" onClick={handleShowModal}>
          Nuevo Producto
        </button>
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <div className="productos-list">
            {productos.map((producto) => (
              <div key={producto.es_pro_id} className="producto-card">
                <img
                  src={`http://localhost:3001${producto.es_pro_imagen}`}
                  alt={producto.es_pro_nombre}
                  className="producto-imagen"
                />
                <h3>{producto.es_pro_nombre}</h3>
                <p>{producto.es_pro_descripcion}</p>
                <p>Precio: ${producto.es_pro_precio}</p>
                <p>Stock: {producto.es_pro_stock}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para crear/editar productos */}
      {showModal && (
        <ProductoModal
          show={showModal}
          handleClose={handleCloseModal}
          editData={editData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        >
          <ProductoForm editData={editData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </ProductoModal>
      )}
    </div>
  );
}

export default EmprendimientoDetailPage;