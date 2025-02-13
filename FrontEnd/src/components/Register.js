import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importar íconos de Font Awesome
import { Link } from "react-router-dom";  // Importar Link para redirección

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    ES_CLI_NOMBRE: '',
    ES_CLI_APELLIDO: '',
    ES_CLI_CORREO: '',
    contrasena: '',
    confirmContrasena: '', // Nuevo campo para confirmar la contraseña
    ES_CLI_GENERO: '',
    ES_CLI_FECHA_NACIMIENTO: '',
    ES_CLI_DIRECCION: '',
    ES_CLI_PAIS: '',
    ES_CLI_PROVINCIA: '',
    ES_CLI_CIUDAD: '',
    ES_CLI_CODIGO_POSTAL: '',
    ES_CLI_TELEFONO_1: '',
    ES_CLI_TELEFONO_2: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la confirmación de contraseña
  const [formErrors, setFormErrors] = useState({}); // Estado para los errores de validación
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    // Validación de campos obligatorios
    if (!formData.ES_CLI_NOMBRE) errors.ES_CLI_NOMBRE = 'El nombre es obligatorio.';
    if (!formData.ES_CLI_APELLIDO) errors.ES_CLI_APELLIDO = 'El apellido es obligatorio.';
    if (!formData.ES_CLI_CORREO) errors.ES_CLI_CORREO = 'El correo es obligatorio.';
    if (!formData.contrasena) errors.contrasena = 'La contraseña es obligatoria.';
    if (!formData.confirmContrasena) errors.confirmContrasena = 'Debe confirmar su contraseña.';
    if (!formData.ES_CLI_FECHA_NACIMIENTO) errors.ES_CLI_FECHA_NACIMIENTO = 'La fecha de nacimiento es obligatoria.';
    if (!formData.ES_CLI_DIRECCION) errors.ES_CLI_DIRECCION = 'La dirección es obligatoria.';
    if (!formData.ES_CLI_PAIS) errors.ES_CLI_PAIS = 'El país es obligatorio.';
    if (!formData.ES_CLI_PROVINCIA) errors.ES_CLI_PROVINCIA = 'La provincia es obligatoria.';
    if (!formData.ES_CLI_CIUDAD) errors.ES_CLI_CIUDAD = 'La ciudad es obligatoria.';
    if (!formData.ES_CLI_CODIGO_POSTAL) errors.ES_CLI_CODIGO_POSTAL = 'El código postal es obligatorio.';
    if (!formData.ES_CLI_TELEFONO_1) errors.ES_CLI_TELEFONO_1 = 'El teléfono es obligatorio.';

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.ES_CLI_CORREO && !emailRegex.test(formData.ES_CLI_CORREO)) {
      errors.ES_CLI_CORREO = 'El correo electrónico no es válido.';
    }

    // Validación de contraseñas coincidentes
    if (formData.contrasena && formData.confirmContrasena && formData.contrasena !== formData.confirmContrasena) {
      errors.confirmContrasena = 'Las contraseñas no coinciden.';
    }

    // Validación de teléfono (solo números)
    const phoneRegex = /^[0-9]{10,15}$/; // El teléfono debe ser numérico y tener entre 10 y 15 dígitos
    if (formData.ES_CLI_TELEFONO_1 && !phoneRegex.test(formData.ES_CLI_TELEFONO_1)) {
      errors.ES_CLI_TELEFONO_1 = 'El teléfono no es válido.';
    }

    // Validación de código postal (solo números)
    if (formData.ES_CLI_CODIGO_POSTAL && isNaN(formData.ES_CLI_CODIGO_POSTAL)) {
      errors.ES_CLI_CODIGO_POSTAL = 'El código postal debe ser numérico.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Si hay errores, no enviamos el formulario
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/registro', formData);
      navigate('/login');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container register-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            {/* Nombre */}
            <label className="form-label text-start w-100">Nombre</label>
            <input
              type="text"
              name="ES_CLI_NOMBRE"
              placeholder="Ingrese su Nombre"
              className="form-control form-control-sm no_caracteres"
              onChange={handleChange}
              required
              maxLength="30"
            />
            {formErrors.ES_CLI_NOMBRE && <div className="alert alert-danger">{formErrors.ES_CLI_NOMBRE}</div>}

            {/* Apellido */}
            <label className="form-label text-start w-100">Apellido</label>
            <input
              type="text"
              name="ES_CLI_APELLIDO"
              placeholder="Ingrese su Apellido"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_APELLIDO && <div className="alert alert-danger">{formErrors.ES_CLI_APELLIDO}</div>}

            {/* Correo */}
            <label className="form-label text-start w-100">Correo</label>
            <input
              type="email"
              name="ES_CLI_CORREO"
              placeholder="Ingrese un Correo"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_CORREO && <div className="alert alert-danger">{formErrors.ES_CLI_CORREO}</div>}

            {/* Contraseña */}
            <label className="form-label text-start w-50">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="contrasena"
                placeholder="Ingrese una Contraseña"
                className="form-control"
                onChange={handleChange}
                required
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-light" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {formErrors.contrasena && <div className="alert alert-danger">{formErrors.contrasena}</div>}

            {/* Confirmar Contraseña */}
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmContrasena"
                placeholder="Confirme su Contraseña"
                className="form-control"
                onChange={handleChange}
                required
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-light" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {formErrors.confirmContrasena && <div className="alert alert-danger">{formErrors.confirmContrasena}</div>}

            {/* Otros campos */}
            <label className="form-label text-start w-100">Género</label>
            <select
              name="ES_CLI_GENERO"
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value="">Seleccione su Género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>

            <label className="form-label text-start w-100">Fecha de Nacimiento</label>
            <input
              type="date"
              name="ES_CLI_FECHA_NACIMIENTO"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_FECHA_NACIMIENTO && <div className="alert alert-danger">{formErrors.ES_CLI_FECHA_NACIMIENTO}</div>}

            {/* Dirección, País, Provincia, Ciudad, Código Postal, Teléfonos */}
            <label className="form-label text-start w-100">Dirección</label>
            <input
              type="text"
              name="ES_CLI_DIRECCION"
              placeholder="Ingrese su Dirección"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_DIRECCION && <div className="alert alert-danger">{formErrors.ES_CLI_DIRECCION}</div>}

            <label className="form-label text-start w-100">País</label>
            <input
              type="text"
              name="ES_CLI_PAIS"
              placeholder="Ingrese su País"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_PAIS && <div className="alert alert-danger">{formErrors.ES_CLI_PAIS}</div>}

            <label className="form-label text-start w-100">Provincia</label>
            <input
              type="text"
              name="ES_CLI_PROVINCIA"
              placeholder="Ingrese su Provincia"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_PROVINCIA && <div className="alert alert-danger">{formErrors.ES_CLI_PROVINCIA}</div>}

            <label className="form-label text-start w-100">Ciudad</label>
            <input
              type="text"
              name="ES_CLI_CIUDAD"
              placeholder="Ingrese su Ciudad"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_CIUDAD && <div className="alert alert-danger">{formErrors.ES_CLI_CIUDAD}</div>}

            <label className="form-label text-start w-100">Código Postal</label>
            <input
              type="text"
              name="ES_CLI_CODIGO_POSTAL"
              placeholder="Ingrese su Código Postal"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_CODIGO_POSTAL && <div className="alert alert-danger">{formErrors.ES_CLI_CODIGO_POSTAL}</div>}

            <label className="form-label text-start w-100">Teléfono</label>
            <input
              type="text"
              name="ES_CLI_TELEFONO_1"
              placeholder="Ingrese un Número Teléfonico"
              className="form-control"
              onChange={handleChange}
              required
            />
            {formErrors.ES_CLI_TELEFONO_1 && <div className="alert alert-danger">{formErrors.ES_CLI_TELEFONO_1}</div>}

            <label className="form-label text-start w-100">Teléfono 2 (Opcional)</label>
            <input
              type="text"
              name="ES_CLI_TELEFONO_2"
              placeholder="Ingrese un Número Teléfonico (Opcional)"
              className="form-control"
              onChange={handleChange}
            />

            {/* Botón de envío */}
            <button type="submit" className="btn btn-success w-100">Registrarse</button>
          </div>
        </div>
      </form>
      <div className="signup-link">
        <p>Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
      </div>
    </div>
  );
}

export default RegistroUsuario;
