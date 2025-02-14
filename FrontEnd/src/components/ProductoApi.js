import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoForm from "./ProductoForm";
import ProductoList from "./ProductoList";
import { PlusCircle } from "react-bootstrap-icons";

function ProductoApi() {
  const [productos, setProductos] = useState([]);
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [editData, setEditData] = useState({
    es_pro_id: "",
    es_pro_nombre: "",
    es_pro_precio: "",
    es_pro_stock: "",
    es_pro_descripcion: "",
    es_emp_id: "",
    es_pro_imagen: null,
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProductos();
    fetchEmprendimientos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const fetchEmprendimientos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/emprendimientos");
      setEmprendimientos(response.data);
    } catch (error) {
      console.error("Error al cargar emprendimientos:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setEditData({ ...editData, [name]: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      if (editData.es_pro_id) {
        // Actualización de producto existente
        await axios.put(`http://localhost:3001/api/productos/${editData.es_pro_id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Creación de nuevo producto
        await axios.post("http://localhost:3001/api/productos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      fetchProductos();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Lista de Productos</h2>
      <button className="btn"
  style={{ backgroundColor: "#264653", color: "white" }} onClick={() => setShowModal(true)}>
    <PlusCircle size={20} className="me-2" />
        Agregar Producto
      </button>
      </div>

      <ProductoList 
        productos={productos} 
        emprendimientos={emprendimientos} 
        onShowModal={(producto) => {
          setEditData(producto);
          setShowModal(true);
        }}
      />

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editData.es_pro_id ? "Editar Producto" : "Nuevo Producto"}</h5>
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