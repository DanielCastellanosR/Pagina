import React, { createContext, useState } from 'react';

export const PublicacionContext = createContext();

export const PublicacionProvider = ({ children }) => {
  const [publicaciones, setPublicaciones] = useState([
    { id: 1, fecha: '2024-09-01', curso: 'Matemáticas', catedratico: 'Ing. Velazquez', comentarios: [] },
    { id: 2, fecha: '2024-08-30', curso: 'Física', catedratico: 'Ing. Cuyan', comentarios: [] },
  ]);

  const agregarPublicacion = (nuevaPublicacion) => {
    setPublicaciones((prevPublicaciones) => [...prevPublicaciones, nuevaPublicacion]);
  };

  return (
    <PublicacionContext.Provider value={{ publicaciones, setPublicaciones, agregarPublicacion }}>
      {children}
    </PublicacionContext.Provider>
  );
};