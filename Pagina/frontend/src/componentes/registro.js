import React, { useState } from 'react';

export default function Registro() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contra, setContra] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      code,
      first_name: name,
      last_name: apellido,
      email,
      password: contraseña,
      contra,
    };
    console.log(data);

    try {
      const response = await fetch('http://localhost:5000/addCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message);
      if (response.ok) {
        setCode("");
        setName("");
        setApellido("");
        setEmail("");
        setContraseña("");
        setContra("");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white px-10 py-10 rounded-xl border-2 border-gray-100 shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center">Registro</h1>
        <p className="font-medium text-lg mt-2 text-center">Por favor, llena el formulario para registrarte.</p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="form-group mb-4">
            <label htmlFor="code" className="block text-sm font-medium">Número de Carnet/Código USAC</label>
            <input
              type="text"
              id="code"
              name="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
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
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="contra" className="block text-sm font-medium">Confirme la Contraseña</label>
              <input
                type="password"
                id="contra"
                name="contra"
                required
                value={contra}
                onChange={(e) => setContra(e.target.value)}
                className="mt-1 py-2 px-3 rounded-xl bg-slate-100 w-full border-2 border-gray-300"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
