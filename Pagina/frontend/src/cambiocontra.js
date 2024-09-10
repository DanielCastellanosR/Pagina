
import React, { useState } from "react";

const NuevaContra = () => {
  const [registro, setRegistro] = useState("");
  const [correo, setCorreo] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    // Aquí debes implementar la lógica para verificar los datos.
    const datosCorrectos = verificarDatos(registro, correo); // Implementar función

    if (datosCorrectos) {
      setExito(true);
      setError("");
      // Implementar lógica para actualizar la contraseña
    } else {
      setError("Datos incorrectos. Por favor, verifica la información.");
    }
  };

  const verificarDatos = (registro, correo) => {
    // Lógica de verificación de los datos del usuario
    // Aquí podrías hacer una solicitud a tu backend para validar los datos.
    return registro === "123456" && correo === "usuario@example.com"; // Ejemplo
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">¿Olvidaste tu contraseña?</h2>
        {exito ? (
          <div>
            <p className="text-green-600 text-center mb-4">Contraseña restablecida con éxito.</p>
            <p className="text-center">Ahora puedes iniciar sesión con tu nueva contraseña.</p>
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Registro Académico</label>
              <input
                type="text"
                value={registro}
                onChange={(e) => setRegistro(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nueva Contraseña</label>
              <input
                type="password"
                value={nuevaContraseña}
                onChange={(e) => setNuevaContraseña(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                disabled={!exito} // Deshabilitado hasta que los datos sean correctos
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Restablecer Contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NuevaContra;
