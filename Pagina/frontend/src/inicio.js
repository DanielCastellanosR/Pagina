import React, { useState, useEffect } from 'react';

// Simula una función para obtener publicaciones desde el backend
const fetchPublicaciones = async () => {
  // Implementa la lógica para obtener las publicaciones
  return [
    { id: 1, fecha: '2024-09-01', curso: 'Matemáticas', catedratico: 'Ing. Velazquez', comentarios: [] },
    { id: 2, fecha: '2024-08-30', curso: 'Física', catedratico: 'Ing. Cuyan', comentarios: [] },
    // Agrega más publicaciones aquí
  ];
};

// Simula una función para agregar un comentario a una publicación
const addComentario = async (pubId, comentario) => {
  // Implementa la lógica para agregar un comentario a la publicación
  console.log(`Comentario agregado a la publicación ${pubId}: ${comentario}`);
};

const Inicio = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cursoFilter, setCursoFilter] = useState('');
  const [catedraticoFilter, setCatedraticoFilter] = useState('');
  const [nombreCursoFilter, setNombreCursoFilter] = useState('');
  const [nombreCatedraticoFilter, setNombreCatedraticoFilter] = useState('');
  const [comentario, setComentario] = useState('');
  const [selectedPubId, setSelectedPubId] = useState(null);

  useEffect(() => {
    const getPublicaciones = async () => {
      const data = await fetchPublicaciones();
      setPublicaciones(data);
    };
    getPublicaciones();
  }, []);

  const handleAddComentario = async () => {
    if (selectedPubId && comentario) {
      await addComentario(selectedPubId, comentario);
      // Actualiza el estado de publicaciones (esto debería ser hecho con un fetch real)
      const updatedPublicaciones = publicaciones.map(pub =>
        pub.id === selectedPubId
          ? { ...pub, comentarios: [...pub.comentarios, comentario] }
          : pub
      );
      setPublicaciones(updatedPublicaciones);
      setComentario('');
    }
  };

  const filteredPublicaciones = publicaciones
    .filter(pub => (!cursoFilter || pub.curso === cursoFilter))
    .filter(pub => (!catedraticoFilter || pub.catedratico === catedraticoFilter))
    .filter(pub => (!nombreCursoFilter || pub.curso.includes(nombreCursoFilter)))
    .filter(pub => (!nombreCatedraticoFilter || pub.catedratico.includes(nombreCatedraticoFilter)))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inicio</h1>
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
              {selectedPubId === pub.id && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Agregar un comentario"
                    className="border border-gray-300 p-2 rounded mr-2"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={handleAddComentario}
                  >
                    Agregar Comentario
                  </button>
                </div>
              )}
              <button
                className="mt-2 text-blue-500"
                onClick={() => setSelectedPubId(pub.id === selectedPubId ? null : pub.id)}
              >
                {selectedPubId === pub.id ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
