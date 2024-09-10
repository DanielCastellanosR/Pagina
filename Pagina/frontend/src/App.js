import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Registro from './Register';
import Inicio from './inicio';
import Olvidar from './Olvidar_contrasena';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/olvidar" element={<Olvidar />} />
    </Routes>
  );
}

export default App;
