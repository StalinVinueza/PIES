import React from "react";

function ProductoForm({ editData, handleChange, handleSubmit, emprendimientos }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre del Producto</label>
        <input
          type="text"
          className="form-control"
          name="es_pro_nombre"
          value={editData.es_pro_nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          name="es_pro_precio"
          value={editData.es_pro_precio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          name="es_pro_stock"
          value={editData.es_pro_stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          name="es_pro_descripcion"
          value={editData.es_pro_descripcion}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Selector de Emprendimiento */}
      <div className="mb-3">
        <label className="form-label">Emprendimiento</label>
        <select
          className="form-control"
          name="es_emp_id"
          value={editData.es_emp_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un Emprendimiento</option>
          {emprendimientos.map((emp) => (
            <option key={emp.es_emp_id} value={emp.es_emp_id}>
              {emp.es_emp_nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen</label>
        <input
          type="file"
          className="form-control"
          name="es_pro_imagen"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
}

export default ProductoForm;
