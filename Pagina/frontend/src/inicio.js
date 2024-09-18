import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PublicacionContext } from './PublicacionContext';

const Inicio = () => {
  const { publicaciones, setPublicaciones } = useContext(PublicacionContext);
  const [cursoFilter, setCursoFilter] = useState('');
  const [catedraticoFilter, setCatedraticoFilter] = useState('');
  const [nombreCursoFilter, setNombreCursoFilter] = useState('');
  const [nombreCatedraticoFilter, setNombreCatedraticoFilter] = useState('');
  const [user, setUser] = useState(null);
  const [comentarios, setComentarios] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/');
    }
  
    axios.get('http://localhost:5000/publicaciones')
      .then(response => {
        setPublicaciones(response.data);
      })
      .catch(error => {
        console.error('Error fetching publicaciones:', error);
      });
  }, [navigate, setPublicaciones]);

  const handleComentarioChange = (publicacionId, value) => {
    setComentarios(prev => ({ ...prev, [publicacionId]: value }));
  };

  const handleComentar = (publicacionId) => {
    const comentario = comentarios[publicacionId];
    if (!comentario || !user) return;

    axios.post('http://localhost:5000/comentarios', {
      publicacion_id: publicacionId,
      nombre_usuario: user.nombres,
      comentario
    })
    .then(response => {
      setPublicaciones(prev => prev.map(pub => {
        if (pub.id === publicacionId) {
          return {
            ...pub,
            comentarios: [...pub.comentarios, response.data]
          };
        }
        return pub;
      }));
    })
    .catch(error => {
      console.error('Error adding comentario:', error);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredPublicaciones = publicaciones
    .filter(pub => (!cursoFilter || pub.curso_o_catedratico.includes(cursoFilter)))
    .filter(pub => (!catedraticoFilter || pub.curso_o_catedratico.includes(catedraticoFilter)))
    .filter(pub => (!nombreCursoFilter || pub.curso_o_catedratico.includes(nombreCursoFilter)))
    .filter(pub => (!nombreCatedraticoFilter || pub.curso_o_catedratico.includes(nombreCatedraticoFilter)))
    .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inicio</h1>
        <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => navigate(`/perfil/${user.id}`)}
        >
        Ir a perfil
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleLogout}
        >
          Salir
        </button>
      </div>
      {user && <p className="mb-4">Bienvenido, {user.nombres} {user.apellidos}</p>}
      <button
        className="bg-green-500 text-white p-2 rounded mb-4"
        onClick={() => navigate('/publicacion')}
      >
        Crear Nueva Publicación
      </button>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por Curso"
          className="border border-gray-300 p-2 rounded mr-2"
          value={cursoFilter}
          onChange={(e) => setCursoFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por Catedrático"
          className="border border-gray-300 p-2 rounded mr-2"
          value={catedraticoFilter}
          onChange={(e) => setCatedraticoFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar nombre de Curso"
          className="border border-gray-300 p-2 rounded mr-2"
          value={nombreCursoFilter}
          onChange={(e) => setNombreCursoFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar nombre de Catedrático"
          className="border border-gray-300 p-2 rounded"
          value={nombreCatedraticoFilter}
          onChange={(e) => setNombreCatedraticoFilter(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPublicaciones.map(pub => (
          <div key={pub.id} className="border border-black bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{pub.curso_o_catedratico}</h2>
            <p className="text-gray-600">Publicado por: {user && pub.nombre_usuario === user.nombres ? 'Yo' : pub.nombre_usuario}</p>
            <p className="text-gray-500">Fecha: {new Date(pub.fecha_creacion).toLocaleDateString()}</p>
            <p className="mt-4">{pub.mensaje}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comentarios</h3>
              <ul className="list-disc pl-5">
                {pub.comentarios.map((com, index) => (
                  <li key={index} className="text-gray-700">
                    <p><strong>{com.nombre_usuario}</strong> ({new Date(com.fecha_creacion).toLocaleString()}):</p>
                    <p>{com.comentario}</p>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Agregar un comentario"
                className="border border-gray-300 p-2 rounded mt-2"
                value={comentarios[pub.id] || ''}
                onChange={(e) => handleComentarioChange(pub.id, e.target.value)}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded mt-2"
                onClick={() => handleComentar(pub.id)}
              >
                Comentar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
