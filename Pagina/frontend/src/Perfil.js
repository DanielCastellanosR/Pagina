import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [totalCreditos, setTotalCreditos] = useState(0);
  const [searchUser, setSearchUser] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const navigate = useNavigate();
  const { nombre_usuario } = useParams();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/');
    }

    if (nombre_usuario) {
      axios.get(`http://localhost:5000/perfil/${nombre_usuario}`)
        .then(response => {
          setSearchedUser(response.data.user);
          setCursosAprobados(response.data.cursos);
          setTotalCreditos(response.data.totalCreditos);
        })
        .catch(error => {
          console.error('Error fetching perfil:', error);
        });
    } else if (storedUser) {
      const nombreUsuario = JSON.parse(storedUser).nombres;
      axios.get(`http://localhost:5000/cursos-aprobados`, {
        params: { nombre_usuario: nombreUsuario }
      })
        .then(response => {
          setCursosAprobados(response.data.cursos);
          setTotalCreditos(response.data.totalCreditos);
        })
        .catch(error => {
          console.error('Error fetching cursos aprobados:', error);
        });
    }
  }, [navigate, nombre_usuario]);

  const handleSearch = () => {
    navigate(`/perfil/${searchUser}`);
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  const displayUser = searchedUser || user;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      <div className="border border-gray-300 p-4 rounded">
        <p><strong>Registro Académico:</strong> {displayUser.registro_academico}</p>
        <p><strong>Nombres:</strong> {displayUser.nombres}</p>
        <p><strong>Apellidos:</strong> {displayUser.apellidos}</p>
        <p><strong>Correo:</strong> {displayUser.correo}</p>
      </div>
      {!nombre_usuario && (
        <>
          <button
            className="bg-blue-500 text-white p-2 rounded mt-4"
            onClick={() => navigate('/inicio')}
          >
            Volver al Inicio
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded mt-4 ml-4"
            onClick={() => navigate('/agregar-cursos')}
          >
            Agregar Cursos
          </button>
        </>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Cursos Aprobados</h2>
        {cursosAprobados.length > 0 ? (
          <div>
            <ul className="list-disc pl-5">
              {cursosAprobados.map(curso => (
                <li key={curso.codigo}>
                  {curso.nombre_curso} ({curso.codigo}) - {curso.creditos} créditos
                </li>
              ))}
            </ul>
            <p className="mt-4"><strong>Total de Créditos:</strong> {totalCreditos}</p>
          </div>
        ) : (
          <p>No has aprobado cursos aún.</p>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Buscar Perfil</h2>
        <input
          type="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Nombre de usuario"
          className="border p-2 rounded"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded ml-2"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Perfil;
