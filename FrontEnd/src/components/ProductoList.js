import React, { useEffect, useState } from "react";
import { Pencil, Trash, Eye } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../styles/ProductosList.css"; // Importa el archivo CSS específico

function ProductoList({ onShowModal }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la carga de productos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setProductos(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setProductos([]);
      });
  }, []);

  // Función para eliminar un producto
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      fetch(`http://localhost:3001/api/productos/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el producto");
          }
          setProductos((prev) => prev.filter((prod) => prod.es_pro_id !== id));
        })
        .catch((error) => console.error("Error al eliminar:", error));
    }
  };

  return (
    <div className="container-pro py-4">
      {productos.length === 0 ? (
        <p className="text-center">No hay productos disponibles.</p>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <div key={producto.es_pro_id} className="col-md-4 col-lg-3 mb-4">
              <div className="card-pro shadow-sm h-100">
                <img
                  src={
                    producto.es_pro_imagen?.startsWith("/uploads/")
                      ? `http://localhost:3001${producto.es_pro_imagen}`
                      : `http://localhost:3001/uploads/${producto.es_pro_imagen}`
                  }
                  alt={producto.es_pro_nombre}
                  className="card-img-top-pro"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                <div className="card-body-pro d-flex flex-column">
                  <h5 className="card-title-pro">{producto.es_pro_nombre}</h5>
                  <p className="card-text-pro flex-grow-1">{producto.es_pro_descripcion}</p>
                  <p className="card-text-pro">Precio: ${producto.es_pro_precio}</p>
                  <p className="card-text-pro">Stock: {producto.es_pro_stock}</p>
                  </div>
                  <div className="card-footer-pro">
                    {/* Botón de ver */}
                    <Link
                      to={`/productos/${producto.es_pro_id}`} // Ajusta la ruta según tu aplicación
                      className="btn btn-sm btn-view-pro"
                    >
                      <Eye size={18} />
                    </Link>

                    {/* Botón de editar */}
                    <button
                      className="btn btn-sm btn-edit-pro"
                      onClick={() => onShowModal(producto)}
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Botón de eliminar */}
                    <button
                      className="btn btn-sm btn-delete-pro"
                      onClick={() => handleDelete(producto.es_pro_id)}
                    >
                      <Trash size={18} />
                    </button>
                    
                  </div>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductoList;