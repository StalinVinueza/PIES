import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import FooterEco from './components/FooterEco';
import Home from './pages/Home';
import Clientes from './pages/ClientePage';
import Emprendimientos from './pages/EmprendimientoPage';
import Productos from './pages/ProductoPage';
import Cart from './components/Carrito';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Registro from './components/Register';
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';
import PoliticasReembolsos from './pages/PoliticasReembolsos';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <NavMenu /> 

      {/* Contenido principal */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} /> 
          <Route path="/productos" element={<Productos />} />
          <Route path="/emprendimientos" element={<ProtectedRoute><Emprendimientos /></ProtectedRoute>} />
          <Route path="/carrito" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/contacto" element={<Contacto />} /> 
          <Route path="/nosotros" element={<Nosotros />} /> 
          <Route path='/registro' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          
          {/* Rutas para las políticas */}
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} /> {/* Corrected path */}
          <Route path="/politicas-reembolsos" element={<PoliticasReembolsos />} /> {/* Corrected path */}
        </Routes>
      </main>

      {/* Footer */}
      <FooterEco />
    </div>
  );
}

export default App;
