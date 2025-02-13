import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    ES_CLI_NOMBRE: '',
    ES_CLI_APELLIDO: '',
    ES_CLI_CORREO: '',
    contrasena: '',
    confirmarContrasena: '',
    ES_CLI_GENERO: '',
    ES_CLI_FECHA_NACIMIENTO: '',
    ES_CLI_DIRECCION: '',
    ES_CLI_PAIS: '',
    ES_CLI_PROVINCIA: '',
    ES_CLI_CIUDAD: '',
    ES_CLI_CODIGO_POSTAL: '',
    ES_CLI_TELEFONO: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldError, setFieldError] = useState({
    ES_CLI_NOMBRE: '',
    ES_CLI_APELLIDO: '',
    ES_CLI_CORREO: '',
    ES_CLI_PAIS: '',
    ES_CLI_PROVINCIA: '',
    ES_CLI_CIUDAD: '',
    ES_CLI_TELEFONO: '',
    ES_CLI_CODIGO_POSTAL: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = '';
    let isValid = true;

    // Validaciones por campo
    switch(name) {
      case 'ES_CLI_NOMBRE':
      case 'ES_CLI_APELLIDO':
        isValid = /^[a-zA-Z\s]*$/.test(value);  // Solo letras y espacios
        errorMsg = isValid ? '' : 'Solo se permiten letras y espacios';
        break;
      
      case 'ES_CLI_TELEFONO':
        isValid = /^\d*$/.test(value);  // Solo números
        errorMsg = isValid ? '' : 'Solo se permiten números';
        break;
      
      case 'ES_CLI_CORREO':
        isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);  // Validación de correo
        errorMsg = isValid ? '' : 'Correo no válido';
        break;
      
      case 'ES_CLI_CODIGO_POSTAL':
        isValid = /^\d*$/.test(value);  // Solo números
        errorMsg = isValid ? '' : 'Solo se permiten números';
        break;
      
      case 'ES_CLI_PAIS':
      case 'ES_CLI_PROVINCIA':
      case 'ES_CLI_CIUDAD':
        isValid = /^[a-zA-Z\s]*$/.test(value);  // Solo letras y espacios
        errorMsg = isValid ? '' : 'Solo se permiten letras y espacios';
        break;
      
      case 'contrasena':
        isValid = value.length >= 8;  // Contraseña debe ser de al menos 8 caracteres
        errorMsg = isValid ? '' : 'La contraseña debe tener al menos 8 caracteres';
        break;
      
      case 'confirmarContrasena':
        isValid = value === formData.contrasena;  // Las contraseñas deben coincidir
        errorMsg = isValid ? '' : 'Las contraseñas no coinciden';
        break;
    }

    setFieldError({ ...fieldError, [name]: errorMsg });
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...fieldError };

    // Validar campos vacíos
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'confirmarContrasena') {
        newErrors[key] = 'Este campo es obligatorio';
        isValid = false;
      }
    });

    // Validar confirmación de contraseña
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setFieldError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      setError('Por favor corrige los errores en el formulario');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/registro', formData);
      navigate('/login');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError('Error al registrar el usuario. Por favor intenta nuevamente.');
    }
  };

  return (
    <div className="container register-container">
      <h2>Registro de Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            {/* Nombre */}
            <label className="form-label text-start w-100">Nombre</label>
            <input
              type="text"
              name="ES_CLI_NOMBRE"
              placeholder="Ingrese su Nombre"
              className={`form-control ${fieldError.ES_CLI_NOMBRE && 'is-invalid'}`}
              onChange={handleChange}
              maxLength="30"
            />
            {fieldError.ES_CLI_NOMBRE && <div className="invalid-feedback">{fieldError.ES_CLI_NOMBRE}</div>}

            {/* Apellido */}
            <label className="form-label text-start w-100">Apellido</label>
            <input
              type="text"
              name="ES_CLI_APELLIDO"
              placeholder="Ingrese su Apellido"
              className={`form-control ${fieldError.ES_CLI_APELLIDO && 'is-invalid'}`}
              onChange={handleChange}
              maxLength="30"
            />
            {fieldError.ES_CLI_APELLIDO && <div className="invalid-feedback">{fieldError.ES_CLI_APELLIDO}</div>}

            {/* Correo */}
            <label className="form-label text-start w-100">Correo</label>
            <input
              type="email"
              name="ES_CLI_CORREO"
              placeholder="Ingrese su Correo"
              className={`form-control ${fieldError.ES_CLI_CORREO && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.ES_CLI_CORREO && <div className="invalid-feedback">{fieldError.ES_CLI_CORREO}</div>}

            {/* Teléfono */}
            <label className="form-label text-start w-100">Teléfono</label>
            <input
              type="text"
              name="ES_CLI_TELEFONO"
              placeholder="Ingrese su Teléfono"
              className={`form-control ${fieldError.ES_CLI_TELEFONO && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.ES_CLI_TELEFONO && <div className="invalid-feedback">{fieldError.ES_CLI_TELEFONO}</div>}

            {/* Dirección */}
            <label className="form-label text-start w-100">Dirección</label>
            <input
              type="text"
              name="ES_CLI_DIRECCION"
              placeholder="Ingrese su Dirección"
              className={`form-control ${fieldError.ES_CLI_DIRECCION && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.ES_CLI_DIRECCION && <div className="invalid-feedback">{fieldError.ES_CLI_DIRECCION}</div>}

            {/* País */}
            <label className="form-label text-start w-100">País</label>
            <input
              type="text"
              name="ES_CLI_PAIS"
              placeholder="Ingrese su País"
              className={`form-control ${fieldError.ES_CLI_PAIS && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.ES_CLI_PAIS && <div className="invalid-feedback">{fieldError.ES_CLI_PAIS}</div>}

            {/* Provincia */}
            <label className="form-label text-start w-100">Provincia</label>
            <input
              type="text"
              name="ES_CLI_PROVINCIA"
              placeholder="Ingrese su Provincia"
              className={`form-control ${fieldError.ES_CLI_PROVINCIA && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.ES_CLI_PROVINCIA && <div className="invalid-feedback">{fieldError.ES_CLI_PROVINCIA}</div>}

            {/* Ciudad */}
            <label className="form-label text-start w-100">Ciudad</label>
            <input
              type="text"
              name="ES_CLI_CIUDAD"
              placeholder="Ingrese su Ciudad"
              className={`form-control ${fieldError.ES_CLI_CIUDAD && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.ES_CLI_CIUDAD && <div className="invalid-feedback">{fieldError.ES_CLI_CIUDAD}</div>}

            {/* Código Postal */}
            <label className="form-label text-start w-100">Código Postal</label>
            <input
              type="text"
              name="ES_CLI_CODIGO_POSTAL"
              placeholder="Ingrese su Código Postal"
              className={`form-control ${fieldError.ES_CLI_CODIGO_POSTAL && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.ES_CLI_CODIGO_POSTAL && <div className="invalid-feedback">{fieldError.ES_CLI_CODIGO_POSTAL}</div>}

            {/* Contraseña */}
            <label className="form-label text-start w-100">Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="contrasena"
                placeholder="Ingrese su Contraseña"
                className={`form-control ${fieldError.contrasena && 'is-invalid'}`}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {fieldError.contrasena && <div className="invalid-feedback">{fieldError.contrasena}</div>}

            {/* Confirmar Contraseña */}
            <label className="form-label text-start w-100">Confirmar Contraseña</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmarContrasena"
              placeholder="Confirme su Contraseña"
              className={`form-control ${fieldError.confirmarContrasena && 'is-invalid'}`}
              onChange={handleChange}
            />
            {fieldError.confirmarContrasena && <div className="invalid-feedback">{fieldError.confirmarContrasena}</div>}

            {/* Botón de Registro */}
            <button type="submit" className="btn btn-primary">Registrar</button>

            {/* Enlace a Login */}
            <div className="mt-2">
              <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistroUsuario;
