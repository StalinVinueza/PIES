import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle } from "react-bootstrap-icons";

function Cart() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const esCliId = 3; // ID del cliente (puedes obtenerlo de sesión)

  useEffect(() => {
    fetchProductos();
    fetchCart();
  }, []);

  const fetchProductos = () => {
    axios.get("http://localhost:3001/api/productos")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));
  };

  const fetchCart = () => {
    axios.get(`http://localhost:3001/api/compra/${esCliId}`)
      .then(response => setCarrito(response.data))
      .catch(error => console.error("Error al obtener el carrito:", error));
  };

  const addToCart = (productoId) => {
    axios.post("http://localhost:3001/api/compra", {
      es_cli_id: esCliId,
      es_pro_id: productoId,
      cantidad: 1
    })
    .then(response => {
      if (response.status === 200) {
        fetchCart();
        alert("Producto agregado al carrito");
      } else {
        console.error("Error al agregar producto:", response.data);
        alert("Error al agregar producto");
      }
    })
    .catch(error => console.error("Error al agregar producto:", error));
  };

  const removeFromCart = (detalleId) => {
    axios.delete(`http://localhost:3001/api/compra/${detalleId}`)
      .then(response => {
        if (response.status === 200) {
          fetchCart();
          alert("Producto eliminado del carrito");
        } else {
          console.error("Error al eliminar producto:", response.data);
          alert("Error al eliminar producto");
        }
      })
      .catch(error => console.error("Error al eliminar producto:", error));
  };

  //Finalizar la compra
  const finalizePurchase = () => {
    axios.post("http://localhost:3001/api/compra/finalizar", {
      es_cli_id: esCliId,
      es_met_pago_id: 2 // Método de pago
    })
    .then(response => {
      alert("Compra finalizada. Número de Factura: " + response.data.factura_id);
      setCarrito([]);
    })
    .catch(error => console.error("Error al finalizar la compra:", error));
  };

  return (
    <div className="container">
      <h2 className="my-3">🛒 Productos Disponibles</h2>

      <div className="row">
        {/* Columna de productos */}
        <div className="col-md-8">
          <div className="row">
            {productos.map((producto) => (
              <div key={producto.es_pro_id} className="col-md-6 mb-3">
                <div className="card h-60 d-flex flex-row">
                  {/* Imagen a la izquierda */}
                  <img
                    src={
                      producto.es_pro_imagen?.startsWith("/uploads/")
                        ? `http://localhost:3001${producto.es_pro_imagen}`
                        : `http://localhost:3001/uploads/${producto.es_pro_imagen}`
                    }
                    alt={producto.es_pro_nombre}
                    className="card-img-left"
                    style={{ width: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  {/* Contenido de la card a la derecha */}
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{producto.es_pro_nombre}</h5>
                    <p className="card-text">Precio: ${producto.es_pro_precio}</p>
                    <p className="card-text">Stock: {producto.es_pro_stock}</p>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#264653", color: "white" }}
                      onClick={() => addToCart(producto.es_pro_id)}
                    >
                      <PlusCircle size={20} className="me-2" />
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna del carrito */}
        <div className="col-md-4 position-fixed" style={{ top: "20px", right: "20px", width: "300px", zIndex: 100 }}>
          <div className="card">
            <div className="card-header">
              <h5>🛍️ Carrito de Compras</h5>
            </div>
            <div className="card-body" style={{ maxHeight: "500px", overflowY: "auto" }}>
              {carrito.length === 0 ? <p>No hay productos en el carrito</p> : (
                <ul className="list-group">
                  {carrito.map((item) => (
                    <li key={item.es_fac_det_id} className="list-group-item d-flex justify-content-between align-items-center">
                      {item.es_pro_nombre} - {item.es_fac_det_cantidad} uds - ${item.es_fac_det_subtotal}
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.es_fac_det_id)}>❌</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="card-footer text-center">
              {carrito.length > 0 && (
                <button className="btn btn-success" onClick={finalizePurchase}>Finalizar Compra</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
