import React from 'react';

function EmprendimientoList({ emprendimientos, onShowModal, onDelete }) {
  return (
    <div>
      <ul>
        {emprendimientos.map((emprendimiento) => (
          <li key={emprendimiento.es_emp_id}>
            {emprendimiento.es_emp_nombre} - {emprendimiento.es_emp_descripcion}
            <button onClick={() => onShowModal(emprendimiento)}>Editar</button>
            <button onClick={() => onDelete(emprendimiento.es_emp_id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmprendimientoList;
