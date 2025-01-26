import React from 'react';

const Cubitt = () => {
  const categories = [
    {
      id: 1,
      title: "Smartwatches",
      image: "/images/cubitt/categorias/smartwatches.png", // Reemplaza con tu imagen
      link: "/smartwatches",
    },
    {
      id: 2,
      title: "Audífonos",
      image: "/images/cubitt/categorias/audifonos.png", // Reemplaza con tu imagen
      link: "/jr-teens",
    },
    {
      id: 3,
      title: "Termos",
      image: "/images/cubitt/categorias/termos.png", // Reemplaza con tu imagen
      link: "/termos",
    },
    {
      id: 4,
      title: "Bocinas",
      image: "/images/cubitt/categorias/bocinas.png", // Reemplaza con tu imagen
      link: "/headphones",
    },
    {
      id: 5,
      title: "Básculas",
      image: "/images/cubitt/categorias/basculas.png", // Reemplaza con tu imagen
      link: "/bocinas",
    },
    {
      id: 6,
      title: "Accesorios",
      image: "/images/categories/electronica.jpg", // Reemplaza con tu imagen
      link: "/electronica",
    },
  ];

  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header "Cubitt" */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Cubitt</h1>
        </header>

        {/* Subtítulo "Compra por categoría" */}
        <h2 className="text-2xl text-gray-700 mb-6 text-left">Categorías</h2>

        {/* Grid de categorías */}
        <div className="flex justify-center space-x-4 mb-12">
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
            <span className="text-sm font-semibold text-white">Precio</span>
          </div>

          {/* Filtro: Color */}
          <div className="w-32 h-10 flex items-center justify-center bg-black rounded-lg shadow-md">
            <span className="text-sm font-semibold text-white">Color</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cubitt;