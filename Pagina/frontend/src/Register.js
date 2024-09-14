import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [registroAcademico, setRegistroAcademico] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', {
                registro_academico: registroAcademico,
                nombres,
                apellidos,
                correo: email,
                contrasena: password,
            });
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de estado fuera del rango 2xx
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.error('No response:', error.request);
            } else {
                // Algo sucedió al configurar la solicitud que desencadenó un error
                console.error('Error during registration:', error.message);
            }
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white px-10 py-10 rounded-xl border-2 border-gray-100 shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center">Registro</h1>
          <p className="font-medium text-lg mt-2 text-center">Por favor, llena el formulario para registrarte.</p>
          <form className="mt-6">
            <div className="form-group mb-4">
              <label htmlFor="code" className="block text-sm font-medium">Número de Carnet/Código USAC</label>
              <input
                type="text"
                id="code"
                name="code"
                required
                value={registroAcademico}
                onChange={(e) => setRegistroAcademico(e.target.value)}
                className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium">Nombres</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="apellido" className="block text-sm font-medium">Apellidos</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  required
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
              />
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="contraseña" className="block text-sm font-medium">Contraseña</label>
                <input
                  type="password"
                  id="contraseña"
                  name="contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
                />
              </div>
            </div>
            <button
              type="submit"
            onClick={handleRegister}
              className="w-full py-2 mt-5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    );
};

export default Register;