import React from 'react';

const Accesorios = () => {
  const categories = [
    {
      id: 1,
      title: "Cargadores",
      image: "/images/accesorios/categorias/cargador.jpg", // Reemplaza con tu imagen
      link: "/smartwatches",
    },
    {
      id: 2,
      title: "Cables",
      image: "/images/accesorios/categorias/cablenegro.png", // Reemplaza con tu imagen
      link: "/jr-teens",
    },
  ];

  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header "Accesorios" */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Accesorios</h1>
        </header>

        {/* Subtítulo "Compra por categoría" */}
        <h2 className="text-2xl text-gray-700 mb-6 text-left">Categorías</h2>

        {/* Grid de categorías alineado a la izquierda */}
        <div className="flex justify-start space-x-4 mb-12">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="flex-none w-48 h-48 relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              {/* Texto posicionado más abajo sin overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-center">
                <h3 className="text-lg font-bold text-white text-center">
                  {category.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Sección de filtros */}
        <div className="flex space-x-4">
          {/* Filtro: Categoría */}
          <div className="w-32 h-10 flex items-center justify-center bg-black rounded-lg shadow-md">
            <span className="text-sm font-semibold text-white">Categoría</span>
          </div>

          {/* Filtro: Precio */}
          <div className="w-32 h-10 flex items-center justify-center bg-black rounded-lg shadow-md">
            <span className="text-sm font-semibold text-white">Marca</span>
          </div>

          {/* Filtro: Color */}
          <div className="w-32 h-10 flex items-center justify-center bg-black rounded-lg shadow-md">
            <span className="text-sm font-semibold text-white">Precio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accesorios;