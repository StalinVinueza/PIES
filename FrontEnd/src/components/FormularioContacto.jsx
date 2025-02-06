import React, { useState } from 'react';

function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Mensaje enviado correctamente');
        setFormData({ nombre: '', email: '', mensaje: '' });
      } else {
        alert('Hubo un error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      alert('Error en el servidor');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Envíanos un mensaje</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow-sm bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea className="form-control" rows="4" name="mensaje" value={formData.mensaje} onChange={handleChange} required></textarea>
        </div>
        <button 
          type="submit" 
          className="btn w-100" 
          style={{
            backgroundColor: "#636b2f", 
            borderColor: "#636b2f", 
            color: "white"
          }}>
          Enviar
        </button>

      </form>
    </div>
  );
}

export default FormularioContacto;
