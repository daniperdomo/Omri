import React from 'react';

const Categorias = () => {
  const categorias = [
    { nombre: 'Relojes Cubitt', imagen: '/images/cines.webp' },
    { nombre: 'Cargadores', imagen: '/images/cartelera.webp' },
    { nombre: 'Cables cargadores', imagen: '/images/carameleria.webp' },
    { nombre: 'Termos Cubitt', imagen: '/images/preventa.webp' },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 uppercase tracking-wider text-gray-800">
          Categorías
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorias.map((categoria, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={categoria.imagen}
                alt={categoria.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {categoria.nombre}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorias;