import React from "react";

const Cards = () => {
    const cards = [
        {
            id: 1,
            image: "/images/samsungcharger45w.webp",
            title: "Producto 1",
            description: "Este es un breve resumen o descripción del producto 1.",
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
    ];

    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Nuestros Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;