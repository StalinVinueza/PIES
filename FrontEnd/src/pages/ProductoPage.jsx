import React from 'react';
import ProductosApi from '../components/ProductoApi';

function ProductoPage() {
  return (
    <div className="cliente-page">
      <div className="cliente-page-content">
        <ProductosApi />
      </div>
    </div>
  );
}

export default ProductoPage;
