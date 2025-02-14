import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductoDetallePage.css";
import ProductoForm from "../components/ProductoForm";
import ProductoModal from "../components/ProductoModal";

function ProductoDetailPage() {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [editData, setEditData] = useState({
    es_pro_id: id, // Asignar el ID del producto por defecto
    es_pro_nombre: "",
    es_pro_precio: "",
    es_pro_stock: "",
    es_pro_descripcion: "",
    es_pro_imagen: null
  });

  // Cargar los detalles del producto
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los detalles del producto
        const response = await axios.get(`http://localhost:3001/api/productos/${id}`);
        setProducto(response.data);
        setEditData(response.data); // Poblamos el formulario con los datos del producto
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al cargar los datos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Mostrar modal para editar producto
  const handleShowModal = () => setShowModal(true);

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
    <div className="detalle-producto">
  {/* Título principal centrado en la parte superior */}
  <h1 className="detalle-titulo">{producto.es_pro_nombre}</h1>

  <div className="detalle-contenedor">
    <div className="detalle-texto">
     
      
      <label className="detalle-label">Descripción:</label>
      <p>{producto.es_pro_descripcion}</p>
      
      <label className="detalle-label">Precio:</label>
      <p>${producto.es_pro_precio}</p>
      
      <label className="detalle-label">Stock:</label>
      <p>{producto.es_pro_stock}</p>
    </div>

    <div className="detalle-imagen">
      <img
        src={`http://localhost:3001${producto.es_pro_imagen}`}
        alt={producto.es_pro_nombre}
        className="img-producto"
      />
    </div>
  </div>

  {/* Botón para abrir el modal de edición */}
  <button className="btn btn-primary" onClick={handleShowModal}>
    Editar Producto
  </button>
</div>

  );
}

export default ProductoDetailPage;
