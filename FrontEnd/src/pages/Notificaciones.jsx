import React from 'react';
import { toast } from 'react-toastify';

function Notificacion() {
  const mostrarNotificacion = () => {
    toast("¡Regístrate para obtener acceso exclusivo!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <button onClick={mostrarNotificacion}>Mostrar notificación</button>
  );
}

export default Notificacion;