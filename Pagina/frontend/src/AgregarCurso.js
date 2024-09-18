import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgregarCurso = () => {
  const [usuario, setUsuario] = useState(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [creditos, setCreditos] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    } else {
      navigate('/Perfil');
    }


    axios.get('http://localhost:5000/cursos')
      .then(response => {
        setCursos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los cursos:', error);
      });
  }, [navigate]);

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => {
        setExito(false);
        navigate('/perfil/:id');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [exito, navigate]);

  const handleCursoChange = (e) => {
    const curso = cursos.find(c => c.nombre === e.target.value);
    setCursoSeleccionado(curso.nombre);
    setCreditos(curso.creditos);
    setCodigo(curso.codigo);
  };

  const handleAgregarCurso = (e) => {
    e.preventDefault();
    if (!cursoSeleccionado || !creditos || !codigo) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");

    axios.post('http://localhost:5000/agregar-cursos', {
      nombre_usuario: usuario.nombres,
      nombre_curso: cursoSeleccionado,
      creditos,
      codigo
    })
    .then(response => {
      setExito(true);
    })
    .catch(error => {
      console.error('Error al agregar el curso:', error);
      setError('Error al agregar el curso');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar Curso</h2>
        {exito ? (
          <div>
            <p className="text-green-600 text-center mb-4">Curso agregado con éxito.</p>
            <p className="text-center">Redirigiendo al inicio...</p>
          </div>
        ) : (
          <form onSubmit={handleAgregarCurso}>
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
              <label className="block text-gray-700 font-semibold mb-2">Curso</label>
              <select
                value={cursoSeleccionado}
                onChange={handleCursoChange}
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
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Créditos</label>
              <input
                type="text"
                value={creditos}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Código</label>
              <input
                type="text"
                value={codigo}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Agregar Curso
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AgregarCurso;