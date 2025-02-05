import React from 'react';

const Menu = () => {
  const items = [
    {
      id: 1,
      title: "Catálogo Cubitt",
      description: "Descubre los productos Cubitt que ofrecemos para ti.",
      image: "/images/home/menu/menucubi.webp", // Reemplaza con tu imagen
    },
    {
      id: 2,
      title: "Accesorios Apple",
      description: "Contamos con accesorios originales de la marca Apple.",
      image: "/images/home/menu/menuapple.webp", // Reemplaza con tu imagen
    },
    {
      id: 3,
      title: "Accesorios Samsung",
      description: "Accesorios originales de la marca Samsung disponibles para ti.",
      image: "/images/home/menu/menusamsung.webp", // Reemplaza con tu imagen
    },
    {
      id: 4,
      title: "Perfumes Árabes",
      description: "Próximamente disponibles en Omri.",
      image: "/images/home/menu/menuarabe.webp", // Reemplaza con tu imagen
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative flex items-center justify-center h-80 text-white text-center"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay para oscurecer la imagen */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Contenido del cuadro */}
          <div className="relative z-10 p-6">
            <h2 className="text-3xl font-bold">{item.title}</h2>
            <p className="text-lg mt-2">{item.description}</p>
            <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;