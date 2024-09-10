import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Registro from './Register';
import Inicio from './inicio';
import NuevaContra from './cambiocontra';
import Publicacion from './publicacion';
import { PublicacionProvider } from './PublicacionContext'; // Ajusta la ruta si es necesario

function App() {
  return (
    <PublicacionProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/cambiocontra" element={<NuevaContra />} />
        <Route path="/publicacion" element={<Publicacion />} />
      </Routes>
    </PublicacionProvider>
  );
}

export default App;
