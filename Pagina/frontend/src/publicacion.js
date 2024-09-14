import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Publicacion = () => {
  const [usuario, setUsuario] = useState(null);
  const [tipo, setTipo] = useState(""); // Catedrático o Curso
  const [seleccion, setSeleccion] = useState(""); // Nombre del Catedrático o Curso
  const [mensaje, setMensaje] = useState("");
  const [fechaCreacion] = useState(new Date().toLocaleDateString());
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]); // Estado para los catedráticos

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate('/');
    }

    // Cargar los cursos desde el backend
    axios.get('http://localhost:5000/cursos')
      .then(response => {
        setCursos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los cursos:', error);
      });

    // Cargar los catedráticos desde el archivo JSON
    fetch('/profesores.json')
      .then(response => response.json())
      .then(data => {
        setCatedraticos(data);
      })
      .catch(error => {
        console.error('Error al cargar los catedráticos:', error);
      });
  }, [navigate]);

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => {
        navigate('/inicio');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [exito, navigate]);

  const handlePublicar = (e) => {
    e.preventDefault();
    if (!tipo || !seleccion || !mensaje) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");

    // Convertir la fecha a un formato compatible con MySQL
    const fechaCreacionFormatted = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Enviar la publicación al backend
    axios.post('http://localhost:5000/publicaciones', {
      nombre_usuario: usuario.nombres, // Asegurarse de que este valor coincide con la columna `nombres` en `usuarios`
      curso_o_catedratico: seleccion,
      mensaje,
      fecha_creacion: fechaCreacionFormatted
    })
    .then(response => {
      console.log('Publicación realizada con éxito:', response.data);
      setExito(true);
    })
    .catch(error => {
      console.error('Error al realizar la publicación:', error);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Nueva Publicación</h2>
        {exito ? (
          <div>
            <p className="text-green-600 text-center mb-4">Publicación realizada con éxito.</p>
            <p className="text-center">Redirigiendo al inicio...</p>
          </div>
        ) : (
          <form onSubmit={handlePublicar}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Usuario</label>
              <input
                type="text"
                value={usuario ? `${usuario.nombres} ${usuario.apellidos}` : ''}
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
                {tipo === "Curso" ? (
                  <select
                    value={seleccion}
                    onChange={(e) => setSeleccion(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.codigo} value={curso.nombre}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={seleccion}
                    onChange={(e) => setSeleccion(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Seleccione un catedrático</option>
                    {catedraticos.map((catedratico, index) => (
                      <option key={index} value={`${catedratico.NOMBRE} ${catedratico.APELLIDO1} ${catedratico.APELLIDO2}`}>
                        {`${catedratico.NOMBRE} ${catedratico.APELLIDO1} ${catedratico.APELLIDO2}`}
                      </option>
                    ))}
                  </select>
                )}
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
