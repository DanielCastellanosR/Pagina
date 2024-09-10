import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicacionContext } from './PublicacionContext';

const Inicio = () => {
  const { publicaciones } = useContext(PublicacionContext);
  const [cursoFilter, setCursoFilter] = useState('');
  const [catedraticoFilter, setCatedraticoFilter] = useState('');
  const [nombreCursoFilter, setNombreCursoFilter] = useState('');
  const [nombreCatedraticoFilter, setNombreCatedraticoFilter] = useState('');
  const [comentario, setComentario] = useState('');
  const [selectedPubId, setSelectedPubId] = useState(null);

  const navigate = useNavigate();

  const filteredPublicaciones = publicaciones
    .filter(pub => (!cursoFilter || pub.curso === cursoFilter))
    .filter(pub => (!catedraticoFilter || pub.catedratico === catedraticoFilter))
    .filter(pub => (!nombreCursoFilter || pub.curso.includes(nombreCursoFilter)))
    .filter(pub => (!nombreCatedraticoFilter || pub.catedratico.includes(nombreCatedraticoFilter)))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inicio</h1>
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
            <h2 className="text-xl font-semibold">{pub.curso}</h2>
            <p className="text-gray-600">Catedrático: {pub.catedratico}</p>
            <p className="text-gray-500">Fecha: {new Date(pub.fecha).toLocaleDateString()}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comentarios</h3>
              <ul className="list-disc pl-5">
                {pub.comentarios.map((com, index) => (
                  <li key={index} className="text-gray-700">{com}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
