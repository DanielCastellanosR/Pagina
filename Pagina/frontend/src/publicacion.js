// Archivo: Publicacion.js
import React, { useState } from "react";

const Publicacion = () => {
  const [usuario, setUsuario] = useState("usuarioLogueado"); // Reemplazar con el usuario logueado real
  const [tipo, setTipo] = useState(""); // Catedrático o Curso
  const [seleccion, setSeleccion] = useState(""); // Nombre del Catedrático o Curso
  const [mensaje, setMensaje] = useState("");
  const [fechaCreacion] = useState(new Date().toLocaleDateString());
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const handlePublicar = (e) => {
    e.preventDefault();
    if (!tipo || !seleccion || !mensaje) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    setExito(true);
    // Aquí puedes hacer la lógica para almacenar la publicación en la base de datos
    console.log({
      usuario,
      tipo,
      seleccion,
      mensaje,
      fechaCreacion,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Nueva Publicación</h2>
        {exito ? (
          <div>
            <p className="text-green-600 text-center mb-4">Publicación realizada con éxito.</p>
            <p className="text-center">¡Gracias por tu contribución!</p>
          </div>
        ) : (
          <form onSubmit={handlePublicar}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Usuario</label>
              <input
                type="text"
                value={usuario}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Publicación sobre</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="Catedrático">Catedrático</option>
                <option value="Curso">Curso</option>
              </select>
            </div>
            {tipo && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  {tipo === "Catedrático" ? "Nombre del Catedrático" : "Nombre del Curso"}
                </label>
                <input
                  type="text"
                  value={seleccion}
                  onChange={(e) => setSeleccion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Mensaje de la Publicación</label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Fecha de Creación</label>
              <input
                type="text"
                value={fechaCreacion}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Publicar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Publicacion;
