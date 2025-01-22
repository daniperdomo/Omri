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
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {cards.map((card) => (
                    <div key={card.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
                        <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                            <p className="text-gray-700">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;