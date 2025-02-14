import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";  // Importar Link para redirección
import "../styles/Login.css";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [contrasenaError, setContrasenaError] = useState("");

  const formRef = useRef(null); // Referencia al formulario para hacer scroll hacia arriba

  const validateForm = () => {
    let formError = "";
    if (!correo || !contrasena) {
      formError = "Todos los campos son requeridos.";
    }

    // Validación de formato de correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(correo)) {
      formError = "Por favor ingresa un correo válido.";
    }

    return formError;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetear errores anteriores

    const formError = validateForm();
    if (formError) {
      setError(formError); // Mostrar el error si la validación falla
      return; // No continuar con el login
    }

    // Hacer scroll hacia arriba
    formRef.current.scrollIntoView({ behavior: 'smooth' });

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ES_CLI_CORREO: correo,  // Cambiar "correo" por "ES_CLI_CORREO"
          contrasena,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el login");
      }

      // Guardar el token en localStorage o sessionStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      window.location.href = "/"; // Redirigir al usuario a la página principal
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCorreoChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setCorreoError("");

    // Validación en tiempo real
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value && !emailRegex.test(value)) {
      setCorreoError("Correo no válido.");
    }
  };

  const handleContrasenaChange = (e) => {
    const value = e.target.value;
    setContrasena(value);
    setContrasenaError("");
  };

  return (
    <div className="login-container" ref={formRef}>
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Correo:</label>
        <input
          type="email"
          value={correo}
          onChange={handleCorreoChange}
          required
        />
        {correoError && <div className="error">{correoError}</div>} {/* Error correo */}

        <label>Contraseña:</label>
        <input
          type="password"
          value={contrasena}
          onChange={handleContrasenaChange}
          required
        />
        {contrasenaError && <div className="error">{contrasenaError}</div>} {/* Error contraseña */}

        <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
      </form>

      {/* Botón para redirigir a la página de registro */}
      <div className="signup-link">
        <p>¿No tienes una cuenta? <Link to="/registro">Crear cuenta</Link></p>
      </div>
    </div>
  );
};

export default Login;
