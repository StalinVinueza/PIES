import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const esCliId = 2; // ID del cliente (puedes obtenerlo de sesión)

  // 🔄 Cargar productos disponibles al iniciar
  useEffect(() => {
    axios.get("http://localhost:3001/api/productos")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));

    fetchCart(); // Cargar carrito al iniciar
  }, []);

  // 🛒 Cargar el carrito del usuario
  const fetchCart = () => {
    axios.get(`http://localhost:3001/api/compra/${esCliId}`)
      .then(response => setCarrito(response.data))
      .catch(error => console.error("Error al obtener el carrito:", error));
  };

  // ➕ Agregar un producto al carrito
  const addToCart = (productoId) => {
    axios.post("http://localhost:3001/api/compra", {
      es_cli_id: esCliId,
      es_pro_id: productoId,
      cantidad: 1
    })
    .then(() => {
      fetchCart();
      alert("Producto agregado al carrito");
    })
    .catch(error => console.error("Error al agregar producto:", error));
  };

  // ❌ Eliminar un producto del carrito
  const removeFromCart = (detalleId) => {
    axios.delete(`http://localhost:3001/api/compra/${detalleId}`)
      .then(() => fetchCart())
      .catch(error => console.error("Error al eliminar producto:", error));
  };

  // ✅ Finalizar la compra
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
        <div className="col-md-8">
          <div className="row">
            {productos.map((producto) => (
              <div key={producto.es_pro_id} className="col-md-3 mb-3">
                <div className="card h-100">
                  <img src={`http://localhost:3001/uploads/${producto.es_pro_imagen}`} className="card-img-top" alt={producto.es_pro_nombre} />
                  <div className="card-body">
                    <h5 className="card-title">{producto.es_pro_nombre}</h5>
                    <p className="card-text">Precio: ${producto.es_pro_precio}</p>
                    <p className="card-text">Stock: {producto.es_pro_stock}</p>
                    <button className="btn btn-primary" onClick={() => addToCart(producto.es_pro_id)}>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>🛍️ Carrito de Compras</h5>
            </div>
            <div className="card-body">
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
