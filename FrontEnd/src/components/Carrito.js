// Cart.js (Frontend)
import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const es_cli_id = 1; // ID del cliente (puedes obtenerlo de sesión)

  // 🔄 Cargar productos disponibles al iniciar
  useEffect(() => {
    axios.get("http://localhost:3001/api/productos")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));

    fetchCart(); // Cargar carrito al iniciar
  }, []);

  // 🛒 Cargar el carrito del usuario
  const fetchCart = () => {
    axios.get(`http://localhost:3001/api/compra/${es_cli_id}`)
      .then(response => setCarrito(response.data))
      .catch(error => console.error("Error al obtener el carrito:", error));
  };

  // ➕ Agregar un producto al carrito
  const addToCart = (productoId) => {
    axios.post("http://localhost:3001/api/compra", {
      es_cli_id,
      es_pro_id: productoId,
      cantidad: 1
    })
    .then(() => {
      fetchCart(); // Recargar carrito
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
      es_cli_id,
      es_met_pago_id: 2 // Supongamos que usa "Tarjeta de Crédito"
    })
    .then(response => {
      alert("Compra finalizada. Número de Factura: " + response.data.factura_id);
      setCarrito([]); // Limpiar el carrito después de la compra
    })
    .catch(error => console.error("Error al finalizar la compra:", error));
  };

  return (
    <div className="container">
      <h2 className="my-3">🛒 Productos Disponibles</h2>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-3 mb-3">
            <div className="card">
              <div className="d-flex">
                <div className="w-50">
                  <img src={`http://localhost:3001/uploads/${producto.imagen}`} className="card-img-top" alt={producto.nombre} />
                </div>
                <div className="w-50 p-2">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">${producto.precio}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(producto.id)}>Agregar al Carrito</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end">
        <div className="w-25">
          <h2 className="my-3">🛍️ Carrito de Compras</h2>
          {carrito.length === 0 ? <p>No hay productos en el carrito</p> : (
            <ul className="list-group">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.nombre} - {item.cantidad} unidades - ${item.subtotal}
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>❌</button>
                </li>
              ))}
            </ul>
          )}

          {carrito.length > 0 && (
            <button className="btn btn-success mt-3" onClick={finalizePurchase}>Finalizar Compra</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
