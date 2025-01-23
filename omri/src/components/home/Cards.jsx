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
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 uppercase tracking-wider text-gray-800">
          Productos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
              <div className="p-4 bg-gray-100 text-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition duration-300">
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