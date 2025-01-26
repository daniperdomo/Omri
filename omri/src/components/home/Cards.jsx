import React from "react";

const Cards = () => {
  const cards = [
    {
      id: 1,
      image: "/images/samsungcharger45w.webp",
      title: "Cargador Samsung",
      description: "Cargador original 45W tipo-c.",
    },
    {
      id: 2,
      image: "/images/card2.jpg",
      title: "Producto 2",
      description: "Este es un breve resumen o descripción del producto 2.",
    },
    {
      id: 3,
      image: "/images/card3.jpg",
      title: "Producto 3",
      description: "Este es un breve resumen o descripción del producto 3.",
    },
    {
      id: 4,
      image: "/images/card4.jpg",
      title: "Producto 4",
      description: "Este es un breve resumen o descripción del producto 4.",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light text-center mb-12 uppercase tracking-widest text-gray-800">
          Productos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-black" // Borde negro añadido
            >
              {/* Contenedor de la imagen con altura reducida */}
              <div className="relative h-48 flex items-center justify-center"> {/* Altura fija de 12rem (h-48) */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain" // Imagen centrada y sin cortes
                />
              </div>
              {/* Contenido de la card */}
              <div className="p-4"> {/* Padding reducido */}
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{card.description}</p>
                {/* Botón con hover */}
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-black hover:text-white hover:border-black transition duration-300">
                  Ver Más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;