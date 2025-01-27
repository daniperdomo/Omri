import React from "react";

const Cards = () => {
  // Datos de los productos (simulando el JSON)
  const productos = [
    {
      id: 1,
      name: "Aura Pro",
      price: 130.0,
      image: "/images/cubitt/productos/aurapro1.png",
      category: "Smartwatches",
      colors: [
        { color: "Negro", image: "/images/cubitt/productos/aurapro_negro.png" },
        { color: "Azul", image: "/images/cubitt/productos/aurapro_azul.png" },
        { color: "Rojo", image: "/images/cubitt/productos/aurapro_rojo.png" },
      ],
    },
    {
      id: 2,
      name: "Hydro Bottle",
      price: 25.0,
      image: "/images/cubitt/productos/hydrobottle1.png",
      category: "Termos",
      colors: [
        { color: "Negro", image: "/images/cubitt/productos/hydrobottle_negro.png" },
        { color: "Blanco", image: "/images/cubitt/productos/hydrobottle_blanco.png" },
      ],
    },
    {
      id: 3,
      name: "Viva",
      price: 85.0,
      image: "/images/cubitt/productos/viva1.png",
      category: "Smartwatches",
      colors: [
        { color: "Negro", image: "/images/cubitt/productos/viva_negro.png" },
        { color: "Rosa", image: "/images/cubitt/productos/viva_rosa.png" },
      ],
    },
    {
      id: 4,
      name: "Bocina Power Go",
      price: 55.0,
      image: "/images/cubitt/productos/bocinago1.png",
      category: "Bocinas",
      colors: [
        { color: "Negro", image: "/images/cubitt/productos/bocinago_negro.png" },
        { color: "Azul", image: "/images/cubitt/productos/bocinago_azul.png" },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
      <h2 className="text-4xl text-black text-center mb-12 uppercase tracking-widest">
        Nuestros mejores vendidos
      </h2>
        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Contenedor de la imagen */}
              <div className="relative h-48 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Contenido de la card */}
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                {/* Opciones de colores */}
                <div className="flex space-x-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.color.toLowerCase() }}
                      title={color.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;