// Perfil.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PublicacionContext } from './PublicacionContext';

const Perfil = ({ userId }) => {
  const [usuario, setUsuario] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', credito: '' });
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(PublicacionContext);

  useEffect(() => {
    setIsOwnProfile(userId === user.id);

    axios.get(`http://localhost:5000/usuario/${userId}`)
      .then(response => {
        setUsuario(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    axios.get(`http://localhost:5000/cursos/${userId}`)
      .then(response => {
        setCursos(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [userId, user.id]);

  const handleAddCourse = () => {
    if (isOwnProfile && nuevoCurso.nombre && nuevoCurso.credito) {
      axios.post(`http://localhost:5000/cursos/${userId}`, nuevoCurso)
        .then(response => {
          setCursos([...cursos, response.data]);
          setNuevoCurso({ nombre: '', credito: '' });
        })
        .catch(error => {
          console.error('Error adding course:', error);
        });
    }
  };

  const handleNavigateToSearch = () => {
    navigate('/buscar-perfil');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Perfil {usuario ? usuario.nombre : 'Usuario'}</h1>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleNavigateToSearch}
        >
          Buscar Perfil
        </button>
      </div>
      {usuario && (
        <>
          <p className="mb-4"><strong>Nombre:</strong> {usuario.nombre}</p>
          <p className="mb-4"><strong>Registro Personal:</strong> {usuario.registroPersonal}</p>
          <p className="mb-4"><strong>Email:</strong> {usuario.email}</p>
          <p className="mb-4"><strong>Fecha de Registro:</strong> {new Date(usuario.fechaRegistro).toLocaleDateString()}</p>

          <div className="mb-4">
            <h2 className="text-xl font-semibold">Cursos Aprobados</h2>
            <ul className="list-disc pl-5">
              {cursos.map((curso, index) => (
                <li key={index} className="text-gray-700">
                  <p><strong>{curso.nombre}</strong> - Créditos: {curso.credito}</p>
                </li>
              ))}
            </ul>
            {isOwnProfile && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Agregar Nuevo Curso</h3>
                <input
                  type="text"
                  placeholder="Nombre del Curso"
                  className="border border-gray-300 p-2 rounded mr-2"
                  value={nuevoCurso.nombre}
                  onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Créditos"
                  className="border border-gray-300 p-2 rounded mr-2"
                  value={nuevoCurso.credito}
                  onChange={(e) => setNuevoCurso({ ...nuevoCurso, credito: e.target.value })}
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={handleAddCourse}
                >
                  Agregar Curso
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const BuscarPerfil = () => {
  const [registroPersonal, setRegistroPersonal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    axios.get(`http://localhost:5000/usuario/${registroPersonal}`)
      .then(response => {
        navigate(`/perfil/${registroPersonal}`);
      })
      .catch(() => {
        setError('Usuario no encontrado');
      });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Número de Registro Personal"
          className="border border-gray-300 p-2 rounded mr-2"
          value={registroPersonal}
          onChange={(e) => setRegistroPersonal(e.target.value)}
        />
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={handleSearch}
        >
          Buscar Perfil
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export { Perfil, BuscarPerfil };
