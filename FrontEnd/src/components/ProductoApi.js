import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoList from "./ProductoList";
import ProductoModal from "./ProductoModal";
import ProductoForm from "./ProductoForm";

function ProductosApi({ emprendimientoId }) {  // Recibe el ID del emprendimiento como prop
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    es_pro_id: "",
    es_emp_id: emprendimientoId,  // Usa el ID del emprendimiento recibido como prop
    es_pro_nombre: "",
    es_pro_precio: "",
    es_pro_stock: "",
    es_pro_descripcion: "",
    es_pro_imagen: null
  });

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario")); // Obtén el usuario del localStorage
        const response = await axios.get(
          `http://localhost:3001/api/productos/usuario/${usuario.id}/emprendimiento/${emprendimientoId}` // Filtra por ID de usuario e ID de emprendimiento
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setProductos([]);
      }
    };

    fetchProductos();
  }, [emprendimientoId]);  // Dependencia: cuando cambie el ID del emprendimiento, se vuelven a cargar los productos

  // Mostrar modal para nuevo o editar producto
  const handleShowModal = (producto = {}) => {
    const usuario = JSON.parse(localStorage.getItem("usuario")); // Obtén el usuario del localStorage
    setEditData({
      es_pro_id: producto.es_pro_id || "",
      es_emp_id: emprendimientoId, // Usa el ID del emprendimiento actual
      es_cli_id: usuario.id, // Asigna el ID del usuario actual
      es_pro_nombre: producto.es_pro_nombre || "",
      es_pro_precio: producto.es_pro_precio || "",
      es_pro_stock: producto.es_pro_stock || "",
      es_pro_descripcion: producto.es_pro_descripcion || "",
      es_pro_imagen: producto.es_pro_imagen || null,
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
    formData.append("es_cli_id", editData.es_cli_id); // Envía el ID del usuario
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

  return (
    <div className="container">
      <h1 className="text-center my-4">Lista de Productos</h1>
      <button className="btn btn-success mb-3" onClick={() => handleShowModal()}>
        Nuevo Producto
      </button>

      <ProductoList productos={productos} onShowModal={handleShowModal} />

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

export default ProductosApi;