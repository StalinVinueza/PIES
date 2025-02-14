import React, { useState, useEffect } from 'react';
import ProductosApi from '../components/ProductoApi';
import ProductoModal from '../components/ProductoModal'; // Modal de producto

const ProductoPage = () => {
  const [productos, setProductos] = useState([]);
  const [editData, setEditData] = useState({ es_prod_nombre: '', es_prod_descripcion: '', es_prod_precio: 0, es_prod_logo: null });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/productos');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('es_prod_nombre', editData.es_prod_nombre);
    formData.append('es_prod_descripcion', editData.es_prod_descripcion);
    formData.append('es_prod_precio', editData.es_prod_precio);
    if (editData.es_prod_logo instanceof File) {
      formData.append('es_prod_logo', editData.es_prod_logo);
    }

    try {
      await fetch('http://localhost:3001/api/productos', {
        method: 'POST',
        body: formData,
      });

      setShowModal(false);
      setEditData({ es_prod_nombre: '', es_prod_descripcion: '', es_prod_precio: 0, es_prod_logo: null });
      fetchProductos(); // Recarga la lista de productos
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <div className="producto-page-content">
      <ProductosApi onShowModal={handleShowModal} />

      <ProductoModal
        show={showModal}
        handleClose={handleCloseModal}
        editData={editData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductoPage;
