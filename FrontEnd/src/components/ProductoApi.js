import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoForm from "./ProductoForm";
import ProductoList from "./ProductoList";

function ProductoApi() {
  const [productos, setProductos] = useState([]);
  const [emprendimientos, setEmprendimientos] = useState([]); // Lista de emprendimientos
  const [editData, setEditData] = useState({
    es_pro_nombre: "",
    es_pro_precio: "",
    es_pro_stock: "",
    es_pro_descripcion: "",
    es_emp_id: "", // ID del emprendimiento
    es_pro_imagen: null,
  });

  const [showModal, setShowModal] = useState(false);

  // Cargar productos y emprendimientos al montar el componente
  useEffect(() => {
    fetchProductos();
    fetchEmprendimientos();
  }, []);

  // Cargar lista de productos
  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  // Cargar lista de emprendimientos
  const fetchEmprendimientos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/emprendimientos");
      setEmprendimientos(response.data);
    } catch (error) {
      console.error("Error al cargar emprendimientos:", error);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setEditData({ ...editData, [name]: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validar que se seleccione un emprendimiento
    if (!editData.es_emp_id) {
      alert("Por favor, seleccione un emprendimiento.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("es_pro_nombre", editData.es_pro_nombre);
      formData.append("es_pro_precio", editData.es_pro_precio);
      formData.append("es_pro_stock", editData.es_pro_stock);
      formData.append("es_pro_descripcion", editData.es_pro_descripcion);
      formData.append("es_emp_id", editData.es_emp_id);
      if (editData.es_pro_imagen) {
        formData.append("es_pro_imagen", editData.es_pro_imagen);
      }

      await axios.post("http://localhost:3001/api/productos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowModal(false);
      fetchProductos(); // Recargar lista de productos
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Productos</h2>
      <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
        Agregar Producto
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Emprendimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.es_pro_nombre}</td>
              <td>{producto.es_pro_precio}</td>
              <td>{producto.es_pro_stock}</td>
              <td>{producto.es_pro_descripcion}</td>
              <td>{producto.emprendimiento_nombre}</td>
              <td>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger ms-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Producto</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <ProductoForm
                  editData={editData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  emprendimientos={emprendimientos}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductoApi;
