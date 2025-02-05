import React from 'react';

function EmprendimientoModal({ show, handleClose, editData, handleChange, handleUpdate }) {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editData.es_emp_id ? 'Editar Emprendimiento' : 'Nuevo Emprendimiento'}</h2>
        <input
          type="text"
          name="es_emp_nombre"
          placeholder="Nombre"
          value={editData.es_emp_nombre}
          onChange={handleChange}
        />
        <textarea
          name="es_emp_descripcion"
          placeholder="Descripción"
          value={editData.es_emp_descripcion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="es_emp_logo"
          placeholder="Logo"
          value={editData.es_emp_logo}
          onChange={handleChange}
        />
        <button onClick={handleUpdate}>Guardar</button>
        <button onClick={handleClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default EmprendimientoModal;
