import React from 'react';
import { Link } from 'react-router-dom'; 

const Menu = () => {
  const items = [
    {
      id: 1,
      title: "Catálogo Cubitt",
      description: "Descubre los productos Cubitt que ofrecemos para ti",
      image: "/images/home/menu/menucubi.webp", 
      link: "/cubitt", 
    },
    {
      id: 2,
      title: "Accesorios Apple",
      description: "Contamos con accesorios originales de la marca Apple",
      image: "/images/home/menu/menuapple.webp", 
      link: "/accesorios-apple", 
    },
    {
      id: 3,
      title: "Accesorios Samsung",
      description: "Accesorios originales de la marca Samsung disponibles para ti",
      image: "/images/home/menu/menusamsung.webp",
      link: "/accesorios-samsung", 
    },
    {
      id: 4,
      title: "Perfumes Árabes",
      description: "Próximamente disponibles en Omri",
      image: "/images/home/menu/menuarabe.webp", 
      link: null, 
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative flex items-center justify-center h-80 text-white text-center rounded-lg overflow-hidden shadow-lg hover:shadow-md transition-all duration-300 transform hover:scale-101"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay para oscurecer la imagen */}
          <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition-all duration-300"></div>

          {/* Contenido del cuadro */}
          <div className="relative z-10 p-6">
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <p className="text-lg mb-6">{item.description}</p>
            {/* Mostrar el botón solo si hay un enlace */}
            {item.link && (
              <Link to={item.link}>
                <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                  Ver más
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;