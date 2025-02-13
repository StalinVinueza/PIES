import React, { useState } from 'react';
import '../components/Contactos.css';

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
    const { name, value } = e.target;
    let newErrors = { ...errors };

    // Validaciones en tiempo real
    if (name === 'nombre') {
      // Solo letras y espacios
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        newErrors.nombre = 'Caracter no válido. Solo se permiten letras y espacios.';
        setErrors(newErrors);
        return;  // Bloquear la entrada
      } else {
        newErrors.nombre = '';
      }
    }

    if (name === 'celular') {
      // Solo números, máximo 10 caracteres
      if (!/^\d*$/.test(value) || value.length > 10) {
        newErrors.celular = 'Caracter no válido. Solo se permiten números, hasta 10 dígitos.';
        setErrors(newErrors);
        return;  // Bloquear la entrada
      } else {
        newErrors.celular = '';
      }
    }

    setErrors(newErrors);
    setFormData({ ...formData, [name]: value });
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

    // Validar Número de celular (10 dígitos exactos)
    if (formData.celular.length !== 10) {
      valid = false;
      errors.celular = 'El número de celular debe tener exactamente 10 dígitos';
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
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ nombre: '', email: '', celular: '', mensaje: '' });
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Envíanos un mensaje</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow-sm bg-light rounded">
        
        {/* Nombre */}
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

        {/* Correo Electrónico */}
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

        {/* Celular */}
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

        {/* Mensaje */}
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
        <button type="submit" className="btn w-100">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormularioContacto;
