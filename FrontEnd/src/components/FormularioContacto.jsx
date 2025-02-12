import React, { useState } from 'react';

function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    celular: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    celular: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Validar Nombre (No vacío)
    if (!formData.nombre.trim()) {
      valid = false;
      errors.nombre = 'El nombre es obligatorio';
    }

    // Validar Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      valid = false;
      errors.email = 'Por favor ingrese un correo electrónico válido';
    }

    // Validar Número de celular (Solo números, 10 dígitos)
    const celularRegex = /^[0-9]{10}$/;
    if (!celularRegex.test(formData.celular)) {
      valid = false;
      errors.celular = 'El número de celular debe tener 10 dígitos';
    }

    // Validar Mensaje (No vacío)
    if (!formData.mensaje.trim()) {
      valid = false;
      errors.mensaje = 'El mensaje es obligatorio';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      return; // No enviar si hay errores
    }

    try {
      const response = await fetch('http://localhost:3001/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Mensaje enviado correctamente');
        setFormData({ nombre: '', email: '', celular: '', mensaje: '' });
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
        {/* Campo Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
        </div>

        {/* Campo Correo Electrónico */}
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Campo Número Celular */}
        <div className="mb-3">
          <label className="form-label">Número de Celular</label>
          <input
            type="text"
            className="form-control"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            placeholder="Ej. 0981234567"
          />
          {errors.celular && <div className="text-danger">{errors.celular}</div>}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            className="form-control"
            rows="4"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
          />
          {errors.mensaje && <div className="text-danger">{errors.mensaje}</div>}
        </div>

        {/* Botón Enviar */}
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: '#636b2f', borderColor: '#636b2f', color: 'white' }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormularioContacto;
