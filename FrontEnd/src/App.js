import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import FooterEco from './components/FooterEco';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Emprendimientos from './pages/Emprendimiento';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
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
          <Route path="/clientes" element={<Clientes />} /> 
          <Route path="/contacto" element={<Contacto />} /> 
          <Route path="/emprendimientos" element={<Emprendimientos />} />
          <Route path="/nosotros" element={<Nosotros />} /> 
        </Routes>
      </main>

      {/* Footer */}
      <FooterEco />
    </div>
  );
}

export default App;
